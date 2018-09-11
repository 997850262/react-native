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
    play=()=>{
    const { select } = this.props;
    if (select === true) {
        this.props.handleplay(true);
    } else {
        alert('多选状态不能播放');
    }
    }
    rename=()=>{
        this.props.handlerename(true);
    }
    cut=()=>{
    const { select } = this.props;
    if (select === true) {
      this.props.handlepart(true);
    } else {
      alert('多选状态不能选择片段');
    }
    }
    givefriend=() => {
        const { music } = this.props;
        if (music.music.selectid > 0) {
          alert(`送出 ${music.music.entities[music.music.selectid].name}音乐`);
        } else {
          alert('请先选择音乐');
        }
      }
    delete=()=>{
        this.props.ondelect(true);
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.play}>
                    <TouchableWithoutFeedback onPress={this.play} underlayColor="white">
                        <Image style={styles.img} source={require('../source/btn_play.png')}/>
                    </TouchableWithoutFeedback>
                        <View style={styles.button}>
                        <Text style={styles.welcome}>播放</Text>
                        </View>
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={this.rename} underlayColor="white">
                        <Image style={styles.img} source={require('../source/button_rename_red.png')}/>
                    </TouchableWithoutFeedback>
                        <Text style={styles.welcome}>重命名</Text>
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={this.cut} underlayColor="white">
                        <Image style={styles.img} source={require('../source/button_cut.png')}/>
                    </TouchableWithoutFeedback>
                        <Text style={styles.welcome}>截取片断</Text>
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={this.givefriend} underlayColor="white">
                        <Image style={styles.img} source={require('../source/button_share.png')}/>
                    </TouchableWithoutFeedback>
                        <Text style={styles.welcome}>送给朋友</Text>
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={this.delete} underlayColor="white">
                        <Image style={styles.img} source={require('../source/button_delete.png')}/>
                    </TouchableWithoutFeedback>
                        <Text style={styles.welcome}>删除</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection :'row',
        width:360,
        backgroundColor: 'rgb(240, 237, 237)',
        height:80,
        justifyContent:'space-around',
        alignItems:'flex-start',
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
      },
      img: {
          width:30,
          height:30,
          marginLeft:15
      }
  });
