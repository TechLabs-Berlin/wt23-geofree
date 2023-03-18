# Data Project
Author: Karina Condeixa

Data projects are studies of exploratory analysis that provide a basis for subsequent analysis and processing of data. They help us to understand the domain and support insights about the specifics of the dataset we are going to work with. We made analysis and visualisation to answer questions about the data and give us insights that can support us to build a better ML model.

### Data collection
A free JSON API about disturbances in Berlin from the [Ordnungsamt](https://daten.berlin.de/datensaetze/ordnungsamt-online) in the category of waste thrown out on streets were used for our data project.

### Exploratory Data Analysis of text with wordcould
An analysis of the text from "situation description” in the "Sachverhalt" column found the items with higher occurrences, considering the original text in German and the translation in English to reduce inconsistencies that occurred because of English compound words.

The most cited items in English were:
[mattress, furniture, chair, closet, couch, sofa, table, carpet, board, wardrobe, shelf, cabinet, frame, desk, cupboard, stroller, suitcase]

The most cited items in German were:
[Einkaufswagen, Matratze, Kuhlschrank, Stuhle, Fahrrad, Tische, Sessel]

### Analysis of seasonality, localization and status with visuallization
Other interesting insights were:
- Most of the complaints were from Neukölln, 80% of the solved complaints and 18% of the unresolved ones. The numbers of occurrences in other districts are insignificant.
- The data shows a few occurrences in 2022 and a majority in 2023.
- A massive peak of occurrences was shown in September 2022, but we have not enough data that indicates a seasonality.
- 153 occurrences in the 'erstellungsDatum'(creation data) column after the day of today shown errors in data for this column.

### Insights
Insights from the Data Project support an improvement of the mock dataset for the ML model.

1- The items with more occurrences were included in the mock dataset used in the ML model.

2- Since I found complaints about items on street for weeks, I increased the time between posts and mandatory change of status.

3- This dataset has not enough features of the items. The description of the situation on the `Sachverhalt` space, come in the dataset as strings without patterns.
Sometimes the users give too much detail about the problem in a long text and do not always describe the object causing the situation.

The GeoFree app is being done in a similar format. So, an hybrid approach might be used in the recommender system.


