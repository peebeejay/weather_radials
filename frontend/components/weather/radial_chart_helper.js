import * as d3 from 'd3';

export const generateSpokes = (barWrapper, innerRadius, outerRadius) => {
  //Add Primary Spoke
  barWrapper.append("line")
    .attr("class", "yearLine")
    .attr("x1", 0)
    .attr("y1", -innerRadius * 0.65)
    .attr("x2", 0)
    .attr("y2", -outerRadius * 1.1);

  for (let x = 1; x < 5; x++) {
    barWrapper.append("line")
      .attr("class", "dayLineSub")
      .attr("x1", 0)
      .attr("y1", -innerRadius * 0.82)
      .attr("transform", `rotate(${x * 72})`)
      .attr("x2", 0)
      .attr("y2", -outerRadius * 1.0);
  }
};


export const plotBars = (_weather, barWrapper, angle, barScale, colorScale) => {
  let div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  let tempDifferences = [];

  for (let x = 0; x < _weather.list.length - 1; x++) {
    let temps = [_weather.list[x].main.temp, _weather.list[x + 1].main.temp].sort(function(a,b) { return a - b;});
    tempDifferences.push({ dt: _weather.list[x].dt, main: { temp_min: temps[0], temp_max: temps[1] } });
  }

  barWrapper.selectAll(".tempBar")
    .data(tempDifferences)
    .enter().append("rect")
    // .attr("class", "tempBar")
    .attr("class", (d, i) => `tempBar tempBar-${i}`)
    .attr("transform", (d,i) => { return "rotate(" + (angle(d.dt)) + ")"; })
    .attr("width", 10)
    .attr("height", (d,i) => { return barScale(d.main.temp_max) - barScale(d.main.temp_min); })
    .attr("x", -0.75)
    .attr("y", (d,i) => {return barScale(d.main.temp_min); })
    .attr("tempMin", (d) => `${d.main.temp_min}`)
    .attr("tempMax", (d) => `${d.main.temp_max}`)
    .attr("date", (d) => `${ d3.timeFormat("%H:%M")(new Date(d.dt * 1000)) }`)
    .style("fill", (d) => { return colorScale((d.main.temp_max + d.main.temp_min) / 2.0); })
    .on("mouseover", (d) => {
       div.transition().duration(50).style("opacity", .9);
       div.html(d3.timeFormat("%B %d, %Y %H:%M")(new Date(d.dt * 1000)) + "<br/> " + d.main.temp_min + "°F - " + d.main.temp_max + "°F")
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
    .on("mouseout", (d) => {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });
};

export const plotDates = (_weather, outerRadius, barWrapper) => {
  for (let x = 0; x < 5; x++) {
    let date = d3.timeFormat("%B %d")(new Date(_weather.list[x * 8].dt * 1000));
    // console.log(date);
    barWrapper.append("text")
    .attr("class", "date")
    .attr("x", 7)
    .attr("y", -outerRadius * 1.1)
    .attr("transform", `rotate(${x * 72})`)
    .attr("dy", "0.9em")
    .text(date);
  }
};
