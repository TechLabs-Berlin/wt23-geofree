import pandas as pd

# # postcodes from Berlin
# postcodes_de = pd.read_excel(r'data/original/German-Zip-Codes.xlsx', sheet_name='Berlin')
# df = pd.DataFrame(postcodes_de)
# df.set_axis(["postcodes_berlin"], axis=1,inplace=True)
# df = (df["postcodes_berlin"].str[8:-11])
# df.to_csv('data/postcodes_berlin.csv', index=False)


# user names and adresses (https://learn.microsoft.com/en-us/openspecs/office_standards/ms-oe376/6c085406-a698-4e12-9d4d-c3b0ee3dbc4a)

# from faker import Faker
from faker import Faker, providers
from faker.providers.address.de_DE import Provider as DeDeAddressProvider


from faker import Faker
import random
postcodes_berlin = pd.read_csv('data/postcodes_berlin.csv')
postcodes_berlin_series = postcodes_berlin[:][1:].squeeze()
user_type = ['giver', 'looker']
status = ['avaliable', 'not_available']
items = ['furniture_sofa',
        'furniture_armchair',
        'furniture_chair',
        'furniture_table',
        'furniture_bed',
        'furniture_bookcase',
        'furniture_bedsidetable',
        'furniture_cabinet',
        'furniture_rollcontainers',
        'furniture_shoerack',
        'furniture_mirror',
        'furniture_cot',
        'appliance_washingmachine',
        'appliance_dishwasher',
        'appliance_dryingrack',
        'appliance_refrigerator',
        'appliance_blender',
        'appliance_extractorhood',
        'appliance_clothesiron',
        'appliance_vacuumcleaner',
        'appliance_sandwichmaker',
        'appliance_kettle',
        'appliance_airconditioner',
        'appliance_vacuumcleaner',
        'appliance_heater',
        'appliance_pan',
        'appliance_popcornmaker',
        'appliance_coffeemachine',
        'appliance_stove',
        'lighting_lighting',
        'lighting_chandelier',
        'lighting_lightbulb',
        'musicalequipment_guitar',
        'musicalequipment_soundamplifier',
        'musicalequipment_contrabass',
        'musicalequipment_battery',
        'musicalequipment_piano',
        'tech_desktop',
        'tech_desktop',
        'tech_laptop',
        'tech_phone',
        'tech_keyboard',
        'clothes_womanjacket',
        'clothes_manjacket',
        'clothes_childjacket',
        'clothes_womanclothes',
        'clothes_manclothes',
        'clothes_childclothes',
        'shoes_womanshoes',
        'shoes_manshoes',
        'shoes_childshoes',
        'miscelaneaous_ironingboard',
        'miscelaneaous_babycarriage',
        'miscelaneaous_pictureframe',
        'miscelaneaous_bicycle',
        'miscelaneaous_plant',
        'miscelaneaous_carpet',
        'miscelaneaous_rollerskates',
        'miscelaneaous_ski skates']


# multi_locale_generator = Faker(['it_IT', 'en_US', 'de-DE', 'pt_BR', 'es-ES', 'fr-FR', 'ru-RU', 'tr-TR'])
german_locale_generator = Faker(['de_DE'])

num_records = 10
user_mock_df = pd.DataFrame({'user_name': [german_locale_generator.name() for i in range(num_records)],
                   'user_address': [german_locale_generator.address() for i in range(num_records)],
                   'lat': [german_locale_generator.latitude() for i in range(num_records)],  # option fake.latlng()
                   'lng': [german_locale_generator.longitude() for i in range(num_records)],
                   'user_type': [random.choices(user_type, k=1) for i in range(num_records)]
                   })


item_mock_df = pd.DataFrame({'item_name':[random.choices(items, k=1) for i in range(num_records)],
                            'lat': [german_locale_generator.latitude() for i in range(num_records)],  # option fake.latlng()
                            'lng': [german_locale_generator.longitude() for i in range(num_records)],
                            'postcodes': [random.choices(postcodes_berlin_series, k=1) for i in range(num_records)],
                            'status': [random.choices(status, k=1) for i in range(num_records)]
                            })

print(user_mock_df)
# print(item_mock_df)

# strings_users = ['user_name', 'user_address', 'user_type']
strings_users = ['user_name', 'user_type']
strings_items = ['item_name', 'postcodes', 'status']

for i in strings_users:
    user_mock_df[i] =  user_mock_df[i].astype(str)

for i in strings_items:
    user_mock_df[i] =  item_mock_df[i].astype(str)

user_mock_df.info()





