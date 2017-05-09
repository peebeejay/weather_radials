import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app.jsx';
import VisualizationAnnual from './weather/visualization_annual.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Provider store={ this.props.store }>
        <Router history={ hashHistory }>
          <Route path="/" component={ App } >
            <IndexRoute component={ VisualizationAnnual } />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
