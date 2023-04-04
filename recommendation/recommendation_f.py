import sqlite3
import pandas as pd
import urllib.parse
import requests
from urllib.parse import urlparse
import json
import random


def create_ranking_df(chosen_category):
    # connect the db
    conn = sqlite3.connect('./db.sqlite3')
    # creates a cursor object that allows Python code to interact with the SQLite database
    cursor = conn.cursor()
    # execute the query
    cursor.execute("SELECT * FROM geofree_api_item;")
    # the rows from the result set obtained by executing an SQL query
    rows = cursor.fetchall()
    # select the table
    ranking_df = pd.read_sql_query("SELECT * from geofree_api_item", conn)
    # close sql connection
    conn.close()
    # remove the column point
    ranking_df = ranking_df.drop('point', axis=1)
    # encode the column condition
    ranking_df['condition'] = ranking_df['condition'].replace('like_new', 1).replace('good', 2).replace('acceptable', 3).replace('poor', 4)
    # convert the column creation_date in datetime
    ranking_df['timedate_creation'] = pd.to_datetime(ranking_df['timedate_creation'])
    ## create a new column with post's ages in hours  (it was a duplicity, creation_data is already ranked)
    # ranking_df['age'] = round((pd.Timestamp.now() - ranking_df['creation_date']) / pd.Timedelta(hours=1), 1)
    # create a new copy of the df
    ranking_df_filtered = ranking_df.copy()
    # filter by categories and available
    ranking_df_filtered = ranking_df_filtered[(ranking_df_filtered['categories'] == chosen_category) & (ranking_df_filtered['available'] == True)]
    # rank these columns
    ranking_df_filtered['timedate_creation_rank'] = ranking_df_filtered['timedate_creation'].rank(method='min', ascending=True)
    ranking_df_filtered['condition_rank'] = ranking_df_filtered['condition'].rank(method='min', ascending=True)
    ranking_df_filtered['views_rank'] = ranking_df_filtered['views'].rank(method='min', ascending=False)
    ranking_df_filtered['likes_rank'] = ranking_df_filtered['likes'].rank(method='min', ascending=False)
    # ranking_df_filtered['age_rank'] = ranking_df_filtered['age'].rank(method='min', ascending=True)
    ranking_df_filtered['overall_rank'] = (ranking_df_filtered['timedate_creation_rank'] + ranking_df_filtered['condition_rank'] + ranking_df_filtered['views_rank'] + ranking_df_filtered['likes_rank']) / 4
    # sort by the higher overall_rank
    ranking_sorted = ranking_df_filtered.sort_values(by='overall_rank', ascending = False)
    # save only the ids
    ranked_id = ranking_sorted['id'] # limit to the 1st, 2nd and 3rd results.
# if the length of the list is 0, return 3 random ids
    if len(ranked_id) == 0:
        id_1 = random.choice(ranking_df['id'])
        id_2 = random.choice(ranking_df['id'])
        id_3 = random.choice(ranking_df['id'])
    # if the length of the list is 1, return the id in the list as id_1  and random ids for id_2 and id_3
    elif len(ranked_id) == 1:
        id_1 = ranked_id[0]
        id_2 = random.choice(ranking_df['id'])
        id_3 = random.choice(ranking_df['id'])
    # if the length of the list is 2, return the ids in the list as id_1, id_2  and random id id_3
    elif len(ranked_id) == 2:
        id_1 = ranked_id[0]
        id_2 = ranked_id[1]
        id_3 = random.choice(ranking_df['id'])
    # if the length of the list is 3 or more, return the ids in the list as id_1, id_2, and id_3
    else:
        id_1 = ranked_id[0]
        id_2 = ranked_id[1]
        id_3 = ranked_id[3]

    return id_1, id_2, id_3

