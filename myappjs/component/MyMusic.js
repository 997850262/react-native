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
  Alert,
  AppRegistry,
  Button
} from 'react-native';

export default class MyMusic extends Component {

    render(){
        const{music}=this.props;
        return(
            <View style={styles.musiccontainer}>
                <Text style={styles.welcome}>我的音乐 {music.music.data.nick}</Text>
                <Text style={styles.welcome}>推荐音乐</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerall: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection :'row',
      },
      musiccontainer: {
        paddingLeft:10
      },
      welcome: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
      },
  });
