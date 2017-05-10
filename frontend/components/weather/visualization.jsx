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
                   lat: "", lon: "", loading: false
                 };
  }

  componentWillMount() {
    this.props.removeWeather();
    this.props.fetchAnnual('GHCND:USW00014732', 2014);
  }

  handleSubmit(e) {
    e.preventDefault();
    // debugger
    search(this.state.search).then(
      (response) => {
        this.state.location = response.results[0].formatted_address;
        return fetchStation(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng, parseInt(this.state.year))
        }
    ).then(
      (results) => {
        // debugger
        return this.props.fetchAnnual(results.results[0].id, parseInt(this.state.year))
      },
      (err) => {
        // debugger
        this.setState({ loading: false })
      }
    ).then(
      () => {
        this.state.header_year = this.state.year;
        this.setState({ loading: false, search: "", year: "" })
      }
    )

    this.setState({ loading: true})
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
    // debugger

    return(
      <div className="content flex-right">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <h1>Search Cities Worldwide</h1>
          </div>
          <div className="sidebar-search-container">
            <form onSubmit={ this.handleSubmit }>
              <input className="search-input"
                     placeholder="Search Location"
                     onChange={ this._update('search') }
                     value={ this.state.search }/>

             <input className="search-input"
                    placeholder="Date (YYYY)"
                    onChange={ this._update('year') }
                    value={ this.state.year }/>
              <button className="search-button">
                { !this.state.loading &&  <i className="fa fa-search" /> }
                { this.state.loading && <div className="spinner"><Halogen.ClipLoader color={'#4DAF7C'} /></div> }
              </button>
            </form>
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
            <h1 className="radial-header">Annual Radial Weather Visualization for { this.state.location } in { this.props.weather[0].date.getYear() + 1900 }</h1>
          </div>
          <RadialChart weather={ this.props.weather } />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  weather: annualSelector(state.weather)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAnnual: (stationId, startDate, endDate) => dispatch(fetchAnnual(stationId, startDate, endDate)),
  removeWeather: () => dispatch(removeWeather())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Visualization))
