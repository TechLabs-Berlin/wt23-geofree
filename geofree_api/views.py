from .models import Item, Categories
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ItemSerializers, CategorySerializers
from django.db.models import Q
from math import radians, cos, sin, asin, sqrt
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.measure import D
from django.shortcuts import get_object_or_404




#Item CRUD (Create, Update & Delete) Handles + Queries

@api_view(['GET'])
def apiOverview(request):
    return Response("API BASE POINT")

#It returns all the items/objects availables in the DB.
@api_view(['GET'])
def itemList(request):
    items = Item.objects.all()
    serializer = ItemSerializers(items, many=True)
    return Response(serializer.data)

#This function takes a primary key which is an integer that representes the item_id and it returns the only the data of that particular item.
@api_view(['GET'])
def itemDetail(request, pk):
    items = Item.objects.get(id=pk)
    serializer = ItemSerializers(items, many=False)
    return Response(serializer.data)

#Creation of a new object.
@api_view(['POST', 'GET'])
def itemCreate(request):
    serializer = ItemSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({"status": "Item succesfully created"})

#It updates the object partially.
@api_view(['PUT', 'GET'])
def itemUpdate(request, pk):
    try:
        item = Item.objects.get(id=pk)
    except Item.DoesNotExist:
        return Response({'error': 'Item does not exist'})

    serializer = ItemSerializers(instance=item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Handles the deletion of an object. 
@api_view(['DELETE'])
def itemDelete(request, pk):
    item = Item.objects.get(id=pk)
    item.delete()
    return Response("ITEM DELETED")

#Calculating the distance between request maker and all the Item objects.
EARTH_RADIUS_KM =6371
@api_view(['GET'])
def calculate_distance(request):
    user_lat= float(request.query_params.get('user_latitude'))
    user_lon= float(request.query_params.get('user_longitude'))
    
    item_locations = Item.objects.all()
    distances_km = []
    #For loop through objects and get their locations
    for item_location in item_locations:
        item_id = item_location.id
        item_lat = float(item_location.latitude)
        item_lon = float(item_location.longitude)
        #make copies of every user lat and long to use inside the loop
        ulat, ulon = user_lat, user_lon
        #convert decimal degrees to radians
        ulat, ulon, item_lat, item_lon = map(radians, [ulat, ulon, item_lat, item_lon])
        #Haversine formula
        dlon = item_lon - ulon
        dlat = item_lat - ulat
        a = sin(dlat/2)**2 + cos(ulat) * cos(item_lat) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a))
        distance_km = EARTH_RADIUS_KM * c
        #append every object distance to an array linked to its respective item id
        distances_km.append({'item_id': item_id, 'distance_kms': distance_km})

    return Response(distances_km)

#Calculating the distance between request maker and the Item Object dinamically passing the id of the object.
@api_view(['GET'])
def calculate_distance_id(request):
    user_lat = float(request.query_params.get('user_latitude'))
    user_lon = float(request.query_params.get('user_longitude'))
    item_id = request.query_params.get('item_id')
    if item_id:
        item_location = get_object_or_404(Item, id=item_id)
        item_lat = float(item_location.latitude)
        item_lon = float(item_location.longitude)
        ulat, ulon = user_lat, user_lon
        ulat, ulon, item_lat, item_lon = map(radians, [ulat, ulon, item_lat, item_lon])
        dlon = item_lon - ulon
        dlat = item_lat - ulat
        a = sin(dlat/2)**2 + cos(ulat) * cos(item_lat) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a))
        distance_km = EARTH_RADIUS_KM * c
        response_data = {'item_id': int(item_id), 'distance_kms': distance_km} 
    else:
        item_locations = Item.objects.all()
        distances_km = []
        for item_location in item_locations:
            item_id = item_location.id
            item_lat = float(item_location.latitude)
            item_lon = float(item_location.longitude)
            ulat, ulon = user_lat, user_lon
            ulat, ulon, item_lat, item_lon = map(radians, [ulat, ulon, item_lat, item_lon])
            dlon = item_lon - ulon
            dlat = item_lat - ulat
            a = sin(dlat/2)**2 + cos(ulat) * cos(item_lat) * sin(dlon/2)**2
            c = 2 * asin(sqrt(a))
            distance_km = EARTH_RADIUS_KM * c
            distances_km.append({'item_id': int(item_id), 'distance_kms': distance_km})
        response_data = distances_km
    return Response(response_data)

#This function calculates the time has been posted in the DB (days/hours/minutes) this data will be used for DS.
@api_view(['GET'])
def getItemAges(request):
    items = Item.objects.all()
    items_ages = []
    for item in items:
        item_id = item.id
        item_age = item.item_age
        items_ages.append({'item_id': item_id, 'item_age': item_age })
    return Response({'Item ages': items_ages})

