/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   FlatList,
//   SectionList,
//   TouchableHighlight,
//   TouchableOpacity,
//   TouchableNativeFeedback,
//   TouchableWithoutFeedback,
//   Alert
// } from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   _onPressButton() {
//     Alert.alert('You tapped the button!')
//   }

//   _onLongPressButton() {
//     Alert.alert('You long-pressed the button!')
//   }
//   render() {
//     let pic = {
//       uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
//     };
//     return (
//       <ScrollView>
//         <View style={styles.container}>
//           <Text style={styles.welcome}>
//             Welcome to React Native!
//           </Text>
//           <Text style={styles.instructions}>
//             To get started, edit App.js
//           </Text>
//           <Text style={styles.instructions}>
//             {instructions}
//           </Text>
//           <Text style={styles.welcome}>HELLO WORLD!!!!!!!!!!!!!!!!!!!!!!!!</Text>
//           <Image source={pic} style={{width: 193, height: 110}} />
//           <FlatList
//           data={[
//             {key: 'Devin'},
//             {key: 'Jackson'},
//             {key: 'James'},
//             {key: 'Joel'},
//             {key: 'John'},
//             {key: 'Jillian'},
//             {key: 'Jimmy'},
//             {key: 'Julie'},
//           ]}
//           renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
//         />
//         <SectionList
//           sections={[
//             {title: 'D', data: ['Devin']},
//             {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
//           ]}
//           renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
//           renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
//           keyExtractor={(item, index) => index}
//         />
//         <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
//           <View style={styles.button}>
//             <Text style={styles.buttonText}>TouchableHighlight</Text>
//           </View>
//         </TouchableHighlight>
//         <TouchableOpacity onPress={this._onPressButton}>
//           <View style={styles.button}>
//             <Text style={styles.buttonText}>TouchableOpacity</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableNativeFeedback
//             onPress={this._onPressButton}
//             background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
//           <View style={styles.button}>
//             <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
//           </View>
//         </TouchableNativeFeedback>
//         <TouchableWithoutFeedback
//             onPress={this._onPressButton}
//             >
//           <View style={styles.button}>
//             <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
//           </View>
//         </TouchableWithoutFeedback>
//         <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
//           <View style={styles.button}>
//             <Text style={styles.buttonText}>Touchable with Long Press</Text>
//           </View>
//         </TouchableHighlight>
//         </View>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   sectionHeader: {
//     paddingTop: 2,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 2,
//     fontSize: 14,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(247,247,247,1.0)',
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
//   button: {
//     marginBottom: 30,
//     width: 260,
//     alignItems: 'center',
//     backgroundColor: '#2196F3'
//   },
//   buttonText: {
//     padding: 20,
//     color: 'white'
//   }
// });

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './myappjs/store/configureStore';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {
  createStackNavigator,
  TabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import AppWrapper from './myappjs/container/AppWrapper';
import Music from './myappjs/container/Music';
import SearchMusic from './myappjs/container/SearchMusic';
import UploadMusic from './myappjs/container/UploadMusic';
const store = configureStore();
// const App = createStackNavigator({
//   AppWrapper: { screen: AppWrapper },
//   Music: { path: 'music', screen: Music },
//   SearchMusic:  { path: 'searchmusic', screen: SearchMusic },
//   UploadMusic:  { path: 'uploadmusic', screen: UploadMusic }
// }, {
//   initialRouteName: 'Music',
// });

const Tabs = createMaterialTopTabNavigator({
  Music: {
      screen: Music,
      navigationOptions: {  // 也可以写在组件的static navigationOptions内
      title:'我的音乐',
      }
  },
  SearchMusic: {
      screen: SearchMusic,
      navigationOptions: {
      title:'搜索音乐',
      }
  },
  UploadMusic: {
      screen: UploadMusic,
      navigationOptions: {
      title:'上传音乐',
      }
  }
}, {
    animationEnabled: true, // 切换页面时是否有动画效果
    tabBarPosition: 'top', // 导航的位置
    swipeEnabled: true, // 是否可以左右滑动切换tab
    // backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: 'red', // 文字和图片选中颜色
        inactiveTintColor: 'black', // 文字和图片未选中颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 1,  // TabBar下面显示有一条线
            backgroundColor: 'red'
        }, 
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            // height: 44
        },
        labelStyle: {
            fontSize: 10, // 文字大小
        },
    },
});
// export default Tabs;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  }
}

export default App;

// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <Router routes={routes} history={browserHistory} />
//       </Provider>
//     );
//   }
// }

// export default App;
