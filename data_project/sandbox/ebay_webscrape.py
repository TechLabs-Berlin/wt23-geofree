# Python web scraping project Extract offers from eBay
# https://www.youtube.com/watch?v=e6UQPXK6xpI

import requests
from bs4 import BeautifulSoup

link = "https://www.ebay-kleinanzeigen.de/s-berlin/zu-verschenken/k0l3331"
# print(link)


abfrage = requests.get(link)

print(abfrage.status_code)

# abfrage.text

soup = BeautifulSoup(abfrage.text, "html5lib")

# >> inspect

urls = soup.find_all("a", {"class": "s-item__link"})
# print(urls)
print(len(urls))


for url in urls:
	# print(url.txt)
	print(url["href"])