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
const img = require('../source/btn_pause.png');// 暂停
const img2 = require('../source/btn_play.png');// 播放
// const img3 = require('../../source/cut_music_finish.png');// 完成
const img4 = require('../source/button_cut_music_start.png');// 标记起点红色
const img5 = require('../source/button_cut_music_finish.png');// 标记终点红色
const img6 = require('../source/button_cut_music_start_gray.png');// 标记起点灰色
const img7 = require('../source/button_cut_music_finish_gray.png');// 标记终点灰色
const img8 = require('../source/button_cut_music_clear_gray.png');// 清除灰色
const img9 = require('../source/button_cut_music_clear.png');// 清除红色
export default class ListenMusic extends Component {
constructor(props) {
    super(props);
    this.state = {
        play: true,
        alltime: 0,
        currentTime: 0,
        ismove: false,
        signstartTime: 0,
        signendTime: 0
    };
    }
    getMaskClassName = isAcitve => {
        if (!isAcitve) {
          return styles.hideMask;
        }
        else{
          return styles.showMask;
        }
      }
    renderBody=()=>{
      const { music, ispart } = this.props;
      const minute = Math.floor(this.state.alltime / 60);
      const second = Math.floor(this.state.alltime - (60 * minute));
      const currentminute = Math.floor(this.state.currentTime / 60);
      const currentsecond = Math.floor(this.state.currentTime % 60);
      if (ispart === 0 && !(music.music.recommendresult.indexOf(music.music.selectid) + 1)) {
        const src = music.music.entities[music.music.selectid].m_url;
        return (
          <View style={styles.Body}>
            <View style={styles.close} onPress={this.close}><Text>关闭</Text></View>
            <View style={styles.title}><Text>{music.music.entities[music.music.selectid].name}</Text></View>
            <View style={styles.ListenMusic_time}><Text>{currentminute}:{currentsecond}</Text><Text>/{minute}:{second}</Text></View>
            {/* {this.audioall(src)} */}
          </View>
        );
      } else if (ispart === 0 && music.music.recommendresult.indexOf(music.music.selectid) + 1) {
        const src = music.music.entities[music.music.selectid].m_url;
        return (
          <View style={styles.Body}>
            <View style={styles.close} onPress={this.close}><Text>关闭</Text></View>
            <View style={styles.title}><Text>{music.music.entities[music.music.selectid].name}</Text></View>
            <View style={styles.ListenMusic_time}><Text>{currentminute}:{currentsecond}</Text><Text>/{minute}:{second}</Text></View>
            {/* {this.audioall(src)} */}
          </View>
        );
      } else if (ispart === 2) {
        const src = music.music.entities.list[music.music.selectid].m_url;
        return (
          <View style={styles.part-Body}>
            {this.renderbuttons()}
            {/* {this.audioall(src)} */}
            <View style={styles.ListenMusic_time}><Text>{currentminute}:{currentsecond}</Text><Text>/{minute}:{second}</Text></View>
            <button style={styles.part-close} onPress={this.successsign}><Text>完成</Text></button>
          </View>
        );
      }
      return null;
    }
    render(){
        const { isAcitve } = this.props;
        if (isAcitve === true) {
          return (
            <View style={styles.container}>
              <View style={this.getMaskClassName(isAcitve)} />
              <View >
                {this.renderBody()}
              </View>
            </View>
          );
        }
        return null;
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection :'row',
      },
    hideMask: {
      position:"absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, .6)",
        opacity: 0
    },
    showMask: {
      position:"absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, .6)",
        opacity: 1
    },
    Body:{
      // position: fixed;
      width: "100%",
      height: 150,
      bottom:0,
      backgroundColor:"white",
      zIndex: 100,
    },
    playbtn:{
        width:25,
        height:30,
    },
    title:{
        textAlign: "center",
        marginTop: 18,
    },
    close:{
        // float: right;
    },
    ListenMusic_time:{
      textAlign: "center",
    },
    ListenMusic_play_all0:{
        marginLeft: 15,
        display: "flex",
    },
    finish:{
      position: "absolute",
        width: 20,
        height: 30,
        right: 70,
    },
    slider_all:{
        width: "70%",
        height: 5,
        backgroundColor: "rgb(223, 219, 219)",
        marginTop: 15,
        marginLeft: 10,
    },
    slider_shelter_all:{
      position: "relative",
    },
    sliders:{
      position: "absolute",
        height: 4,
        backgroundColor: "red",
    },
    slider:{
      position: "relative",
        height: 4,
        backgroundColor: "red",
    },
    slider_shelter:{
      position: "absolute",
      height: 4,
      backgroundColor: "rgb(223, 219, 219)",
      zIndex: 200
    },
    slider_circle:{
        position: "relative",
        width: 24,
        height: 24,
        borderRadius:12,
        backgroundColor: "white",
        // border: 1px solid black;
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth:1,
        marginLeft: -12,
        marginTop: -15,
    },
    part_Body:{
      // position: fixed;
      width: "100%",
      height: 300,
      bottom:0,
      backgroundColor:"white",
      zIndex: 100,
    },
    part_close:{
        position: "absolute",
        bottom: 0,
        height: 40,
        width: "100%",
    },
    intercept:{
        display: "flex",
        justifyContent:"space-around",
        marginTop: 20,
    },
    intercept_start:{
        width: 30,
        height: 30,
        borderRadius:15,
        // border: 1 solid black,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth:1,
    },
    intercept_descript:{
        position: "relative",
        marginTop: 10,
    },
    intercept_1:{
        display: "flex",
        flexDirection: "column"
    },
    ListenMusic_play_all2:{
      marginLeft: 15,
      marginTop: 20,
      display: "flex",
  },
  startsign:{
      position: "absolute",
      width: 30,
      height: 50,
      marginLeft: 35,
      marginTop: -25,
      zIndex: -100
  },
  endsign:{
      position: "absolute",
      width: 30,
      height: 50,
      marginLeft: 35,
      marginTop: -25,
      zIndex: -100
  }
  });
