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
  Button,
  TextInput
} from 'react-native';
const img = require('../source/btn_pause.png');// 暂停
const img2 = require('../source/btn_play.png');// 播放
// const img3 = require('../source/cut_music_finish.png');// 完成
const img4 = require('../source/button_cut_music_start.png');// 标记起点红色
const img5 = require('../source/button_cut_music_finish.png');// 标记终点红色
const img6 = require('../source/button_cut_music_start_gray.png');// 标记起点灰色
const img7 = require('../source/button_cut_music_finish_gray.png');// 标记终点灰色
const img8 = require('../source/button_cut_music_clear_gray.png');// 清除灰色
const img9 = require('../source/button_cut_music_clear.png');// 清除红色
export default class Delect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handlerename = this.handlerename.bind(this);
  }
  onrename=() => {
    const { todoActions } = this.props;
    // const name = this.state.name;
    const { name } = this.state;
    //   console.log(name)
    todoActions.rename(name);
    this.props.onCancel();
  }
  getMaskClassName = isAcitve => {
      if (!isAcitve) {
        console.log(666666)
        return styles.hideMask;
      }
      else{
        console.log(999999)
        return styles.showMask;
      }
    }
  handledelect=() => {
    const { select, todoActions } = this.props;
    if (select === true) {
      todoActions.deleteone();
    } else {
      todoActions.deletemore();
    }
    this.props.onCancel();
  }
  handlerename=e => {
    this.setState({
      name: e.target.value
    });
  }
  renderBody=()=>{
    const { music, select, ispart } = this.props;
    const count = music.music.selectmoreid.length;
    if (select === true && music.music.selectid > 0 && ispart === 4) {
      return (
        <View style={styles.delect_Body}>
          <View><Text style={styles.delect_title}>确定删除{music.music.entities[music.music.selectid].name}音乐吗</Text></View>
          <View style={styles.delect_btn}>
            <Text style={styles.delect_btn1} onPress={this.props.onCancel}>取消</Text>
            <Text style={styles.delect_btn2} onPress={this.handledelect}>确定</Text>
          </View>
        </View>
      );
    } else if (select === false && music.music.selectmoreid.length > 0 && ispart === 4) {
      return (
        <View style={styles.delect_Body}>
          <View><Text style={styles.delect_title}>确定删除{count}首音乐吗</Text></View>
          <View style={styles.delect_btn}>
            <Text style={styles.delect_btn1} onPress={this.props.onCancel}>取消</Text>
            <Text style={styles.delect_btn2} onPress={this.handledelect}>确定</Text>
          </View>
        </View>
      );
    } else if (ispart === 1) {
      return (
        <View style={styles.rename_Body}>
          <View><Text style={styles.rename_title}>请输入新音乐名称</Text></View>
          <TextInput
            style={styles.rename_input}
            type="text"
            defaultValue={music.music.entities[music.music.selectid].name}
            onChange={this.handlerename}
          />
          <View style={styles.rename_btn}>
            <Text style={styles.rename_btn1} onPress={this.props.onCancel}>取消</Text>
            <Text style={styles.rename_btn2} onPress={this.onrename}>确定</Text>
          </View>
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
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        width:"100%",
        height:"100%",
        backgroundColor: "rgba(0, 0, 0, .6)",
        opacity: 0
    },
    showMask: {
      position:"absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // width:"50%",
        // height:"100%",
        backgroundColor: "rgba(0, 0, 0, .6)",
        opacity: 1
    },
      delect_Body:{
        // position: fixed,
        width: 175,
        height: 150,
        left:90,
        top: 100,
        backgroundColor:"white",
        zIndex: 100,
    },
    delect_title: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "500",
    },
    delect_input: {
        marginTop: 10
    },
    delect_btn: {
        display: "flex",
        justifyContent:"space-around",
        marginTop: 30,
    },
    delect_btn1:{
        width: 70,
        height: 30,
        paddingTop: 5,
    },
    delect_btn2: {
        width: 70,
        height: 30,
        paddingTop: 5,
        textAlign: "center",
        borderRadius:30,
        backgroundColor: "red"
    },
    rename_Body:{
        // position: fixed;
        width: 175,
        height: 150,
        left:90,
        top: 100,
        backgroundColor:"white",
        // z-index: 100;
    },
    rename_title:{
        marginTop: 10,
        fontSize: 20,
        fontWeight: "600",
    },
    rename_input:{
        marginTop: 10,
    },
    rename_btn:{
        display: "flex",
        justifyContent:"space-around",
        marginTop: 30,
    },
    rename_btn1:{
        width: 70,
        height: 30,
        paddingTop: 5,
    },
    rename_btn2:{
        width: 70,
        height: 30,
        paddingTop: 5,
        textAlign: "center",
        borderRadius:30,
        backgroundColor: "red",
    }
  });
