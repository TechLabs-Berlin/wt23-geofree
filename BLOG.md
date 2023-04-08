# Blog Post: Geofree

## Table of contents

1. [Team Members](#team-members)
2. [Introduction](#introduction)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [UX Design](#ux-design)
6. [Data Science](#data-science)
7. [Conclusion](#conclusion)

## Introduction

Geofree is a web app that allows users to post objects that they no longer need and want to give away. Those in need of free items can search the app for desired objects or browse through free items in their area.

## Team Members

Joanna Kowalik | Web Developer
Felipe Saez | Web Developer
Deniz Kocyigit | User Experience Designer
Farida Elchuzade | User Experience Designer
Manvitha Konkimalla | User Experience Designer
Karina Condeixa | Data Scientist
Antoine Cloet | Data Scientist

Geofree is a web app that allows users to post objects that they no longer need and want to give away. Those in need of free items can search the app for desired objects or browse through free items in their area.

## Frontend

**Tech stack**: ReactJS, MaterialUI, Google Maps API and Netlify.
Geofree is a responsive web app that functions on desktop devices as well as mobile. It consists of 18 functioning components that together build an intuitive environment, which allows users to search and post donated items.

The most important components were:

### 1. Map page

The first page we finalised by importing GoogleMap dependencies. By specifying API key in the .env.local (and then uploaded as a variable to Netlify on deployment) we were able to display a map, style it by removing unnecessary points of interest and markers, and include our own markers. The Map asks the user for their position using geolocation function, fetches items from the database created by Backend, filters through the markers using user input from the Search function, and in the end zooms in to the bounds of displayed markers. When a marker is clicked, it unfolds into an item card.

![Code and screenshot of Map component](/src/images/Map.png)

### 2. Home (list page)

Home page is a list of all available items. The Search function applies there too and results are filtered out based on user input. The displayed items show following information:

- name of the item
- its description
- its availability (whether is has been marked as taken or not)
- the date of the posting

When the user clicks on a selected item, they’re being taken to an ItemDetail page, where more information is displayed. When the Search function is used, the user sees recommended items (function developed with machine learning by the Data Science team).

![Code and screenshot of List component](/src/images/List.png)
![Screenshot of Recommendations](/src/images/Recommendations.png)

### 3. Post page

Post page allows users to upload their own donated item to the server. It takes in photos, name, description, category, condition and location (by geolocation function) of the item. When an item is submitted, it shows up on both the Map and Home page.

![Code and screenshot of Post component](/src/images/Post.png "Post component")

### Additional functionality

Geofree allows user feedback when an item is unavailable (taken or destroyed). This was achieved by implementing a “Mark as taken” button in the ItemDetail page. In order to prevent users from “reserving” items they are interested in picking up later, the button is only enabled, when the user is in a 100 m radius from the item.

![Screenshot of Mark as Taken button](/src/images/Markbutton.png "Mark as Taken button")

## Backend

**Tech stack**: Django, DRF (Django Rest Framework), SQLlite3 (DB), Spatialite(Spatial DB)
Being aware that this solution should work with media and georeferenced data. I knew that it would represent a major struggle as the backend subjects of the Udemy course were completely new for me (NodeJS and MongoDB). Since I already had little experience practicing with Django as a full stack environment. I decided to use that advantage plus I also had a mental picture of how I could approach the frontend needs. However, I still didn’t have any clue on how to work with receiving and storing images, location data and its respective code work for processing that data in order to do a Response with the right querysets when handling “GET” requests with geo-search queries.

### 1: **Data Structure**

Along with the DS team, we agreed on basic terms of how the data should be structured. Every “Item post” done by the app user would represent a table in the DB, with crucial information that will be stored on the instances/attributes of the Item (Title, description, availability, date of creation, categories).

**Django, an excellent full-stack python web framework:** As I mentioned before, I had little experience working with Django. Though, this experience was mostly related to doing projects that considered the full-stack environment. This is because Django, as a full-stack web framework, comes with an integrated SQL database, package modules that helps, via python scripts, to define the tables on that DB. In the Django/Python language, these tables are called “Models”, where every Model has instances which I could define the type of content they should accept (string fields, float fields, image fields, boolean fields, etc). Once the Models are defined, Django handles the frontend with two extra steps: 1. Defining the views with functions that retrieve the “models” data rendered on static files (html, css, jpeg, etc). 2. Defining the url paths that will be linked to those views functions (The urls can be dynamic by adding primary keys such as the table/model id attribute).

So far pretty cool with Django as a Web Framework, however, this time I will have a teammate that will do the whole Frontend work on React JS (JavaScript Library). So, from Django I will only need the backend features and all its Python power.

### 2: **How to connect a Python based backend with a JS based frontend?**

From my previous Django projects, multiple times I had to look for guidance/tutorials to open source tech communities like “Stackoverflow” or Youtbe videos. And more than one time I read some concepts like “Rest framework”, “serialized data”, “API view”, “corsheaders”, etc. This was the time I had to dig into that, understand the nature of its purpose and implement it.

**Django Rest Framework** is a toolkit that allows to (sort of saying) “place the DB” on a browsable Rest Point. In other words; Our Django views functions will now handle “requests” (GET, POST, PATCH, DELETE etc) from third-party endpoints. And our URls that originally would return static files, now will return JSON responses with either: The respective data requested in case of GET requests, or Http Response in case of POST requests (Status: 200 ok, 500 internal error, etc).
Django Rest Framework includes decorators called “API_VIEWS” that allow me to test and visualize those JSON responses on my browser. Very handy to see if my function code is doing the job I want it to do. For example: saving, updating, filtering, etc.

Perfect, so now that I defined the parameters and the data structure of the DB model, Joanna would be able to populate the DB, request data and update it via “fetch requests” using the URLs defined in django.

**Couple of things to consider to setup the Django/React integration:**

**Cross-Origin Resource Sharing (CORS):** For sake of security, by default, Django is set to allow requests that come only from the same server where Django is being run. That means that, If I deploy the backend in a host server with a domain: “https://example.com”, Joanna won’t be able to fetch my URLS either from her localhost or any other deployment server than “example.com”. The solution for this was the installation of an application/dependency called “django-cors-headers''. This will allow me to modify the settings and create a white list of origins or set it in a way that anyone can fetch my URLS.

### 3: **What to do if the Item post includes a picture (Or multiple pictures)?**

When using Django as a full-stack framework, it’s pretty easy because python does the whole job behind the scenes. This time, since the media files are coming from React JS via POST request, I would have to code the behaviour in order to receive and store them (In a separate file? or Directly in the DB?). I approached this by creating a second table in the database that would handle the images. This means, in the models files of Django, I would create a second Image Model that is linked to the Item model using the Item “id” as a foreign key. Simultaneously I defined a function that would create a separate media folder that stores the images (sorted by the item id) and the Image Table would store the path of that respective images to that media folder. In order to implement this, I had to get very familiar and understand the concept and purpose of the “data serialization” in Django. The serialization works as a “form validator” of the data that comes out of our rest points. This is performed in a python file called “serializers.py”. We can alter/edit/restrain which columns/attributes of a Model/Table we want to render on the JSON response and (for this case), since the objects of the Image Table are linked with the “id” of every Item as a foreign key. We can add to the “Item” objects response the array of its respective paths images.

Needless to say that in order to succeed with my goal for the image handling, I spent several hours trying and failing.

So far, I have learnt and accomplished tremendously. I created a backend environment that is able to handle POST, PATCH, GET requests including their respective pictures.

_Remember I mentioned the URLs are defined to visualize the responses?. With a couple of extra lines of code I defined a url path to display the images as a “media URL”. This URL path would be the prefix followed by the respective image path fetched and mapped by Joanna._

![Item-model-in-views.py](https://geofree.pythonanywhere.com/media/images_blog/Screenshot%202023-04-06%20at%2016.58.03.png)

_3 tables defined on models (Categories, Item, ItemImages). The first function (upload_path)creates the path to a media file where images are stored._

### 4: **First deployment of Rest Framework.**

Since Joanna had to constantly work with fetch request functions on the React components, she would need an end point where she can practise and test her own item posts. I first downloaded the backend framework on her computer and taught her how to run the server locally in order to fetch the urls I had built so far. However, we figured this approach won’t be the most effective as it would demand Joanna to learn python basics and the whole logic of Django. It would be time consuming plus I would be constantly updating the code version and could lead to multiple confusions.

I decided to look for deployment options so Frontend would only focus on receiving (from me) the right URLs and start fetching the data in order to polish the style and responsiveness features.

_One more time a big Shootout to our mentor Larry D’Almeida for taking the time to explain in detail what exactly means “to deploy” a website, the concepts I had to keep in mind, the relationship between the DB and the server, the different approaches I could perform, what is a virtual machine, etc._

Since the backend is built in python, I needed a server that supports Python based frameworks. The most popular seemed to be Heroku, however, since last year, they stopped their free subscription account version. But found another one called “PythonAnywhere”, with a free tier version (limited data storage quota but enough to have a decent amount of pictures). I spent a couple of days watching and reading tutorials in order to do the deployment. As Larry said, the server is nothing but a virtual machine. Actually, PythonAnywhere has bash consoles where I could git fetch/pull my backend repo, create a directory, set up the static/media files path and voilá, we had our Rest Point live and running. Now Joanna only had to add the prefix of the PythonAnywhere account domain before defined URLs.

Now I could keep working locally on further updates of the server and Joana focused on when, where and how to do the fetch.

### 5: **Working with coordinates, GeoDjango, Spatial DB**

This was by far the major challenge of the code work, along with understanding and being aware (As a lesson) fundamentals such as the importance of choosing beforehand the right database that supplies the project needs.

I thought that working with coordinates would be as simple as asking Joanna to include (as params) the latitude and longitude in the “GET” request and then figure out a way to calculate distances and so on. However, it wouldn’t be that easy. On my previous research I heard about GeoDjango, I thought it would be just another regular application/dependency that would allow me to import modules that do the job, however, GeoDjango works with “SRID” values (Spatial Reference System Identity). Long story short: I had to change or upgrade the database with tools and features that support spatial data. Everytime we perform georeference queries or define spatial data (for example a PointField) in the DB, there is a lot of geometric work done behind the scenes with outputs (vectors, X & Y axis values) that need to be stored in tables specially set up.

**The solution:** Mentors already warned me that SQLite3 (The default integrated DB in Django) is a limited Database and I should consider using Postgres or something more robust. However, considering the deadlines and my already familiarity with what I have done so far I tried to look for a workaround that would allow me to keep using SQLite3 unless there is no way this DB can perform spatial work. Luckily, I found “Spatialite”, an extension of SQLite3 that allows me to perform geodatabase functionalities. Now I could store latitude and longitude in a PointField attribute and use it with other special geo functional methods in order to obtain distances.

One big barrier I encountered was the synchronicity between my current Item and Images tables and the new Spatialite attributes I could add to those current tables. When merging those changes in the DB, there would be some errors when doing the migrations. After several trials and errors, I found a way to make it synchronise, the only disadvantage is that everytime I wanted to add a new attribute from SQLite3 when having Spatialite running, I would have to clean the DB, delete all my previous migrations, and re-do the migration separately (first with SQLite3 and then with Spatialite extension). It was kind of tricky but enough to do the job and keep me on track.

From now on, things weren’t that difficult. I managed to build a backend environment fully deployed with media-files and Georeference functions. I had to do a couple of extra updates adding attributes or serializations on the endpoint responses required for Frontend and Machine Learning functionality.

## Conclusion

Needless to say that I feel more empowered in a manner of capability to create functionalities that can be used in web solutions that can target “real life” problems. I finish this project with a wider domain of concepts and vocabulary that will allow me to elaborate more accurate research in order to expand the web-dev knowledge. My most valuable learning was the practice and understanding of the backend deployment and its integrations, specially with Machine Learning models.

![API view of the JSON body that contains objects in the Item table](https://geofree.pythonanywhere.com/media/images_blog/Screenshot%202023-04-06%20at%2017.06.38.png)

_Api view of the url that gets all the objects posted in the DB with their respective attributes and serialized fields._

## UX Design

**Timeline**: 3 months

**Tools**: Figma, Miro, Canva

**Our role**: UX Research, UX Design, UI Design

### Our roles and work distribution

**Deniz Kocyigit**

UX Research, Competitive Analysis, 5 Interviews, User Personas, Updated User Flow, Affinity Diagram, Branding, Logo, Sketches, Wireframes, UI Design, Prototype, Usability testing.

**Farida Elchuzade**

UX Research, Competitive Analysis, 5 Interviews, Affinity Diagram, Branding, Sketches, Wireframes, UI Design, Prototype, Usability testing.

**Manvitha Konkimalla**

UX Research, Competitive Analysis, 5 Interviews,User stories, User Flow, Affinity Diagram, Branding, Sketches, Wireframes, UI Design, Prototype, Usability testing.

### Our design process:
![design process](https://raw.githubusercontent.com/TechLabs-Berlin/wt23-geofree/main/UX%20files/Design%20process.png "design process")



As a team of 3 UX Designers we started off the project with a team and mentors meeting to brainstorm, discuss and to better understand the problem we are looking into. The first thing we did was to lay out the problem, discuss the research process, divide responsibilities and create a timeline.

To better understand the problem people face when leave free items in the streets and picking up items, we decided to do qualitative research and open ended interviews. Each of us reached out to 5 users (total 15) and talked about their experience when giving away free items or picking up items. This approach gave us deep insight into the problem and really helped us to understand the pain points of users.

We continued our research by looking and analyzing similar apps. Competitive analysis helped us to think about critical features our web app would need. On the analysis stage, we used all our research to create personas, empathy map and an affinity diagram. This allowed us to represent the pain points of the users and note down important information for building the webapp.

**Some snapshots of similar app analysis**
[Competitive Analysis link](https://github.com/TechLabs-Berlin/wt23-geofree/blob/main/UX%20files/CompetitiveAnalysis.pdf)

Next stage involved creating a user flow, sketching and wireframing all the details on Figma. Wireframes gave an idea to the rest of the team on how to proceed with product development.

### User Persona

![User Persona](https://raw.githubusercontent.com/TechLabs-Berlin/wt23-geofree/main/UX%20files/Personas.png "User Persona")

### Affinity Diagram

![Affinity Diagram](https://raw.githubusercontent.com/TechLabs-Berlin/wt23-geofree/main/UX%20files/Affinity%20Diagram/AffinityDiagram2.png "Affinity Diagram")

### User Flow

![User flow](https://raw.githubusercontent.com/TechLabs-Berlin/wt23-geofree/main/UX%20files/UserFlow.png "User flow")

### Wireframe

![Wireframes](https://raw.githubusercontent.com/TechLabs-Berlin/wt23-geofree/main/UX%20files/Wireframes/Wireframes2.png "wireframes")

**see all wireframes**
![Wireframes](https://github.com/TechLabs-Berlin/wt23-geofree/tree/main/UX%20files/Wireframes "All Wireframes")

### UI Mockup (Link to Figma)

![Mockup](https://raw.githubusercontent.com/TechLabs-Berlin/wt23-geofree/main/UX%20files/MockUp.png "Mockups")

**Figma file:**
[Figma file](https://www.figma.com/file/15g4U2HhBDixWFGIPixypH/FINAL?node-id=0%3A1&t=C7eEU61wTLqLWv9v-1)

During the period of working on the project, we had weekly 2 meetings: project team meeting and a UX team with our mentor. Having a separate UX meeting was helpful as we were a team of 3 and needed to discuss the next steps and divide our responsibilities while sticking to deadlines. It was also helpful for our mentor join our meetings and answer our questions and guide us in the design process.

As UX team we had our challenges. This was our first time designing as a UX Designer team and working across different disciples while trying to stick to the project goals. In the beginning everything was in the cloud and we didn’t really know how we would continue. However, setting goals, creating a timeline, meeting with the team and mentors, and constantly asking questions really helped us to progress throughout the project phase. It’s incredible to see how far we came as a team and how we overcame our problems by discussing and listening to each other's ideas.

### Prototype

[Prototype](https://www.figma.com/proto/15g4U2HhBDixWFGIPixypH/FINAL?page-id=0%3A1&node-id=606-14501&viewport=-1000%2C2633%2C0.07&scaling=min-zoom&starting-point-node-id=606%3A14501)

### Usability Testing:

As our webapp for posting and finding free items in Berlin takes shape and moves towards a high-fidelity prototype, conducted usability test to ensure that users can successfully complete specified tasks and to identify any potential issues or pain points.

Tasks assigned to the users during the usability test:

Post an item you no longer need by uploading a photo, adding its name, and selecting a category.
Find a specific item in your neighborhood by using the map view.
Mark an item as unavailable after it has been taken or destroyed.

After conducting usability testing and receiving user feedback, we found that users were able to successfully complete the tasks assigned to them. Overall, the feedback was positive.

## Data Science
#### by [Karina Condeixa](https://github.com/KC2016) | Toine Cloet
**Tech stack**: Python, Anaconda, JupyterNotebook, Numpy, Pandas, Matplotlib, Seaborn, Scikit-learn and  SQLite.
&nbsp;

### Data Project: understanding the domain

Aming to support a better understanding about the domain and identify patterns that support creating data-driven design-features for the Geofree app. 
Preliminar searches on app and websites was done. We browse the websites and apps of in [FreeYourStuff](https://www.free-your-stuff.com/de/berlin) and in [ebay-kleinanzeigen](https://www.ebay-kleinanzeigen.de/stadt /berlin/).

Both data science techies took up the challenge of collecting, filtering, cleaning, sorting and analysing different data around GeoFree and its mission of connecting free stuff on the streets with people that could have a use for the stuff! 

#### Analysis of Ordnungsamt data 
**This analysis used data freely available on [Berlin Open Data](https://daten.berlin.de/datensaetze/ordnungsamt-online) as API by [Karina Condeixa](https://github.com/KC2016)**


The category "Sperrmüll abgelagert" refers to objects placed on the street that are causing inconvenience to passers-by or to the proper functioning of the city and this subset was used for data analysis and visualisation.

Therefore, a sample of the raw dataset with 614 rows and 8 columns was used for our model is shown below. As seen, the columns “bezirk”, “erstellungsDatum”, “status” and ‘”sachverhalt” (“districts”, “creation_date”, “status” and  “item”, respectively, for free translation) are the most indicative to give us insights.

![ordnungsamt_subset](ds_guidelines/images/ ordnungsamt_subset
.png)

#### 1 Natural language analysis

An analysis of the text from "situation description"  in the  "Sachverhalt" column found the items with higher occurrences, considering the original text in German and the translation in English to reduce inconsistencies that occurred because of English compound words.

I dealt with the text into lines and words: removed numbers and characters, transformed to lowercase, tokenize words, removed stopwords from ntkl package and many others manually. Besides counting repeated words, wordclouds for English and German languages were built to visualise the most repeated words and check differences between the two languages.

The most cited items in English were: [mattress, furniture, chair, closet, couch, sofa, table, carpet, board, wardrobe, shelf, cabinet, frame, desk, cupboard, stroller, suitcase]

The most cited items in German were: [Einkaufswagen, Matratze, Kuhlschrank, Stuhle, Fahrrad, Tische, Sessel]

![wordclouds](ds_guidelines/images/wordclouds.png)

#### 2 Occurrences "in process" and "done"
The proportions of occurrences in progress and performed by district and by year were compared in a bar graph and a line graph respectively. An inconsistence was seen in the line graph with occurrences  in the future months until the end of 2023.

![graphs_of_occurrences_per_district_and_per_years_considering_status](ds_guidelines/images/ kc_district_years.png)

#### 3 Seasonality 
Timeseries data with more granularities were done to give an overview about seasonality. Graphs of occurrences by months confirmed an inconsistency in post dates from this dataset.

![graphs_of_occurrences_in_the_months_of_2022_and_2023_considering_status](ds_guidelines/images/ kc_months_2022_2023.png)

#### 4 The main insights from this analysis were:

- Most of the complaints were from Neukölln, 80% of the solved complaints and 18% of the unresolved ones. The numbers of occurrences in other districts are insignificant.
- The data shows a few occurrences in 2022 and a majority in 2023.
-  A massive peak of occurrences was shown in September 2022, but we don't enough data that indicates a seasonality.
- Hundreds of occurrences in the 'erstellungsDatum'(creation date) column after the day of the analysis showed errors in data for this column.


#### Web scraping 
**from the website [FreeYourStuff](https://www.free-your-stuff.com/de/berlin) by [Toine Cloet](https://github.com/ToineCoderMan).**

As part of the functionalities for TechLabs, web scraping is a part of a data scientist’s go to skills when you do not have a list of data readily available. We scripted code to scrape from our most relevant similar website, http://www.freeyourstuff.com/berlin. First we asked the web designer if we could simply obtain his dataset, but he never replied. Our Python Beautiful Soup script was our plan B, and it worked well on the first page. However, the website counts more than 100 pages, and looping through those pages and saving the results into 1 XLS file proved to be more challenging. In the end, the functionality works and produces an XLS file with the zip code and the status of the post in the database.

 #### 1: Data collection
There was no collection of data prior to the web-scraping functionality, since the act of web scraping is designed to provide output data from the target website http://www.free-your-stuff.com/berlin (FYS).
However, various techniques were tried:

Scraping based on downloading the HTML from the website
This was however abandoned because of complexity of pulling HTML documents from a website
Scraping with Python BeautifulSoup package. 
This package was explored to read through website elements
Using Selenium to automate scripting through Python Google plugin
This technique was abandoned since Selenium required a lot of extra time to master, and the Google Python plugin diminished the GPU speed an RAM of the computer, crashing often or generally running very slowly

First the necessary elements for web-scraping were explored. From the listings on the Berlin dedicated page, several details were relevant:

1. The Zip-code of the item (5-digit PLZ in Germany)
2. The type of advertisement (GIVE or NEED), since users can post either items to give or can post items they would like to have.
3. A third item would be the time-stamp. The problem here is that in the source code of the website, the time stamp is hidden in the web element itself. Without scripting automation like with Selenium, this is not easily reproducible. The text here is derived from the actual time stamp and will only say “vor 2 Wochen” for example, which means so much as “has been online for X amount of weeks”. This was abandoned in the dataset.

The source code of the website was examined in order to locate the classes where the necessary information is stored: 

#### 2: Data processing 
2.1: importing necessary classes and assigning variables: 

2.2: Assigning the website in variable and letting BeautifulSoup read the website
Note> the {pagenr} at the end of the URL is to accommodate multi-page scraping, since the website generates its page-individual URL with the page number at the end of the URL

2.3: Finding all the relevant classes for GIVE/NEED and PLZ on the page:

2.4: Create a function for the page scraping>

2.5: Create a loop to repeat the function for the amount of pages of the website>
Note: here we limited the loop functionality to 100 pages, since any more data makes the scraping and exporting very slow

2.6: Convert, clean and export: 
A dataframe is created from the scraped data. Since the PLZ data included more string than just the 5 PLZ digits, it had to be cleaned. Finally, the dataframe is exported as an excel file. The Fin functionality prints a confirmation statement when the export of the file is completed.

#### 3: Implementation and testing

Next, the file is read in order to be visualized using PGEOCODE and Plotly.express in Python

The PGEOCODE package contains zipcode data from different countries all over the globe, and will be specified for Germany specifically (Berlin-level was not available). We read our output file data into a variable.

We read the latitude and longitude data from PGEOCODE and match the postcode data with the geolocational data of PGEOCODE to assign a map pointer for all the items in our database, based on postcode

Finally, we display the item locations on a map using plotly, which automatically assigns the geolocational data on a Germany map. By zooming to level 9, the map loads in Berlin

#### 4: Further improvement for future reference
The date stamp of every item was layered deeper in the HTML of the website, we could only scrape the sentence “Posted less than xx hours ago”. This was abandoned for the sake of less relevance. If we would have more time to dive into selenium automation, the time stamp would have possibly also been able to be scraped.

### Machine Learning
The team presented two proposals of recommendation systems for GeoFree; one based on rankings and another based on similarity of different parameters within the advertisement database. Although both are working, the rankings recommendation was implemented in the demo app version. Also, a classification RandomForestClassification was performed.
 
#### Recommendation system based on rankings 
**by [Karina Condeixa](https://github.com/KC2016)**
[Link for the files in the server](https://www.pythonanywhere.com/%C3%A5%C3%A7/geofree/files/home/geofree/m_l)
 
Geofree is not a user-based app that is not provided of login feature and doesn’t gather much information about items. So, this solution used events from this app to suggest items based on features of novelty, popularity and item’s condition. 
 

In a nutshell, the data flow for this recommendation is shown below:

![data_flow](ds_guidelines/images/ kc_dataflow.png)

 #### 1: Data collection
The table item-list from backend was imported from the backend's SQLite db to python (Jupyter Notebook) and queries using sqlite3. Inputs of users were extracted from the [API in pythoneverywhere](https://geofree.pythonanywhere.com/api/get-categories/) using urllib.parse and requests to get the request of a list of categories that represents input from users when searching items.

The image below shows a visualisations of the data retrieved from the database:

![dataset_imported_from_SQLite_DB](ds_guidelines/images/ kc_itemlistdf.png)

#### 2: Data processing 
Data processing took place in the following order:

#### 2.1 Select columns with the necessary features
The features selected were "id", "available", "timedate_creation", "latitude", "longitude", "condition", "categories", "views"and "likes".

#### 2.2 Encode categorical column
The column "condition"  was encoded to from 1 to 4 instead of "like_new", "good", "acceptable", "poor", respectively to be ranked.

![encoded_dataset](ds_guidelines/images/ kc_encode_reco.png)
#### 2.3  Filter by items' avavailability and smaller distance user-item
available = 1 and distance <= the distance chosen by the user in the search.
The distances between items and users who search items are gotten using Cosine similarity.
#### 2.4 Ranking the features 
The features were ranked as following: post_creation (descending), number of likes (ascending), number of views (descending) and condition (ascending) and limited to tree items recommended.

```
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
```
Late decisions from UX/UI/WD made after the development of the recommendation system changed the input of users to indefinite numbers of categories and instead of only one also the maximum distance to the item. To solve the issue of multiple categories, only the first category in the search is used as input to filter.
#### 3: Implementation to the app and testing
#### 3.1 Functions and packaging
A function for data collection and processing was done. And the python packaging was done with the help of the backend guy (Felipe).  @api_view decorators are used in Django REST framework to specify the allowed HTTP methods for the view function and to handle the request and response data in a RESTful way.
#### 3.2 Challenges in dealing with exceptions
In the implementation we faced bugs because we had a small list of items and that was not enough to return three items. These errors can occur in the beginning of use of the app. In response too this issue I added loopings check the number of ranked item_ids and when the rankings result in less of three items available from the chosen category, the system recommends random items. This is the snippet of code embedded in the function, which returns create random recommendations in these cases and return three item_id:

```
# if the length of the list is 0, return 3 random ids
if len(ranked_id) == 0: 
    id_1 = random.choice(ranking_df['id'])
    id_2 = random.choice(ranking_df['id'])
    id_3 = random.choice(ranking_df['id'])
    
# if the length of the list is 1, return the id in the list as id_1  and random ids for id_2 and id_3
elif len(ranked_id) == 1: 
    id_1 = list[0]
    id_2 = random.choice(ranking_df['id'])
    id_3 = random.choice(ranking_df['id'])

# if the length of the list is 2, return the ids in the list as id_1, id_2  and random id id_3
elif len(ranked_id) == 2:
    id_1 = list[0]
    id_2 = list[1]
    id_3 = random.choice(ranking_df['id'])

# if the length of the list is 3 or more, return the ids in the list as id_1, id_2, and id_3  
else:
    id_1 = list[0]
    id_2 = list[1]
    id_3 = list[3]
    
id_1 = str(id_1)
id_2 = str(id_2)
id_3 = str(id_3)
   
return id_1, id_2, id_3  
```
#### 3.3 Testing
A mock dataset with 100 of records was done to test the function. I used the  following parameters:
A maximum number of views by 2001.
A random number of likes between 0 and 20.
Time creation for posts with a limit of the previous 30 days.
Random latitude and longitude points, timedate_creation, and geographical points using the Faker package.
Random title, description, available, condition, categories, number of views and likes  The titles regard to input from user with category of items. The user can user multiple categories, so I used numpy with list of lists using the random package.


Lists with some examples of values were created as presented below.

```
title = ['Furniture',  'Clothes', 'All', ['Plants', 'Kitchen', 'Kids toys'], 'All', ['Kitchen', 'Kids toys'], ['Furniture',  'Clothes',  'Kitchen'], ['Kitchen', 'Kids toys'], ['Clothes', 'Kids toys', 'Plants'], 'All']
description = ['anything', 'everything', 'whaterver', 'hellooo', 'testing', 'bug', 'solving the problem', 'what day is today?', 'today is the presentation day', 'we are the second team to present', 'uhuuuu', 'yeyyyy']
category = ['furniture',  'clothes',  'kitchen_utensils', 'kids', 'other'] 
condition = ['poor', 'acceptable', 'good', 'like_new'] 
available = ['1', '0'] 
num_likes_reco = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,24,15,16,17,18,19,20]
```
The function got as described bellow:
```
def get_random_title():
    random_title = np.random.choice(title)
    if isinstance(random_title, list):
        return random_title
    else:
        return [random_title]
get_random_title()

def data_recommendation(num_reco_records): 
  
    # dictionary 
    item ={} 
    for i in range(0, num_reco_records): 
        item[i] = {}
        fake = Faker()
        item[i]['title']= get_random_title()  
        item[i]['description']= np.random.choice(description) 
        item[i]['available'] = np.random.choice(available) 
        item[i]['condition'] = np.random.choice(condition)
        item[i]['timedate_creation'] = fake.date_between_dates(limit,'now')
        item[i]['latitude'] = float(fake.latitude())
        item[i]['longitude'] = float(fake.longitude())
        item[i]['categories'] = np.random.choice(category)
        item[i]['views'] = np.random.choice(n_views)
        item[i]['likes'] = np.random.choice(num_likes_reco) # not dependent from view, only to test reco
        item[i]['point'] =  [f"SRID=4326;POINT ({fake.longitude()} {fake.latitude()})"]
    
    return item 
```

Later, I added id, category_ml (a column existing in db but has no function anymore), ensured that timedate_creation was in the correct data type, and formatted as it is in db.

```
reco_df['category_ml'] = reco_df['title'].apply(lambda x: x[0])

reco_df['id'] = reco_df.index +1  # add item_id
reco_series = reco_df['id']  # storage in a variable to use later


reco_df['timedate_creation'] = pd.to_datetime(reco_df['timedate_creation'])

reco_df['timedate_creation'] = reco_df['timedate_creation'].dt.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]
```


We can see below a view of the data frame created.

![mock_dataset_to_test_recommendations ](ds_guidelines/images/ kc_mock_data_reco.png)

The backend did tests by his side.

#### 3.4 Performance Metrics 
To define performance metrics for recommender system for Geofree is tricky because this app is not user-based.  So, I can't use Mean Reciplocal Rank, for example, because this app doesn't record information about which used liked some item. 

That said, I could use KPIs(key performance indicators) and A/B testing to measure the performance of the recommendation system. I cite some examples of KPIs bellow:

- Customer satisfaction rate (CSR)

`CSR = (Number of Satisfied Customers/Total number of customers) * 100`

- Average transactions (AVT)

`AVT = Total revenue / Number of transactions (taken items)`
Where the number of transactions is the number of items selected as taken by the users. 

- Number of repeat customers (NRC)

`NRC = (Number of Unique Customers*Number of Donations)/Total Number of Visits`

This metric only can be applied when login were implemented to Geofree.


### Recommendation system based on similarity

This recommendation system was set up to produce a total of 5 relevant additional advertisements for a user currently browsing or searching for items in the Geofree app. These recommendations would pop up in the screen to increase user activity and to suggest user-relevant items, based a 3-tier priority model as suggested in the model below: 

Matching with items that the user searched recently
Searching for items closest to the user
Searching for items that were recently posted in Geofree

 #### 1: Data collection

Since at the time of design there were no items in the Geofree database, a mockup dataset was produced using http://www.mockaroo.com with 1000 records. The columns represent the item categories that were used for Geofree item posts at the time of creation>

The first tier is the most complex, as it will be searching for relevance based on item description within the entire database of Geofree, and returning items that show most similarity with the item that the user has recently viewed. The Python libraries Pairwise and TF / IDF can accomplish this. 
TF = term frequency. Provides count of how many times a word is mentioned in a document / total amount of words in document. 
 
IDF = Inverse document frequency. This calculates how significant this word is in the overview. IDF will look for the importance of words in all item descriptions in the dataset.

By creating a matrix model of the text in our item descriptions, Python can cross-reference the individual words for reference and output a ranking where the most relevant ranking (best matching the description field of the item last searched by the user) will be suggested first, in a top-5 output ranking. 
The second and third tier can be implemented by setting an IF-statement in the code which gives preference over items that are within a certain distance of the user. For example if the user is within a distance of less than 500 metres from an item relevant to their recent search, the variable distance_km (which compares geolocation of item with the user’s geolocation) can be called from the Geofree backend, and the IF-statement can prioritise items in the suggestion output this way. At the time of creation, this distance variable was not test-ready and therefore not implemented for this code. One critical condition here is that the user has agreed to AND enabled location sharing services on their device.  

The final search tier is based on the timestamp of posting, and can be created in a similar way as tier 2 by adding an IF-statement for relevant items that have been posted recently. This would enable the user to receive suggestions for newly posted items relevant to their search interests. The item-age variable stores the time of posting of items and can be called for this from the Geofree backend. Since this was not set up by the time of testing, it was not implemented for this code.

#### 2: Data processing 
First, relevant libraries are imported. 

Next the Mockup database is read and stored in variables.

Now the variables are used to created a reference matrix to find the matching descriptions with output of the item titles.

Finally we create a function to index the result of the matrix comparison. The final scores are sorted from best matching to least matching. The 2nd until the 6th best match are now returned, since we are looking for 5 recommendations and the 1st recommendation turned out to be the same item that we put in, deeming it irrelevant.

#### 3: Implementation to the app and testing

When testing the function get_the_recommendation() we receive the output below:

The index of the item as well as the item title are returned. In the backend of Geofree, the index number is enough to process the recommendation on-screen. For testing purposes we have left the title in the dataset. 

We tested the output first with the Mock dataset, but could not really test it for relevance. Therefore, the test set was slightly adapted where we entered the text Test1, TestFinal with space (which had spaces in the item title to see if this is returned by the function) and Test3. For Test1, Test3 and TestFinal we respectively changed the item text as well, entering the word Lawnmower in different styles (Lawnmower, Lawnmowerman, Lawn mower), to see if the algorithm picked up on this. The output perfectly finds the words and assigns them a higher output rating as can be seen in the screenshot above. This code was tested in the backend of Geofree as well. 

#### 4: Further improvement for future reference
One setback of the function is the input text, the function runs on item title and must get the exact title of the item last viewed in order to produce a relevant result. A future improvement would be to allow for the input to also be keywords rather than only item title. Also more experimenting with UX Design considering customer preference for suggestions (perhaps performing user satisfaction surveys on happiness with overall suggestions) could provide Geofree with more relevant and user-specific suggestions, to keep the streets even more clean of stuff.

### Classification of items availability
**by [Karina Condeixa](https://github.com/KC2016)**

Browsing through similar websites(FreeYourStuff Berlin and E-Bay, I noticed many old posts offering items or searching for items, which are probably outdated. It is noticed that many users do not remove posts and neither do these websites.

 To give Geofree a good transaction metric that avoids keeping outdated items in the app, and spending resources on data maintenance, I propose the creation of a feature that classifies available/taken items and subsequently triggers the removal of unavailable items from the app. 

For this, a RandomForestClassification is performed.  At first, a feature created by the designers is used to get initial data and train the model. My idea is to implement machine learning ML when it reaches good statistical metrics.
#### 1 Mock dataset
Creating fake datasets while the add was being developed was a tiring and painful process. As there were uncertainties regarding many features of the app and there was no standard for naming columns like the backend database, many versions and modifications had to be made to the mock datasets. After going back and forth on design features that affected the data I needed to work with, I decided to leave code commented out and not delete it. It might look messy, but it avoided re-working.
#### 1.1 Dataset for the Classification ML model
Generally speaking, The dataset had 5000 records and was made under the folling parameters:
```
maximun_n_views = 2001
pct_of_likes_over_views = 20
n_records_ranking = 5000
n_records = 5000
limit = '-30d'  # limit of 30 days of item in the app
maximun_n_hours_avalilable = 100

category = ['furniture',  'clothes',  'kitchen_utensils', 'kids', 'other'] 
condition = ['poor', 'acceptable', 'good', 'like_new'] 
available = ['1', '0']  

```
#### 1.2 Dataset for testing this ML model
A small dataset with 15 records was done. 

```
def new_data(n_records_new): 
      # dictionary 
    new_data ={} 
    for i in range(0, n_records_new): 
        new_data[i] = {}
#         item[i]['item_status'] = 1
        new_data[i]['item_category'] = np.random.choice(category)
#         new_data[i]['item_id'] = np.random.choice(range(1, n_records_new))  
        new_data[i]['item_condition'] = np.random.choice(condition)
#         item[i]['item_available_timer'] = np.random.choice(n_hours_avalilable) # in 30 days
#         datetime_iteration1 = fake.date_between_dates(limit,'now')
#         datetime_iteration2 = fake.date_between_dates(limit,'now')
#         if datetime_iteration1 <= datetime_iteration2:
#             item[i]['item_timer'] = datetime_iteration1
#             item[i]['item_timer'] = datetime_iteration2
#         else:
#             item[i]['item_timer'] = datetime_iteration2
#             item[i]['item_timer'] = datetime_iteration1 
#         new_data[i]['item_postcode'] = np.random.choice(postcodes_berlin_series)
            new_data[i]['item_available_timer'] = np.random.choice(n_hours_avalilable)
#         item[i]['item_timer'] = (date.today()) - fake.date_between_dates(limit,'now')  # in days, can be improved to hours
        new_data[i]['distance'] = np.random.choice(distance)
        
 # This date shold be later than the post
        new_data[i]['n_views'] = np.random.choice(n_views)
        new_data[i]['n_likes'] = int(new_data[i]['n_views'] * (np.random.choice(pct_likes)))
        new_data[i]['item_available'] = np.random.choice(available)
      
    return new_data
```
#### 2 EDA for Random Forest Classification¶

An exploratory analysis collect data on the following features from Geofree: 
category condition, post's age, distance item-user, views, likes and Item availability (the target)  and performs, and:

- Checks the variables and statistics
- Visualise the frequency of the categorical variables
- Visualises the correlation between variable
- Checks Outliers and if the dataset is balanced
- Creates a function to do all these steps

The main remarks about the EDA are:

- Only the column n_likes presented outliers.

![outliers_in_number_of_likes ](ds_guidelines/images/ kc_outliers.png)

- A correlation between the number of likes and the number of views was expected, once it was added when I created the dataset when the n_likes column was based on a random percentage of the n_views column.

![correlation_between_variables ](ds_guidelines/images/ kc_rorrelations.png)

- The column item available is the one I am going to predict, is not unbalanced. I was shown 2560 items available and 2440 not available.
- Since our dataset was randomly created, so I am not interpreting the distributions.

#### 3 Random Forest Classification and metrics used
#### 3.1 Processing Data
Postcodes are variables with many categories. So, I dropped it. The same for id.
The categorical variables available, category and conditions were encoded to numbers.
#### 3.2 RandomForestClassification: iterations

A couple of iterations were made, splitting the database in 70-30 and 80-20 and varying 'n_estimators', 'max_features',  'max_depth' and  'max_sample'. The Accuracy, F1 score, 
Precision and  Recall got deficient. 
#### 3.3  Hyperparameter tuning

A  tuning of hyperparameters for the classifier was made looking to have the best performance. It shows the highest F1score and Recall. But still, the metrics were weak (between 45% and 50%).
#### 3.4 Feature relevance
A randomizedSearchCV supported the most interesting accomplishment of the model, for now. It shows an order of importance among the columns: `distance`, `n_views`, `n_likes`, `item_available_timer`, `item_category`, `item_condition`, in descending order.

#### 3.5 Applying the ML model to new data
To test the model, the new_data dataset was applied. We can below a sample of the results.

![dataset_with_predicted_data ](ds_guidelines/images/ kc_predicteddata.png)

#### 3.6 Suggestions for further improvement:
To improve the performance of the model, besides trying the default parameters, I could: 
- Check the metrics Cross-validation and AUC-ROC
- Use also gridsearch to improve the metrics
- Compare alternative models using Pycaret
- Implement the ML model into Geofree. The system design for this is illustrated below

![system_design_final ](ds_guidelines/images/ kc_system_design_final.png)

### Conclusion

We are very happy with the evolution of the idea and the result of our hard work. Not only all of the initial plans for the app have been realised, but all of the extensive research conducted by the UX and DS teams resulted in additional functionalities which were grounded in actual user needs.

We would like to continue working on Geofree to perfect its abilities: enable user login and authentication, create necessary designs for the required user setting pages, collect likes and views and improve the machine learning model for recommendation and predicting item availability.

We are hoping to launch Geofree for public use.
