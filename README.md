# Weather Radials

**Website URL:** http://jaypb.io/weather_radials

**Description:**  
Weather Radials is a weather visualization application that presents historical high and low temperature data for a specific location as a radial weather diagram.  

The application provides users with the ability to click on example location / year pairs in the sidebar, in addition to the ability to search for any location in the world - with some restrictions - and view respective climate data for a given year.  

Weather Radials is build using a React/Redux front-end to create a streamlined application structure using a global store that contains appropriate weather data, and additionally uses jQuery to render the visualization, which is created using the data visualization library, D3.js.

**Directions:**  
Enter a location name and year, or click on an example in the sidebar to display a weather radial visualization of a location's annual climate data.  

**How it Works:**  
The application gathers the relevant data in a three step process using the Google geocoding API and NOAA NDCD: Climate Data Online API, and then renders the diagram:  
1. Converts a location name into latitude and longitude using the Google geocoding API.  
2. Queries the NOAA NCDC: Climate Data Online API for weather stations within 1.0 latitude and longitude units returned by the previous step and sorts the returned stations by data availability.  
3. Selects the station returned in the previous step and requests maximum and minimum daily temperature data for a specified time period for that location.  
4. Data is converted into a form easily used by jQuery and D3.js and is then rendered as a radial diagram.   

**Challenges:**  
Some challenges that were encountered during the creation of this application were the integration of the search feature and the rendering of the visualization itself, specifically tooltips and poor data. The first challenge was solved through the fine-tuning of API calls, especially the  coordinate deltas used to find appropriate stations for a given location. The second challenge was solved by creating a div that would appear and disappear based on jQuery mouseenter and mouseout event listeners. The third challenge was solved by assuming a temperature delta of 15F for days missing a single data point, while not rendering days with no maximum or minimum temperatures present.  


**Code Examples:**
1. Color, bar, and angle scaling was performed using the scaleLinear() function found within the D3.js library. This was used to create scales based on maximum high and low temperatures in the entire set of data returned. The following code creates the color scale used in the visualization:    

```javascript
let colorScale = d3.scaleLinear()
  .domain([0, 50, 100])
  .range(["#2c7bb6", "#ffff8c", "#d7191c"])
  .interpolate(d3.interpolateHcl);
```

2. At a high level, temperature bars were drawn by selecting the 365 tempBar items previously created, rotating them based on the linear angle scale defined earlier, defining their height based on the min and max daily temperatures, and finally assigning a fill color based on the average daily temperature. The following code performs these actions:  

```javascript
barWrapper.selectAll(".tempBar")
  .data(_weather)
  .enter().append("rect")
  .attr("class", (d, i) => `tempBar tempBar-${i}`)
  .attr("transform", (d, i) => { return "rotate(" + (angle(d.date.getTime() / 1000)) + ")"; })
  .attr("width", 1.5)
  .attr("height", (d, i) => barScale(d.TMAX) - barScale(d.TMIN) )
  .attr("x", -0.75)
  .attr("y", (d, i) => { return barScale(d.TMIN); })
  .attr("tempMin", d => `${d.TMIN}`)
  .attr("tempMax", d => `${d.TMAX}`)
  .attr("date", d => `${ d3.timeFormat("%H:%M")(d.date) }`)
  .style("fill", d => { return colorScale((d.TMAX + d.TMIN) / 2.0); })
```


**Data:**  
Data is provided by the following APIs:  
1. Google geocoding API  
2. NOAA NCDC: Climate Data Online  
