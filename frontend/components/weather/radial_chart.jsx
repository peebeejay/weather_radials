import React from 'react';
import * as d3 from 'd3';
import { generateSpokes, plotBars, plotDates } from './radial_chart_helper';
import { connect } from 'react-redux';
import { annualSelector } from '../../selectors/weather_selectors.js';

class RadialChart extends React.Component {
  constructor(props) {
    super(props);
    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    let _weather = this.props.weather;

    let margin = { top: 70, right: 20, bottom: 20, left: 20 };
    let width = window.innerWidth - margin.left - margin.right - 400;
    let height = window.innerHeight - margin.top - margin.bottom - 120;

    // Clear existing
    let initial = d3.select('svg');
    initial.remove();

    let svg = d3.select('#weatherRadial')
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")")

    let	outerRadius = Math.min(width, height, 500)/2,
    	innerRadius = outerRadius * 0.4;

    let colorScale = d3.scaleLinear()
    	.domain([0, 50, 100])
    	.range(["#2c7bb6", "#ffff8c", "#d7191c"])
    	.interpolate(d3.interpolateHcl);

    let barScale = d3.scaleLinear()
    	.range([innerRadius, outerRadius])
    	.domain([0, 100]);

    let angle = d3.scaleLinear()
    	.range([-180, 180])
    	.domain(d3.extent( _weather, day => {
        return day.date.getTime() / 1000;
      })
    );

    let textWrapper = svg.append("g").attr("class", "textWrapper")
     .attr("transform", "translate(" + Math.max(-width/2, -outerRadius - 170) + "," + 0 + ")");

    //Wrapper for the bars and to position it downward
    let barWrapper = svg.append("g")
    	.attr("transform", "translate(" + 0 + "," + 0 + ")");

    //Draw gridlines below the bars
    let axes = barWrapper.selectAll(".gridCircles")
     	.data([0, 20, 40, 60, 80, 100])
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
    	.text(function(d) { return d + "°F"});

    this.props.generateSpokes(barWrapper, innerRadius, outerRadius);
    this.props.plotBars(_weather, barWrapper, angle, barScale, colorScale);
    this.props.plotDates(outerRadius, barWrapper, _weather[0].date.getYear() + 1900);
  }

  render() {
    return (
      <div>
        <div id="weatherRadial"
          ref={(weatherRadial) => { this.weatherRadial = weatherRadial; }}>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  weather: annualSelector(state.weather)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  generateSpokes: (barWrapper, innerRadius, outerRadius) => generateSpokes(barWrapper, innerRadius, outerRadius),
  plotBars: (_weather, barWrapper, angle, barScale, colorScale) => plotBars(_weather, barWrapper, angle, barScale, colorScale),
  plotDates: (_weather, outerRadius, barWrapper) => plotDates(_weather, outerRadius, barWrapper)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadialChart)
