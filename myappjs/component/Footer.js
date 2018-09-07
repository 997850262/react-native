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

export default class Footer extends Component {

    render(){
        return(
            <View style={styles.containerall}>
                <View style={styles.container}>
                    <View style={styles.play}>
                        <Image style={{width:30,height:30}} source={require('../source/btn_play.png')}/>
                        <Text style={styles.welcome}>播放</Text>
                    </View>
                    <View>
                        <Image style={{width:30,height:30}} source={require('../source/button_rename_red.png')}/>
                        <Text style={styles.welcome}>重命名</Text>
                    </View>
                    <View>
                        <Image style={{width:30,height:30}} source={require('../source/button_cut.png')}/>
                        <Text style={styles.welcome}>截取片断</Text>
                    </View>
                    <View>
                        <Image style={{width:30,height:30}} source={require('../source/button_delete.png')}/>
                        <Text style={styles.welcome}>删除</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerall: {
        backgroundColor: 'gray',
        width:350,
        height:80
      },
    container: {
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
      play: {
        flexDirection :'column',
      }
  });
