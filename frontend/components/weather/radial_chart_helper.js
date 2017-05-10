import * as d3 from 'd3';

export const generateSpokes = (barWrapper, innerRadius, outerRadius) => {
  //Add Primary Spoke
  barWrapper.append("line")
    .attr("class", "yearLine")
    .attr("x1", 0)
    .attr("y1", -innerRadius * 0.65)
    .attr("x2", 0)
    .attr("y2", -outerRadius * 1.1);
};


export const plotBars = (_weather, barWrapper, angle, barScale, colorScale) => {
  let div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  barWrapper.selectAll(".tempBar")
    .data(_weather)
    .enter().append("rect")
    .attr("class", (d, i) => `tempBar tempBar-${i}`)
    .attr("transform", (d,i) => { return "rotate(" + (angle(d.date.getTime() / 1000)) + ")"; })
    .attr("width", 1.5)
    .attr("height", (d,i) => { return barScale(d.TMAX) - barScale(d.TMIN); })
    .attr("x", -0.75)
    .attr("y", (d,i) => {return barScale(d.TMIN); })
    .attr("tempMin", (d) => `${d.TMIN}`)
    .attr("tempMax", (d) => `${d.TMAX}`)
    .attr("date", (d) => `${ d3.timeFormat("%H:%M")(d.date) }`)
    .style("fill", (d) => { return colorScale((d.TMAX + d.TMIN) / 2.0); })
    .on("mouseover", (d) => {
       div.transition().duration(50).style("opacity", .9);
       div.html(d3.timeFormat("%B %d, %Y")(d.date) + "<br/> " + d.TMIN + "°F  to  " + d.TMAX + "°F")
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
    .on("mouseout", (d) => {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });
};

export const plotDates = (outerRadius, barWrapper, year) => {
  barWrapper.append("text")
  	.attr("class", "date")
  	.attr("x", 7)
  	.attr("y", -outerRadius * 1.1)
  	.attr("dy", "0.9em")
  	.text(`January ${year}`);
};
