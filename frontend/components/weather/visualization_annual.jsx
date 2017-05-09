import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { isEmpty } from 'lodash';
import { fetchAnnual, removeWeather } from '../../actions/weather_actions.js';
import { annualSelector } from '../../selectors/weather_selectors.js';
import { search } from '../../util/weather_api_util.js';
import * as d3 from 'd3';
import RadialChart from './radial_chart.jsx';

class VisualizationAnnual extends React.Component {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this._update = this._update.bind(this);
    this.state = { search: "" };
  }

  componentWillMount() {
    this.props.removeWeather();
    this.props.fetchAnnual('GHCND:USW00014732', '2014-01-01', '2015-01-01');
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("handling submit");
  //   search(this.state.search).then(
  //     (response) => this.props.fetch5Day(response.results[0].geometry.location.lat,
  //                                        response.results[0].geometry.location.lng)
  //   ).then(
  //     () => this.setState({ search: "" })
  //   );
  // }
  //
  // _update(e) {
  //   e.preventDefault();
  //   this.setState({ search: e.target.value });
  // }

  render() {
    if ( _.isEmpty(this.props.weather) ) {
      return (<div>Loading Annual Weather......</div> );
    }

    debugger
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
            <h1 className="radial-header">Annual Radial Weather Visualization for blah</h1>
          </div>
          {/*<RadialChart weather={ this.props.weather } />*/}
          placeholder for annual graph
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
)(withRouter(VisualizationAnnual))
