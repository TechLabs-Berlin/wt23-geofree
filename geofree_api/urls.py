from django.urls import path
from . import views

#This array contatins all the url paths that represent the rest pints of the API

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('item-list/', views.itemList, name="item-list"),
    path('item-detail/<str:pk>', views.itemDetail, name="item-detail"),
    path('item-create/', views.itemCreate, name="item-create"),
    path('item-update/<str:pk>', views.itemUpdate, name="item-update"),
    path('item-delete/<str:pk>', views.itemDelete, name="item-delete"),
    path('views-update/<str:pk>', views.viewsUpdate, name="views-update"),
    path('like-item/<str:pk>', views.likesUpdate, name="like-item"),
    path('dislike-item/<str:pk>', views.dislikeUpdate, name="dislike-item"),
    path('category-create/', views.categoryCreate, name="category-create"),
    path('get-categories/', views.getCategories, name="get-categories"),
    path('item-categories-list/', views.itemListCategories, name="list-categories"),
    path('item-list-distance/', views.itemListDistance, name="item-list-distance"),
    path('item-user-distance/', views.calculate_distance, name ="distance-user"),
    path('item-user-distance-id/', views.calculate_distance_id, name ="distance-user-id"),
    path('item-ages/', views.getItemAges, name ="item-ages"),
     path('ml-ranking/', views.getRakingRecomm, name='ranking')
]