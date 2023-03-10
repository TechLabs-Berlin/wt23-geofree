#!/usr/bin/env python
# coding: utf-8

# # Creating a MOCK dataset
# __________________________________________

# The process to create a fake dataset started by making dataframes about `users` and `item`, and further a complete dataframe that could be used in the `model`.
# 
# `numpy random` and `faker` were used to ccreate randomized series. Latutude_longitude points were picked using a polingon mathos, consideing four ponts choosen manually in Google Maps.
# 
# Dependent variables are part of a same series, identified by underscore.
# 
# Addresses are illustrative, they are addresses from all over Germany. This is a limitation of the Faker package, which only considers countries, and does not have data for Berlin.
# 
# _________________________________
# 
# ## Questions:
# - HOW LONG DO THE ITEMS GET IN THE APP? (IF NOBODY CHANGE ITS STATUS?) WHAT ABOUT 7 DAYS?
# 
# _________________________________
# 
# ### TODOs:
# - ADD WEIGHT FOR VALUES?
# - ADD BLANKS?
# - COULD HAVE: FIND AND API FOR ADDRESSES IN BERLIN
# - COULD HAVE: DOWNLOAD PICTURES USING API: https://unsplash.com/developers or scrape the website free your stuff berliin.
# - COULD HAVE: Create a data frame with item_id and item_picture
# _________________________________
# 

# In[67]:


# import packages
import pandas as pd
from faker import Faker, providers
from faker.providers.address.de_DE import Provider as DeDeAddressProvider
from faker.generator import random
from faker.providers import BaseProvider
# import random


# ### Postcodes

# In[68]:


# immport and clean original dataset removing poostcodes from Germanay, that are not in Berlin
postcodes_de = pd.read_excel(r'ds_mock_datasets/data/original/German-Zip-Codes.xlsx', sheet_name='Berlin')
df = pd.DataFrame(postcodes_de)
df.set_axis(["postcodes_berlin"], axis=1,inplace=True)
df = (df["postcodes_berlin"].str[8:-11])
df.to_csv('ds_mock_datasets/data/postcodes_berlin.csv', index=False)


# ### Creating the postcode series

# In[69]:


# import postcodes from Berlin and create a dataframe removing indexes and headers
postcodes_berlin = pd.read_csv('ds_mock_datasets/data/postcodes_berlin.csv')
print(postcodes_berlin)
postcodes_berlin_series = postcodes_berlin[:][1:].squeeze()


# ### Creating lists

# #### lat lng : choosing random point based on a polygon
# reference: 
#     A quick trick to create random lat/long coordinates in python (within a defined polygon)
# https://medium.com/the-data-journal/a-quick-trick-to-create-random-lat-long-coordinates-in-python-within-a-defined-polygon-e8997f05123a

# In[70]:


# Importing Modules
import numpy as np
import random
# Use 'conda install shapely' to import the shapely library.
from shapely.geometry import Polygon, Point

num_records = 10


# ### Creating the datasets

# In[71]:


# Note: # multi_locale_generator = Faker(['it_IT', 'en_US', 'de-DE', 'pt_BR', 'es-ES', 'fr-FR', 'ru-RU', 'tr-TR'])

# Instantiate Faker with multiple locales
german_locale_generator = Faker(['de_DE'])
fake = Faker()
Faker.seed(0)


# In[72]:


#  First code, I improved it 

# user_mock_df = pd.DataFrame({'user_name': [german_locale_generator.name() for i in range(num_records)],
#                              'user_email': [german_locale_generator.email() for i in range(num_records)],
#                              'user_address': [german_locale_generator.address() for i in range(num_records)],
#                              'user_type': [random.choices(user_type, k=1) for i in range(num_records)],
#                              'user_lat_lng': [polygon_random_points(poly,1) for i in range(num_records)]
#                               })

# item_mock_df = pd.DataFrame({'item_name-item_category':[random.choices(category_item, k=1) for i in range(num_records)],
#                             'item_postcode': [random.choices(postcodes_berlin_series, k=1) for i in range(num_records)],
#                             'item_status': [random.choices(item_status, k=1) for i in range(num_records)],
#                             'item_lat_lng': [polygon_random_points(poly,1) for i in range(num_records)],
#                             'item_datetime_posted': [german_locale_generator.date_time_this_year() for i in range(num_records)],
# #                             'item_datetime_statuschanged': 
# #                              'userwhochangeditemstatus_id': 
                             
#                              })



# In[73]:


# Define the desired polygon : points choosen in Google maps

poly = Polygon([(52.645883, 13.395869), 
                (52.526568, 13.645808),
                (52.381789, 13.405482),
                (52.484773, 13.136317)])


min_x = 52.381789
max_x = 52.645883
min_y = 13.136317
max_y = 13.645808

