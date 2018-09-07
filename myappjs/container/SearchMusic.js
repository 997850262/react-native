// import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as todoActionCreators from '../actions/index';
// import Head from '../component/Music/Head';
// import Tabbar from '../component/Music/Tabbar';
// import './Music.css';

// class SearchMusic extends React.Component {
//     // componentDidMount=() => {
//     //   const { todoActions } = this.props;
//     //   todoActions.login(109);
//     // }
//     render() {
//       const { music, todoActions } = this.props;
//       return (
//         <div className="Music-all">
//           <Head music={music} todoActions={todoActions} />
//           <Tabbar music={music} todoActions={todoActions} />
//         </div>
//       );
//     }
// }

// function mapStateToProps(state) {
//   const {
//     music
//   } = state;
//   console.log(music);
//   return {
//     music
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     todoActions: bindActionCreators(todoActionCreators, dispatch)
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(SearchMusic);

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import Tabbar from '../component/Tabbar'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class SearchMusic extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }
  // static navigationOptions = {
  //   headerTitle: '搜索音乐',//对页面的配置
  //   tabBarLabel: '搜索音乐',
  //   tabBarIcon:<View style={{height:30,width:30,backgroundColor:'red'}}></View>
  // };
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    // const navigate = this.props.navigation;
    return (
      <ScrollView>
        <View style={styles.container}>
        {/* <Tabbar navigate={navigate}/> */}
          <Text style={styles.welcome}>
            搜索音乐
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button: {
    marginBottom: 30,
    width: 300,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});