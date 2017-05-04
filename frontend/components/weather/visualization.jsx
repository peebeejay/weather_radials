import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { isEmpty } from 'lodash';
import { fetch5Day, removeWeather } from '../../actions/weather_actions.js';
import { search } from '../../util/weather_api_util.js';
import * as d3 from 'd3';
import RadialChart from './radial_chart.jsx';

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._update = this._update.bind(this);
    this.state = { search: "" };
  }

  componentWillMount() {
    this.props.removeWeather();
    this.props.fetch5Day(29.652491, 91.172112)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("handling submit");
    search(this.state.search).then(
      (response) => this.props.fetch5Day(response.results[0].geometry.location.lat,
                                         response.results[0].geometry.location.lng)
    ).then(
      () => this.setState({ search: "" })
    );
  }

  _update(e) {
    e.preventDefault();
    this.setState({ search: e.target.value });
  }

  render() {
    if ( _.isEmpty(this.props.weather) ) {
      return (<div>Loading Weather...</div> );
    }

    return(
      <div className="content flex-right">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <h1>Weather Forecast Radials</h1>
          </div>
          <div className="sidebar-search-container">
            <form onSubmit={ this.handleSubmit }>
              <input className="search-input"
                     placeholder="Search"
                     onChange={ this._update }
                     value={ this.state.search }/>
              <button className="search-button"><i className="fa fa-search" /></button>
            </form>
          </div>
          <div className="sidebar-footer-container">
            <div className="sidebar-footer">
              <span>Jay Puntham-Baker -
                <a href="http://github.com/vdersar1/weather_lite"> Github</a>
              </span>
            </div>
          </div>
        </div>

        <div className="radial-container">
          <div>
            <h1 className="radial-header">Radial 5-Day Forecast for { this.props.weather.city.name }, { this.props.weather.city.country}</h1>
          </div>
          <RadialChart weather={ this.props.weather } />
        </div>
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
