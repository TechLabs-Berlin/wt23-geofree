
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