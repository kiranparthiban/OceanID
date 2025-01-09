from django.db import models


class MarineSpecies(models.Model):
    image_id = models.CharField(max_length=36, primary_key=True)  # UUID as primary key
    class_name = models.CharField(max_length=255, null=True, blank=True)  # Allow null values for existing rows
    image = models.ImageField(upload_to='uploads/', null=True, blank=True)  # Allow null values for existing rows
    summary = models.TextField(null=True, blank=True)  # Allow null values for existing rows
    url = models.URLField(null=True, blank=True)  # Allow null values for existing rows
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically add timestamp