# Defining the randomization generator
def polygon_random_points (poly, num_records):
    min_x, min_y, max_x, max_y = poly.bounds
    points = []
    while len(points) < num_records:
        random_point = Point([random.uniform(min_x, max_x), random.uniform(min_y, max_y)])
        if (random_point.within(poly)):
            points.append(random_point)
    return points
    # Choose the number of points desired. T\ 
points = polygon_random_points(poly,num_records)
# Testing the results.
for p in points:
    print(p.x,",",p.y)
                             


# ### User

# In[74]:


# define a function to create user data

user_type = ['giver', 'looker']


def create_user_data(num_records): 
  
    # dictionary 
    user ={} 
    for i in range(0, num_records): 
        user[i] = {} 
        user[i]['name'] = fake.name()
#         user[i]['email'] = fake.email()
#         user[i]['email'] = fake.ascii_free_email()
        user[i]['email'] = fake.ascii_email()
        user[i]['address'] = german_locale_generator.address()  # these addresses are from germany, find a list of address for berlin
        user[i]['user_type'] = fake.random_element(user_type)
        user[i]['user_lat_lng'] = polygon_random_points(poly,1)
        user[i]['user_postcode'] = np.random.choice(postcodes_berlin_series)

    return user


# In[75]:


user_mock_df = pd.DataFrame(create_user_data(1000)).transpose()
user_mock_df.head(5)


# In[76]:


# add user_ids 
user_mock_df['user_id'] = user_mock_df.index + 1
user_id_series = user_mock_df['user_id']


# ### Item

# In[77]:


item_status = ['avaliable', 'not_available']
item_condition = ['good_condition','medium_condition''bad_condition']

category_item = ['furniture-sofa'
                 'furniture-armchair',
                 'furniture-chair',
                 'furniture-table',
                 'furniture-bed',
                 'furniture-bookcase',
                 'furniture-bedside_table',
                 'furniture-cabinet',
                 'furniture-rollcontainers',
                 'furniture-shoe_rack',
                 'furniture-mirror',
                 'furniture-cot',
                 'appliance-washing_machine',
                 'appliance-dish_washer',
                 'appliance-drying_rack',
                 'appliance-refrigerator',
                 'appliance-blender',
                 'appliance-extractor_hood',
                 'appliance-clothes_iron',
                 'appliance-vacuum_cleaner',
                 'appliance-sandwich_maker',
                 'appliance-kettle',
                 'appliance-air_conditioner',
                 'appliance-heater',
                 'appliance-pan',
                 'appliance-popcorn_maker',
                 'appliance-coffee_machine',
                 'appliance-stove',
                 'lighting-lighting',
                 'lighting-chandelier',
                 'lighting-lightbulb',
                 'musical_equipment-guitar',
                 'musical_equipment-sound_amplifier',
                 'musical_equipment-contrabass',
                 'musical_equipment-battery',
                 'musical_equipment-piano',
                 'tech-desktop',
                 'tech-laptop',
                 'tech-phone',
                 'tech-keyboard',
                 'clothes-woman_jacket',
                 'clothes-man_jacket',
                 'clothes-child_jacket',
                 'clothes-woman_clothes',
                 'clothes-man_clothes',
                 'clothes-child_clothes',
                 'shoes-woman_shoes',
                 'shoes-manshoes',
                 'shoes-child_shoes',
                 'miscelaneaous-ironing_board',
                 'miscelaneaous-baby_carriage',
                 'miscelaneaous-picture_frame',
                 'miscelaneaous-bicycle',
                 'miscelaneaous-plant',
                 'miscelaneaous-carpet',
                 'miscelaneaous-roller_skates',
                 'miscelaneaous-ski_skates',
                 'miscelaneaous-books']


# In[78]:


# define a function to create item data

def create_item_data(num_records): 
  
    # dictionary 
    item ={} 
    for i in range(0, num_records): 
        item[i] = {}
        item[i]['item_name-item_category'] = np.random.choice(category_item)
        item[i]['item_condition'] = np.random.choice(item_condition)
        item[i]['item_postcode'] = np.random.choice(postcodes_berlin_series)
        item[i]['item_status'] = np.random.choice(item_status)
        item[i]['user_lat_lng'] = polygon_random_points(poly,1)
        item[i]['userwhochangeditemstatus_id'] = np.random.choice(user_id_series)
        datetime_iteration1 = fake.date_between_dates('-7d','now')
        datetime_iteration2 = fake.date_between_dates('-7d','now')
        if datetime_iteration1 <= datetime_iteration2:
            item[i]['item_datetime_posted'] = datetime_iteration1
            item[i]['item_datetimechangeditemstatus'] = datetime_iteration2
        else:
            item[i]['item_datetime_posted'] = datetime_iteration2
            item[i]['item_datetimechangeditemstatus'] = datetime_iteration1  
 # This date shold be later than the post
        

    return item


# In[79]:


item_mock_df = pd.DataFrame(create_item_data(1000)).transpose()
item_mock_df.head(5)


