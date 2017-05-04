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
  let tempDifferences = [];

  for (let x = 0; x < _weather.list.length - 1; x++) {
    let temps = [_weather.list[x].main.temp, _weather.list[x + 1].main.temp].sort(function(a,b) { return a - b;});
    tempDifferences.push({ dt: _weather.list[x].dt, main: { temp_min: temps[0], temp_max: temps[1] } });
  }

  barWrapper.selectAll(".tempBar")
    .data(tempDifferences)
    .enter().append("rect")
    .attr("class", "tempBar")
    .attr("transform", function(d,i) { return "rotate(" + (angle(d.dt)) + ")"; })
    .attr("width", 9)
    .attr("height", function(d,i) {
      // debugger
      return barScale(d.main.temp_max) - barScale(d.main.temp_min); })
    .attr("x", -0.75)
    .attr("y", function(d,i) {return barScale(d.main.temp_min); })
    .style("fill", function(d) { return colorScale((d.main.temp_max - d.main.temp_min) / 2.0); });
};
