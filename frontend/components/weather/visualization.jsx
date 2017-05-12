import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { isEmpty } from 'lodash';
import { fetchAnnual, removeWeather } from '../../actions/weather_actions.js';
import { annualSelector } from '../../selectors/weather_selectors.js';
import { search, fetchStation } from '../../util/weather_api_util.js';
import * as d3 from 'd3';
import RadialChart from './radial_chart.jsx';
import Halogen from 'halogen';
import Examples from './examples.jsx';

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._update = this._update.bind(this);
    this.state = { search: "", year: "",
                   location: "New York City", header_year: "2014",
                   lat: "", lon: "", loading: false, error: ""
                 };
  }

  componentWillMount() {
    this.props.removeWeather();
    this.props.fetchAnnual('GHCND:USW00014732', 2014, this.state.location);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: "" })
    if (this.state.location.length > 0 && this.state.year.length > 0) {
      search(this.state.search).then(
        (response) => {
          if (response.status === "ZERO_RESULTS") {
            return this.setState({ loading: false, error: "Please Try Something Else" })
          }
          this.state.location = response.results[0].formatted_address;
          return fetchStation(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng, parseInt(this.state.year))
          }
      ).then(
        (results) => {
          if (_.isEmpty(results))
            return this.setState({ loading: false, error: "Please Try Something Else" })
          return this.props.fetchAnnual(results.results[0].id, parseInt(this.state.year), this.state.location)
        }
      ).then(
        () => {
          this.state.header_year = this.state.year;
          this.setState({ loading: false, search: "", year: "" })
        }
      )
      this.setState({ loading: true})
    } else {
      this.setState({ error: "Please enter search fields" })
    }
  }

  _update(field) {
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value });
    }
  }

  render() {
    if ( _.isEmpty(this.props.weather) ) {
      return (<div>Loading Weather Radials......</div> );
    }

    return(
      <div className="content flex-right">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <h1>Search Cities Worldwide</h1>
          </div>
          <div className="sidebar-search-container">
            <form onSubmit={ this.handleSubmit }>
              <div className="search-input-container">
                <input className="search-input"
                  placeholder="Search Location"
                  onChange={ this._update('search') }
                  value={ this.state.search }
                  tabindex="1"/>
                <button className="search-button" tabindex="-1">
                  { !this.state.loading &&  <i className="fa fa-search" tabindex="-1"/> }
                  { this.state.loading && <div className="spinner" tabindex="-1"><Halogen.ClipLoader color={'#4DAF7C'} /></div> }

                </button>
              </div>

             <input className="search-input"
                    placeholder="Date (YYYY)"
                    onChange={ this._update('year') }
                    value={ this.state.year } />
            </form>

            { (this.state.error.length > 0) && <div>{ this.state.error }</div> }
          </div>

          <div>
            <Examples />
          </div>

          <div className="sidebar-footer-container">
            <div className="sidebar-footer">
              <span>
                <a href="http://jaypb.io" target="_blank">Jay Puntham-Baker - </a>
                <a href="http://github.com/vdersar1/weather_lite" target="_blank"> Github</a>
              </span>
            </div>
          </div>
        </div>

        <div className="radial-container">
          <div>
            <h1 className="radial-header">Annual Radial Weather Visualization for { this.props.city } in { this.props.weather[0].date.getYear() + 1900 }</h1>
            <h2 className="radial-sub-header">
              The diagram below displays annual high & low temperatures for a specifed city in a radial format.
              Search for any city in the world and enter a year going back to 1875, or click on an example shown in the sidebar.
              Coordinate data is provided by the Google Geocoding API and climate data is provided by NOAA NCDC: Climate Data Online.
            </h2>

          </div>
          <RadialChart weather={ this.props.weather } />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  weather: annualSelector(store.weather),
  city: store.weather.city
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAnnual: (stationId, startDate, endDate) => dispatch(fetchAnnual(stationId, startDate, endDate)),
  removeWeather: () => dispatch(removeWeather())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Visualization))
