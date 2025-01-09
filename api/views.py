import os
import uuid
from PIL import Image
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import MarineSpecies
from .serializers import MarineSpeciesSerializer
from .ai_handler import AIHandler

# Directory to save uploaded images
UPLOAD_DIR = 'uploads/'
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Initialize AIHandler
model_path = "model/resnet50_model_finetuned.pth"
class_to_idx_path = "model/class_to_idx.json"
ai_handler = AIHandler(model_path, class_to_idx_path)

@api_view(['POST'])
def upload_image(request):
    """
    Upload an image and classify the fish species.
    """
    image_file = request.FILES.get('image')
    if not image_file:
        return JsonResponse({'error': 'No image provided'}, status=400)

    # Generate a unique ID for the image
    image_id = str(uuid.uuid4())

    # Save the uploaded image
    image_path = os.path.join(UPLOAD_DIR, f"{image_id}.jpg")
    with open(image_path, 'wb') as f:
        for chunk in image_file.chunks():
            f.write(chunk)

    # Open the image for classification
    try:
        image = Image.open(image_path)
    except Exception as e:
        return JsonResponse({'error': f'Failed to open image: {e}'}, status=400)

    # Classify the image
    classification = ai_handler.classify(image)
    if "error" in classification:
        return JsonResponse({'error': classification["error"]}, status=500)

    class_name = classification["class_name"]
    confidence = classification["confidence"]

    # Retrieve data about the species
    species_data = ai_handler.retrieve_data(class_name)

    # Save to database
    species_entry = MarineSpecies.objects.create(
        image_id=image_id,
        class_name=class_name,
        image=image_file,  # Save the uploaded image
        summary=species_data.get('summary', 'No summary available'),
        url=species_data.get('url', 'No URL available')
    )

    return JsonResponse({
        'image_id': species_entry.image_id,
        'class_name': species_entry.class_name,
        'confidence': confidence,
        'summary': species_entry.summary,
        'url': species_entry.url
    }, status=201)


@api_view(['GET', 'DELETE'])
def history(request):
    """
    View or delete the history of classified images.
    """
    if request.method == 'GET':
        species_entries = MarineSpecies.objects.all()
        serializer = MarineSpeciesSerializer(species_entries, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)

    elif request.method == 'DELETE':
        image_id = request.data.get('image_id')
        if not image_id:
            return JsonResponse({'error': 'Image ID is required for deletion'}, status=400)

        try:
            species_entry = MarineSpecies.objects.get(image_id=image_id)
            os.remove(species_entry.image.path)  # Delete the associated image file
            species_entry.delete()
            return JsonResponse({'message': f'Image {image_id} deleted successfully'}, status=200)
        except MarineSpecies.DoesNotExist:
            return JsonResponse({'error': 'Image ID not found'}, status=404)


def home(request):
    """
    Home endpoint for the API.
    """
    return JsonResponse({'message': 'Welcome to the OceanID API!'}, status=200)
