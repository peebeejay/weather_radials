import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <p></p>
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ });

const mapDispatchToProps = (dispatch, ownProps) => ({ });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
