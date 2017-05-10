import React from 'react';
import { search, fetchStation } from '../../util/weather_api_util.js';
import { fetchAnnual, removeWeather } from '../../actions/weather_actions.js';
import { connect } from 'react-redux';

class ExampleItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { loading: false };
  }

  handleClick(e) {
    e.preventDefault();
    search(this.props.city).then(
      (response) => {
        // this.state.location = response.results[0].formatted_address;
        return fetchStation(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng, parseInt(this.props.year))
        }
    ).then(
      (results) => {
        return this.props.fetchAnnual(results.results[0].id, parseInt(this.props.year))
      }
    ).then(
      () => {
        // this.state.header_year = this.props.year;
        this.setState({ loading: false })
      }
    )

    this.setState({ loading: true})
  }

  render() {
    return(
      <div className="example-item-container">
        <div className="example-item-image" onClick={ this.handleClick }>
          <img src={`app/assets/images/${this.props.image}.png`} />
        </div>
        <div className="example-item-header">
          { this.props.city + " " + this.props.year } -
        </div>
        <div className="example-item-sub-header">
          { this.props.sub }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ });

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAnnual: (stationId, startDate, endDate) => dispatch(fetchAnnual(stationId, startDate, endDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleItem)
