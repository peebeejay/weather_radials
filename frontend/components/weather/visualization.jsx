import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { isEmpty } from 'lodash';
import { fetch5Day, removeWeather } from '../../actions/weather_actions.js';
import * as d3 from 'd3';
import RadialChart from './radial_chart.jsx';

class Visualization extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.removeWeather();
    this.props.fetch5Day(51.0486, 114.0708)
  }

  render() {
    if ( _.isEmpty(this.props.weather) ) {
      return (<div>Loading Weather...</div> );
    }

    return(
      <div>
        <RadialChart weather={ this.props.weather } />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  weather: state.weather
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetch5Day: (lat, lon) => dispatch(fetch5Day(lat, lon)),
  removeWeather: () => dispatch(removeWeather())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Visualization))
