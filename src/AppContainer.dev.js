'use strict';

const React = require('react');
const deepForceUpdate = require('react-deep-force-update');
const { Component } = React;

class AppContainer extends Component {
  componentDidMount() {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
      console.error(
        'React Hot Loader: It appears that "react-hot-loader/patch" ' +
        'did not run immediately before the app started. Make sure that it ' +
        'runs before any other code. For example, if you use Webpack, ' +
        'you can add "react-hot-loader/patch" as the very first item to the ' +
        '"entry" array in its config. Alternatively, you can add ' +
        'require("react-hot-loader/patch") as the very first line ' +
        'in the application code, before any other imports.'
      );
    }
  }

  componentWillReceiveProps() {
    // Hot reload is happening.
    // Retry rendering!
    // Force-update the whole tree, including
    // components that refuse to update.
    deepForceUpdate(this);
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

AppContainer.propTypes = {
  children(props) {
    if (React.Children.count(props.children) !== 1) {
      return new Error(
        'Invalid prop "children" supplied to AppContainer. ' +
        'Expected a single React element with your app’s root component, e.g. <App />.'
      );
    }

    return undefined;
  },
};

module.exports = AppContainer;
