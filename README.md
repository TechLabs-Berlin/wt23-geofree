# Geofree | TechLabs Berlin 2023

## Summary

🗺️"map app of freebies"

Geofree is a platform designed to facilitate the donation and collection of items left in the streets of Berlin. Geofree is based on the Berliner culture of preserving and re-using everyday objects found on the sidewalk, and its mission is to reduce waste and clutter.

Geofree accomplishes this through these features: a map view with marked locations of donated items, search and browse functions, and a page allowing item upload. The website also includes an item recommendation system, which suggests items to users based on their chosen categories and the ranking of posts' date, views, and likes. Additionally, users can provide feedback by flagging items as unavailable.

With Geofree, users can easily discover and collect donated items, help reduce waste of useful items and keep the streets of Berlin clean.

## Stack

**Frontend**: ReactJS, Material UI, Google Cloud API, Netlify

**Backend**: Django, DRF (Python), Sqlite3 + Spatialite (ext.)

**UX Design**: Figma, Miro, Canva

**Data Science**: Python, Anaconda, Jupyter Notebook, Sqlite3, Pandas, Numpy, Matplotlib, Scikit-learn

## Setup

### Backend

Backend currently deployed in PythonAnywhere.com

GET all objects url: [item list](https://geofree.pythonanywhere.com/api/item-list/)

POST Item url: [post item](https://geofree.pythonanywhere.com/api/item-create/)

**Please find in the file “urls.py” in the “geofree_api” folder
all the url paths availables**

To install backend environment locally:
(After cloning the GEOFREE repository):
Commands:

`cd backend`

`pip freeze > requirements.txt`

`pip install -r requirements.txt`

`python manage.py runserver`

### Frontend

To install and set up the library, run:
`npm install`

To install Material UI library:
`npm install @mui/material @emotion/react @emotion/styled`

To install Google Maps API:
`npm i -S @react-google-maps/api`

To install Multiselect React Dropdown:
`npm install multiselect-react-dropdown`

To install Carousel Slider:
`npm install slick-carousel`

To start app:
`npm start`

## Prototype

[Prototype](https://www.figma.com/file/15g4U2HhBDixWFGIPixypH/FINAL?node-id=606-14366&t=gnUCmsLLfOKCgdAr-0)

## Demo Video

[Demo](https://www.youtube.com/embed/R4wCXSiiUEk)

## Authors

🧑‍💻**Web Development**

- [Joanna Kowalik](https://www.linkedin.com/in/joanna-kowalik-b8162614a/)
- [Felipe Saez](https://www.linkedin.com/in/felipe-saez-125711181/)

👩‍🎨**UX Design**

- [Deniz Kocyigit](https://www.linkedin.com/in/deniz-k-/)
- [Farida Elchuzade](https://www.linkedin.com/in/farida-elchuzade/)
- [Manvitha Konkimalla](https://www.linkedin.com/in/manvitha-konkimalla/)

🤖**Data Science**

- [Karina Condeixa](https://www.linkedin.com/in/karinacondeixa/)
- [Antoine Cloet](https://www.linkedin.com/in/toinecloet)

🧑‍🏫**Mentors**

- [Alla Schriefer](https://www.linkedin.com/in/allaschriefer/)
- [Larry D. Almeida](https://www.linkedin.com/in/larrydalmeida/)
- Jasan Sangma
