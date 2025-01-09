from django.db import models

class MarineSpecies(models.Model):
    image_id = models.AutoField(primary_key=True)
    image_path = models.CharField(max_length=255)
    species_data = models.JSONField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image {self.image_id}: {self.species_data.get('species_name', 'Unknown')}"
