import os
import uuid
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import MarineSpecies
from .serializers import MarineSpeciesSerializer
from .utils import Classify

UPLOAD_DIR = 'uploads/'  # Directory to save uploaded images
os.makedirs(UPLOAD_DIR, exist_ok=True)

@api_view(['POST'])
def upload_image(request):
    image_file = request.FILES.get('image')
    if not image_file:
        return JsonResponse({'error': 'No image provided'}, status=400)

    image_id = str(uuid.uuid4())
    image_path = os.path.join(UPLOAD_DIR, f"{image_id}.jpg")
    with open(image_path, 'wb') as f:
        for chunk in image_file.chunks():
            f.write(chunk)

    classify = Classify()
    species_data = classify.run(image_path)

    species_entry = MarineSpecies(image_path=image_path, species_data=species_data)
    species_entry.save()

    return JsonResponse({'image_id': species_entry.image_id, 'species_data': species_data}, status=201)

@api_view(['GET', 'DELETE'])
def history(request):
    if request.method == 'GET':
        species_entries = MarineSpecies.objects.all()
        serializer = MarineSpeciesSerializer(species_entries, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)

    elif request.method == 'DELETE':
        image_id = request.data.get('image_id')
        try:
            species_entry = MarineSpecies.objects.get(image_id=image_id)
            os.remove(species_entry.image_path)  # Delete the image file
            species_entry.delete()
            return JsonResponse({'message': f'Image {image_id} deleted successfully'}, status=200)
        except MarineSpecies.DoesNotExist:
            return JsonResponse({'error': 'Image ID not found'}, status=404)
        
def home(request):
    return JsonResponse({'message': 'Welcome to the OceanID API!'}, status=200)
