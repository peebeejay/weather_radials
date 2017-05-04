import React from 'react';
import * as d3 from 'd3';
import { generateSpokes, plotBars } from './radial_chart_helper';
import { connect } from 'react-redux';

class RadialChart extends React.Component {
  constructor(props) {
    super(props);
    this.renderChart = this.renderChart.bind(this);
    this.state = { margin: {}, width: {}, height: {},
                   svg: {}, outerRadius: {}, colorScale: {}, barScale: {}, angle: {}
                 };
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidReceiveProps() {
    this.renderChart();
  }

  renderChart() {
    let _weather = this.props.weather;

    let margin = { top: 70, right: 20, bottom: 120, left: 20 };
    let width = window.innerWidth - margin.left - margin.right - 20;
    let height = window.innerHeight - margin.top - margin.bottom - 20;

    let svg = d3.select('#weatherRadial')
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")")


    //d3.timeParse("%Y-%B-%d %H:%M:%S")(_weather.list[0].dt_text)
    // debugger
    // //Parses a string into a date
    // let parseDate = d3.time.format("%Y-%m-%d").parse;
    //
    // //Turn strings into actual numbers/dates
    // weatherBoston.forEach(function(d) {
    // 	d.date = parseDate(d.date);
    // });

    //Set the minimum inner radius and max outer radius of the chart
    let	outerRadius = Math.min(width, height, 500)/2,
    	innerRadius = outerRadius * 0.4;

    //Base the color scale on average temperature extremes
    let colorScale = d3.scaleLinear()
    	.domain([-15, 7.5, 30])
    	.range(["#2c7bb6", "#ffff8c", "#d7191c"])
    	.interpolate(d3.interpolateHcl);

    //Scale for the heights of the bar, not starting at zero to give the bars an initial offset outward
    let barScale = d3.scaleLinear()
    	.range([innerRadius, outerRadius])
    	.domain([-15,30]);

    // debugger
    // Scale to turn the date into an angle of 360 degrees in total
    // With the first datapoint (Jan 1st) on top
    let angle = d3.scaleLinear()
    	.range([-180, 180])
    	.domain(d3.extent(_weather.list, (day) => {
        return day.dt;
        }
      )
    );

    let textWrapper = svg.append("g").attr("class", "textWrapper")
     .attr("transform", "translate(" + Math.max(-width/2, -outerRadius - 170) + "," + 0 + ")");

    //Append title to the top
    textWrapper.append("text")
    	.attr("class", "title")
        .attr("x", 0)
        .attr("y", -outerRadius - 40)
        .text("Radial Forecast for a City");

    textWrapper.append("text")
    	.attr("class", "subtitle")
        .attr("x", 0)
        .attr("y", -outerRadius - 20)
        .text("2015");

    //Append credit at bottom
    textWrapper.append("text")
    	.attr("class", "credit")
        .attr("x", 0)
        .attr("y", outerRadius + 120)
        .text("Based on weather-radials.com");

    //Wrapper for the bars and to position it downward
    let barWrapper = svg.append("g")
    	.attr("transform", "translate(" + 0 + "," + 0 + ")");

    //Draw gridlines below the bars
    let axes = barWrapper.selectAll(".gridCircles")
     	.data([-20,-10,0,10,20,30])
     	.enter().append("g");
    //Draw the circles
    axes.append("circle")
     	.attr("class", "axisCircles")
     	.attr("r", function(d) { return barScale(d); });
    //Draw the axis labels
    axes.append("text")
    	.attr("class", "axisText")
    	.attr("y", function(d) { return barScale(d); })
    	.attr("dy", "0.3em")
    	.text(function(d) { return d + "°C"});

    //Add January for reference
    barWrapper.append("text")
    	.attr("class", "january")
    	.attr("x", 7)
    	.attr("y", -outerRadius * 1.1)
    	.attr("dy", "0.9em")
    	.text("January");

    barWrapper.append("text")
    	.attr("class", "january")
    	.attr("x", 7)
    	.attr("y", -outerRadius * 1.1)
      .attr("transform", "rotate(90)")
    	.attr("dy", "0.9em")
    	.text("Next Day");

    this.props.generateSpokes(barWrapper, innerRadius, outerRadius);
    this.props.plotBars(_weather, barWrapper, angle, barScale, colorScale);
  }


  render() {
    console.log("rendering radial chart");
    return (
      <div>
        <div id="weatherRadial"
          ref={(weatherRadial) => { this.weatherRadial = weatherRadial; }}>
        </div>
        bottom of radial
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  weather: state.weather
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  generateSpokes: (barWrapper, innerRadius, outerRadius) => generateSpokes(barWrapper, innerRadius, outerRadius),
  plotBars: (_weather, barWrapper, angle, barScale, colorScale) => plotBars(_weather, barWrapper, angle, barScale, colorScale)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadialChart)