# In[80]:


# item_mock_df = pd.DataFrame({'item_name-item_category':[random.choices(category_name, k=1) for i in range(num_records)],
#                             'item_postcode': [random.choices(postcodes_berlin_series, k=1) for i in range(num_records)],
#                             'item_status': [random.choices(item_status, k=1) for i in range(num_records)],
#                             'item_lat_lng': [polygon_random_points(poly,1) for i in range(num_records)],
#                             'item_datetime_posted': [german_locale_generator.date_time_this_year() for i in range(num_records)],
# #                             'item_datetime_statuschanged': 
# #                              'userwhochangeditemstatus_id': 
#                              })


# In[81]:


item_mock_df['item_id'] = item_mock_df.index +1  # add item_id
item_id_series = item_mock_df['item_id']  # storage in a variable to use later


# ### Model

# In[82]:


# define a function to create model data

def create_model_data(num_records): 
  
    # dictionary 
    model ={} 
    for i in range(0, num_records): 
        model[i] = {} 
        model[i]['item_id'] = np.random.choice(item_id_series)
        model[i]['item_name-item_category-item'] = np.random.choice(category_item)
        model[i]['item_condition'] = np.random.choice(item_condition)
        model[i]['item_lat_lng'] = polygon_random_points(poly,1)
        model[i]['item_postcode'] = np.random.choice(postcodes_berlin_series)
        model[i]['item_status'] = np.random.choice(item_status)
        model[i]['userwhoposted_id'] = np.random.choice(user_id_series)
        model[i]['userwhopickedup_id'] = np.random.choice(user_id_series)
        model[i]['userwhochangeditemstatus_id'] = np.random.choice(user_id_series)
        model[i]['userwhochangeditemstatus_lat_lng'] = polygon_random_points(poly,1)
        model[i]['searched_item_name-searched_item_category-searched_item'] = np.random.choice(category_item)
        model[i]['searched_postcode'] = np.random.choice(postcodes_berlin_series)
        datetime_iteration1 = fake.date_between_dates('-7d','now')
        datetime_iteration2 = fake.date_between_dates('-7d','now')
        if datetime_iteration1 <= datetime_iteration2:
            model[i]['item_datetime_posted'] = datetime_iteration1
            model[i]['item_datetimechangeditemstatus'] = datetime_iteration2
        else:
            model[i]['item_datetime_posted'] = datetime_iteration2
            model[i]['item_datetimechangeditemstatus'] = datetime_iteration1  
       
    return model


# In[83]:


model_mock_df = pd.DataFrame(create_model_data(1000)).transpose()
model_mock_df.head(5)


# In[84]:


# item_id_series = item_mock_df['item_id']
# user_id_series = user_mock_df['user_id']

# for_model_mock_df = pd.DataFrame({'item_id': [random.choices(item_id_series, k=1) for i in range(num_records)],
#                                   'item_name-item_category': [random.choices(category_item, k=1) for i in range(num_records)],  
#                                   'item_lat_lng': [polygon_random_points(poly,1) for i in range(num_records)], 
#                                   'item_postcode': [random.choices(postcodes_berlin_series, k=1) for i in range(num_records)], 
#                                   'item_status':
#                                   'userwhoposted_id': [random.choices(user_id_series, k=1) for i in range(num_records)],
#                                   'userwhopickedup_id': [random.choices(user_id_series, k=1) for i in range(num_records)], 
#                                   'userwhochangeditemstatus_id': [random.choices(user_id_series, k=1) for i in range(num_records)], 
#                                   'userwhochangeditemstatus_lat_lng': [polygon_random_points(poly,1) for i in range(num_records)],
#                                   'searched_item_name-searched_item_category': [random.choices(category_item, k=1) for i in range(num_records)], 
#                                   'searched_postcode': [random.choices(postcodes_berlin_series, k=1) for i in range(num_records)],
#                                   'item_datetime_posted': [german_locale_generator.date_time_this_year() for i in range(num_records)], 
# #                                   'item_datetime_statuschanged': [german_locale_generator.date_time_this_year() for i in range(num_records) if german_locale_generator.date_time_this_year() > item_datetime_posted]
#                                   })


# ### Creating csv files

# In[85]:


user_mock_df.to_csv('ds_mock_datasets/data/user_mock_data.csv', index=False)


# In[86]:


item_mock_df.to_csv('ds_mock_datasets/data/item_mock_data.csv', index=False)


# In[87]:


model_mock_df.to_csv('ds_mock_datasets/data/model_mock_data.csv', index=False)


# ### COULD HAVE:  Create a data frame with item_id and item_picture

# In[88]:


# item_picture_mock_df = pd.DataFrame({item_mock_df['item_id'].
#                            'item_datetime_picture':



# ## References:
# 
# - [Generate custom datasets using Python Faker](https://blogs.sap.com/2021/05/26/generate-custom-datasets-using-python-faker/)
