import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Provider store={ this.props.store }>
        <Router history={ hashHistory }>
          <Route path="/" component={ App } >
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