# Getting items based on distance query (the param must be in meters).
@api_view(['GET'])
def itemListDistance(request):
    # Get latitude and longitude from request parameters
    lat = request.query_params.get('lat')
    lon = request.query_params.get('lng')
    distance_param = request.query_params.get('distance')
    # Check if lat and lon are present
    if lat is None or lon is None:
        return Response({'error': 'Please provide latitude and longitude.'}, status=400)
    # Convert latitude and longitude to float and create Point object
    pnt = Point(float(lon), float(lat), srid=4326)
    # Get all objects within 5000 meters of the given point
    objects = Item.objects.annotate(distance=Distance('point', pnt)).filter(distance__lte=distance_param)
    # Serialize the objects
    serializer = ItemSerializers(objects, many=True)
    # Return the serialized objects
    return Response(serializer.data)

#This function handles a query of items based on categories, the filter can be based on one or multiple categories.
@api_view(['GET'])
def itemListCategories(request):
    queryset = Item.objects.all()

    #Storing the string that contains the categories selected queries by the user in frontend
    search_categories = request.query_params.get('categories', None)
    
    if search_categories:
        # Split the string by commas and create a list of words.
        categories = search_categories.split(',')

        # With the Q method we look for objects which their attribute "categories" contains matches with at least 1 of the words passed in the url param.
        #For this we have to iterate word by word.
        category_query = Q()
        for category in categories:
            category_query |= Q(categories__contains=category)
        #We filter the query and storeit in a variable that will be serialized and the rendered.
        queryset = queryset.filter(category_query)

    serializer = ItemSerializers(queryset, many=True)
    return Response(serializer.data)

#views-increment-update
@api_view(['GET'])
def viewsUpdate(request, pk):
    try:
        item = Item.objects.get(id=pk)
    except Item.DoesNotExist:
        return Response({'error': 'Item does not exist'})

    serializer = ItemSerializers(instance=item, data=request.data, partial=True)
    
    if serializer.is_valid():
        item.views += 1  # increment the views field by 1
        item.save()  # save the updated instance to the database
        serializer.save()  # update the instance with the serializer data
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#likes-increment-update
@api_view(['GET'])
def likesUpdate(request, pk):
    try:
        item = Item.objects.get(id=pk)
    except Item.DoesNotExist:
        return Response({'error': 'Item does not exist'})

    serializer = ItemSerializers(instance=item, data=request.data, partial=True)
    
    if serializer.is_valid():
        item.likes += 1  # increment the views field by 1
        item.save()  # save the updated instance to the database
        serializer.save()  # update the instance with the serializer data
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#likes-decrement-update
@api_view(['GET'])
def dislikeUpdate(request, pk):
    try:
        item = Item.objects.get(id=pk)
    except Item.DoesNotExist:
        return Response({'error': 'Item does not exist'})

    serializer = ItemSerializers(instance=item, data=request.data, partial=True)
    
    if serializer.is_valid():
        item.likes -= 1  # increment the views field by 1
        if item.likes > 0:
            item.save()  # save the updated instance to the database
            serializer.save()
        else:
            item.likes = 0
            item.save()
            serializer.save()  # update the instance with the serializer data
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#This function collects all the categories availables in the table Categories in order to be redered as options to select when posting an item.
@api_view(['GET'])
def getCategories(request):
    items = Categories.objects.all()
    serializer = CategorySerializers(items, many=True)
    return Response(serializer.data)

#When posting an item, if the user can't find an appropiate category, the user can add its own custom category. that will be saved in the Categories table db.
@api_view(['POST'])
def categoryCreate(request):
    serializer = CategorySerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({"status": "Category succesfully created"})


## Down Bellow the ML handle functions: 
## getRankingReccom() is FE and BE integrated integrated in the server however, getSimilarRecomm() has no frontend integration as it worked partially,
## this was due to the large amount of data needed in order to perform.
##Their respective functions were manually integrated in the server directory.

#KARINAS MACHINE LEARNING FUNCTION HANDLER
# @api_view(['GET'])
# def getRakingRecomm(request):
#     category_arg = request.query_params.get('chosen_category')
#     # the ML model returns the id of 3 ranked recommended items based on the category selected on the search bar
#     id1, id2, id3 = create_ranking_df(category_arg)
#     obj1 = Item.objects.get(id=id1)
#     obj2 = Item.objects.get(id=id2)
#     obj3 = Item.objects.get(id=id3)
#     ranked_items = []
#     serialized_obj1 = ItemSerializers(obj1).data
#     ranked_items.append(serialized_obj1)
#     serialized_obj2 = ItemSerializers(obj2).data
#     ranked_items.append(serialized_obj2)
#     serialized_obj3 = ItemSerializers(obj3).data
#     ranked_items.append(serialized_obj3)

#     return Response(ranked_items)

#Antoine MACHINE LEARNING FUNCTION HANDLER
# @api_view(['GET'])
# def getSimilarRecomm(request):
#     category_arg = request.query_params.get('chosen_category')
#     recommended_items = get_the_recommendations(category_arg)
#     obj = Item.objects.get(id=recommended_items[0])
#     serialized_obj = ItemSerializers(obj).data
#     return Response(serialized_obj)