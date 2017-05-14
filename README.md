# Weather Radials

**Description:**
Weather Radials is a weather visualization application that presents historical high and low temperature data for a specific location as a radial weather diagram.  

The application provides users with the ability to click on example location / year pairs in the sidebar, in addition to the ability to search for any location in the world - with some restrictions - and view respective climate data for a given year.  

The application gathers the relevant data in a three step process using the Google geocoding API and NOAA NDCD: Climate Data Online API:  
1. Converts a location name into latitude and longitude using the Google geocoding API.  
2. Queries the NOAA NCDC: Climate Data Online API for weather stations within 1.0 latitude and longitude units returned by the previous step and sorts the returned stations by data availability.  
3. Selects the station returned in the previous step and requests maximum and minimum daily temperature data for a specified time period for that location.  


**Directions:**
Enter a location name and year, or click on an example in the sidebar to display a weather radial visualization of a location's annual climate data.  

**Website URL:** http://jaypb.io/weather_radials

**Data:**
Data is provided by the following APIs:  
1. Google geocoding API  
2. NOAA NCDC: Climate Data Online  
