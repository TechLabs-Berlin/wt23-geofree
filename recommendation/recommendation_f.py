import sqlite3
import pandas as pd
import urllib.parse
import urllib.parse
import requests
from urllib.parse import urlparse
import json




def create_ranking_df(chosen_category):
    # connect the db
    conn = sqlite3.connect('data/db.sqlite3')
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
    ranking_df['creation_date'] = pd.to_datetime(ranking_df['creation_date'])
    ## create a new column with post's ages in hours  (it was a duplicity, creation_data is already ranked)
    # ranking_df['age'] = round((pd.Timestamp.now() - ranking_df['creation_date']) / pd.Timedelta(hours=1), 1)
    # create a new copy of the df
    ranking_df_filtered = ranking_df.copy()
    # filter by categories
    ranking_df_filtered = ranking_df_clean[ranking_df_clean['categories'] == chosen_category]
    # rank these columns
    ranking_df_filtered['creation_date_rank'] = ranking_df_filtered['creation_date'].rank(method='min', ascending=True)
    ranking_df_filtered['condition_rank'] = ranking_df_filtered['condition'].rank(method='min', ascending=True)
    ranking_df_filtered['views_rank'] = ranking_df_filtered['views'].rank(method='min', ascending=False)
    ranking_df_filtered['likes_rank'] = ranking_df_filtered['likes'].rank(method='min', ascending=False)
    # ranking_df_filtered['age_rank'] = ranking_df_filtered['age'].rank(method='min', ascending=True)
    ranking_df_filtered['overall_rank'] = (ranking_df_filtered['creation_date_rank'] + ranking_df_filtered['condition_rank'] + ranking_df_filtered['views_rank'] + ranking_df_filtered['likes_rank']) / 4
    # sort by the higher overall_rank
    ranking_sorted = ranking_df_filtered.sort_values(by='overall_rank', ascending = False)
    # save only the ids
    ranked_id = ranking_sorted['id']
    return ranked_id


# chosen_category = 'Furniture'
chosen_category = 'Clothes'
chosen_category = chosen_category.upper()

create_ranking_df(chosen_category)
# prepare_df(ranking_df)
# recommend(chosen_category)