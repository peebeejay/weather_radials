# Weather Radials

**Description:**
Weather Radials is a weather visualization application that presents historical high and low temperature data for a specific location as a radial weather diagram.  

The application provides users with the ability to click on example location / year pairs in the sidebar, in addition to the ability to search for any location in the world - with some restrictions - and view respective climate data for a given year.  

Weather Radials is build using a React/Redux front-end to create a streamlined application structure using a global store that contains appropriate weather data, and additionally uses jQuery to render the visualization, which is created using D3.js.

**Challenges:**  
Some challenges that were encountered during the creation of this application were the integration of the search feature and the rendering of the visualization itself, specifically tooltips and poor data. The first challenge was solved through the fine-tuning of API calls, especially the  coordinate deltas used to find appropriate stations for a given location. The second challenge was solved by creating a div that would appear and disappear based on jQuery mouseenter and mouseout event listeners. The third challenge was solved by assuming a temperature delta of 15F for days missing a single data point, while not rendering days with no maximum or minimum temperatures present.  

**How it Works:**  
The application gathers the relevant data in a three step process using the Google geocoding API and NOAA NDCD: Climate Data Online API, and then renders the diagram:  
1. Converts a location name into latitude and longitude using the Google geocoding API.  
2. Queries the NOAA NCDC: Climate Data Online API for weather stations within 1.0 latitude and longitude units returned by the previous step and sorts the returned stations by data availability.  
3. Selects the station returned in the previous step and requests maximum and minimum daily temperature data for a specified time period for that location.  
4. Data is converted into a form easily used by jQuery and D3.js and is then rendered as a radial diagram.   

**Directions:**
Enter a location name and year, or click on an example in the sidebar to display a weather radial visualization of a location's annual climate data.  

**Website URL:** http://jaypb.io/weather_radials

**Data:**
Data is provided by the following APIs:  
1. Google geocoding API  
2. NOAA NCDC: Climate Data Online  
