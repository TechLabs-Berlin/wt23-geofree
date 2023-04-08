
import urllib.parse
import requests
import urllib.parse
from urllib.parse import urlparse


url_search = 'https://geofree.pythonanywhere.com/api/get-categories/'
response2 = requests.get(url_search)

parsed_url = urlparse(url_search)
path = parsed_url.path

get_categories = response2.json()
get_categories

chosen_category = get_categories[0]['name']
chosen_category


# For the implementation, in was used Python decoratoor in Django REST framework  to define a view function that can handle HTTP requests.

# @api_view(['GET'])
# def getRakingRecomm(request):
#     category_arg = request.query_params.get('chosen_category')
#     # the ML model returns the id of 3 ranked recommended items based on the category selected on the search bar
# #    recommendation_dir = os.path.join(settings.BASE_DIR, 'm_l', 'recommendation')
# #    sys.path.append(recommendation_dir)
# #    from  recommendation_f import create_ranking_df
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
