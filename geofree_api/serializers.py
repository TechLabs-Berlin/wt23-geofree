from rest_framework import serializers
from .models import Item, ItemImages, Categories

#Serialization of the inbound data.

#Categories serialization.
class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['name']

#Serialization of the list of categories received as a string.
class CategoriesField(serializers.CharField):
    def to_representation(self, value):
        return value.split(',')

    def to_internal_value(self, data):
        if isinstance(data, list):
            return ','.join(data)
        return data

#Serialization of the images-path table with their respective foreign keys.
class ItemImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = ItemImages
        fields = ["id", "item", "image"]

#Serialization of the whole Item model. Keep in minf that the "read-only" fields will only be visible in the API view
#but won't be stored in the database.
class ItemSerializers(serializers.HyperlinkedModelSerializer):
    images = ItemImageSerializers(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 10000000, allow_empty_file = False, use_url = False),
        write_only =True
    )

    categories = CategoriesField()
    available = serializers.BooleanField(default=True)
    item_age = serializers.ReadOnlyField()

    class Meta:
        model =  Item
        fields = ['id', 'title', 'description', 'available', 'timedate_creation', 'item_age', 'category_ml', 'latitude', 'longitude', 'point', 'condition', 'categories', 'views', 'likes', 'images', 'uploaded_images']
        
    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        item = Item.objects.create(**validated_data)
        for image in uploaded_images:
            newitem_image = ItemImages.objects.create(item=item, image=image)
        return item