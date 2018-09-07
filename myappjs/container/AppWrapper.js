import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActionCreators from '../actions/index';
import {
    Platform,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
class AppWrapper extends React.Component {
  // componentDidMount=() => {
  //   const { todoActions } = this.props;
  //   todoActions.login(109);
  // }
  render() {
    const { children } = this.props;
    return (
      <View>
        {children}
      </View>
    );
  }
}
function mapStateToProps(state) {
  const {
    music
  } = state;
  console.log(music);
  return {
    music
  };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);

// export default AppWrapper;
