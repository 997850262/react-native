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
import {AudioRecorder,AudioUtils} from 'react-native-video';
// import Sound from 'react-native-sound';

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
    onTouchStart=event => {
      // console.log(event);
      // console.log(event.touches);
      this.startX = event.touches[0].clientX;
      this.setState({
        ismove: true
      });
    }
    onTouchMove=event => {
      const { music } = this.props;
      const myVideo = document.getElementById('myAudio');
      this.endX = event.changedTouches[0].clientX;
      // console.log(11111111,this.startX)
      // console.log(22222222,this.endX)
      if (!(music.music.recommendresult.indexOf(music.music.selectid) + 1)) {
        if (this.state.signendTime === 0 && this.endX > 300 && music.music.entities[music.music.selectid].emt === 0) { // 限制滑块
          this.endX = 300;
        } else if (this.state.signstartTime === 0 && this.endX < 56 && music.music.entities[music.music.selectid].bmt === 0) {
          this.endX = 56;
        } else if (this.state.signstartTime !== 0 && this.endX < ((this.state.signstartTime * 252) / (this.state.alltime) + 56)) {
          this.endX = ((this.state.signstartTime * 252) / (this.state.alltime) + 56);
        } else if (this.state.signendTime !== 0 && this.endX > ((this.state.signendTime * 252) / (this.state.alltime) + 56)) {
          this.endX = ((this.state.signendTime * 252) / (this.state.alltime) + 56);
        }
        if (music.music.entities[music.music.selectid].bmt >= 0 &&
          this.endX < ((music.music.entities[music.music.selectid].bmt) * 252 / (this.state.alltime) + 56)) {
          this.endX = ((music.music.entities[music.music.selectid].bmt) * 252 / (this.state.alltime) + 56);
        } else if (music.music.entities[music.music.selectid].emt > 0 &&
          this.endX > ((music.music.entities[music.music.selectid].emt) * 252 / (this.state.alltime) + 56)) {
          this.endX = ((music.music.entities[music.music.selectid].emt) * 252 / (this.state.alltime) + 56);
        }
      } else if (this.endX < 56) {
        this.endX = 56;
      } else if (this.endX - 300 > 0) {
        this.endX = 300;
      }
      // console.log('123456',this.endX)
      const x = this.endX - this.startX;
      // console.log(x);
      const time = (x / 252) * this.state.alltime;
      // console.log(time)
      this.setState({
        currentTime: myVideo.currentTime + time
      });
    }
  onTouchEnd=event => {
    console.log(event);
    const myVideo = document.getElementById('myAudio');
    myVideo.currentTime = this.state.currentTime;
    this.setState({
      ismove: false
    });
  }
  getMaskClassName = isAcitve => {
    if (!isAcitve) {
      return styles.hideMask;
    }
    else{
      return styles.showMask;
    }
  }
    getmusicx=event => { // 点击获取新的位置
      const myVideo = document.getElementById('myAudio');
      // console.log(event);
      this.startX = event.clientX;
      const x = this.startX - 54;
      const time = (x / 252) * this.state.alltime;
      this.setState({
        currentTime: +time
      });
      myVideo.currentTime = time;
    }
  
    audioall = src => {
      // console.log(src)
      const { ispart } = this.props;
      const circlewidth = `${(this.state.currentTime / this.state.alltime) * 100}%`;
      // const sound = new Sound('src',null, (e) => {
      //           if (error) {
      //                console.log('播放失败');
      //               return;
      //           }
      //           sound.play(() => sound.release());
      //       });
      return (
        <View style={styles[`ListenMusic_play_all${ispart}`]}>
          {this.playorstop()}
          <View style={styles.slider_all} onClick={this.getmusicx}>
            {this.renderprogress()}
            {this.rendersign()}
            <View
              style={styles.slider_circle}
              style={{ marginLeft: `${circlewidth}` }}
              type="range"
              onTouchMove={this.onTouchMove}
              onTouchStart={this.onTouchStart}
              onTouchEnd={this.onTouchEnd}
            />
            {/* <Audio
              id="myAudio"
              src={src}
              autoPlay
              loop
              onCanPlay={() => this.controlAudio('gettime')}
              onTimeUpdate={() => this.controlAudio('getCurrentTime')}
            /> */}
          </View>
        </View>
      );
    }
    controlAudio(type) { // 获取时间
      const { music } = this.props;
      const myVideo = document.getElementById('myAudio');
      switch (type) {
        case 'gettime': {
          this.setState({
            alltime: myVideo.duration
          });
          break;
        }
        case 'getCurrentTime': {
          if (this.state.ismove === false) {
            if (this.state.signstartTime !== 0 && myVideo.currentTime < this.state.signstartTime) {
              myVideo.currentTime = this.state.signstartTime;
            }
            if (this.state.signendTime !== 0 && myVideo.currentTime > this.state.signendTime) {
              myVideo.currentTime = this.state.signstartTime;
            }
            if (this.state.signendTime !== 0 && myVideo.currentTime === this.state.signendTime) {
              this.state.currentTime = this.state.signstartTime;
              myVideo.currentTime = this.state.signstartTime;
            }
            if (!(music.music.recommendresult.indexOf(music.music.selectid) + 1)) {
              if (music.music.entities[music.music.selectid].bmt !== 0 &&
                 myVideo.currentTime < music.music.entities[music.music.selectid].bmt) {
                myVideo.currentTime = music.music.entities[music.music.selectid].bmt;
              }
              if (music.music.entities[music.music.selectid].emt !== 0 &&
                 myVideo.currentTime > music.music.entities[music.music.selectid].emt) {
                myVideo.currentTime = music.music.entities[music.music.selectid].bmt;
              }
              if (music.music.entities[music.music.selectid].emt !== 0 &&
                 myVideo.currentTime === music.music.entities[music.music.selectid].emt) {
                this.state.currentTime = music.music.entities[music.music.selectid].bmt;
                myVideo.currentTime = music.music.entities[music.music.selectid].bmt;
              }
            }
            this.setState({
              currentTime: myVideo.currentTime
            });
            if (myVideo.currentTime === myVideo.duration) {
              myVideo.currentTime = 0;
              this.setState({
                play: false
              });
            }
          }
          break;
        }
        default: break;
      }
    }
    playorstop=() => { // 显示播放还是暂停按钮
      if (this.state.play === false) {
        return (
          <Image source={img2} style={styles.playbtn} onClick={this.playmusic} />
        );
      }
  
      return (
        <View>
          <Image source={img} style={styles.playbtn} onClick={this.playmusic} />
        </View>
      );
    }
    playmusic=() => { // 播放或暂停
      const myVideo = document.getElementById('myAudio');
      if (this.state.play === false) {
        myVideo.play();
        this.setState({
          play: true
        });
      } else {
        myVideo.pause();
        this.setState({
          play: false,
          currentTime: myVideo.currentTime
        });
      }
    }
    close=() => {
      console.log("关闭")
      this.setState({
        play: true
      });
      this.props.onCancel();
    }
      signstart=() => { // 标记起点
        const myVideo = document.getElementById('myAudio');
        this.setState({
          signstartTime: myVideo.currentTime
        });
      }
      signend=() => { // 标记终点
        const myVideo = document.getElementById('myAudio');
        if (this.state.signstartTime === 0) {
          alert('请先标记起点');
        } else if (myVideo.currentTime - this.state.signstartTime < 10) {
          alert('不足10秒,请重新标记');
        } else {
          this.setState({
            signendTime: myVideo.currentTime
          });
        }
      }
      successsign=() => {
        const { todoActions } = this.props;
        const { signstartTime } = this.state;
        const { signendTime } = this.state;
        if (signstartTime !== 0 && signendTime - signstartTime >= 10) {
          todoActions.signtime(signstartTime, signendTime);
          this.props.onCancel();
        } else {
          this.props.onCancel();
        }
        this.setState({
          play: true,
          signstartTime: 0,
          signendTime: 0
        });
      }
    cleansign=() => {
      const { todoActions } = this.props;
      this.setState({
        signstartTime: 0,
        signendTime: 0
      });
      todoActions.cleansigntime();
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
            <View style={styles.close}><Text onPress={this.close}>关闭</Text></View>
            <View style={styles.title}><Text>{music.music.entities[music.music.selectid].name}</Text></View>
            <View style={styles.ListenMusic_time}><Text>{currentminute}:{currentsecond}/{minute}:{second}</Text></View>
            {this.audioall(src)}
          </View>
        );
      } else if (ispart === 0 && music.music.recommendresult.indexOf(music.music.selectid) + 1) {
        const src = music.music.entities[music.music.selectid].m_url;
        return (
          <View style={styles.Body}>
            <View style={styles.close}><Text onPress={this.close}>关闭</Text></View>
            <View style={styles.title}><Text>{music.music.entities[music.music.selectid].name}</Text></View>
            <View style={styles.ListenMusic_time}><Text>{currentminute}:{currentsecond}/{minute}:{second}</Text></View>
            {this.audioall(src)}
          </View>
        );
      } else if (ispart === 2) {
        const src = music.music.entities[music.music.selectid].m_url;
        return (
          <View style={styles.part_Body}>
            {this.renderbuttons()}
            {/* {this.audioall(src)} */}
            <View style={styles.ListenMusic_time}><Text>{currentminute}:{currentsecond}/{minute}:{second}</Text></View>
            <button style={styles.part_close} onPress={this.successsign}><Text>完成</Text></button>
          </View>
        );
      }
      return null;
    }

    renderprogress=() => {
      const { music } = this.props;
      const shelternow = `${(this.state.signstartTime / this.state.alltime) * 100}%`;
      if (!(music.music.recommendresult.indexOf(music.music.selectid) + 1)) {
        const shelter = `${(music.music.entities[music.music.selectid].bmt / this.state.alltime) * 100}%`;
        const widths = `${(this.state.currentTime / this.state.alltime) * 100}%`;
        if (this.state.signstartTime !== 0) {
          return (
            <View style={styles.slider_shelter_all}>
              <View style={styles.slider_shelter} style={{ width: `${shelternow}` }} />
              <View style={styles.sliders} style={{ width: `${widths}` }} />
            </View>
          );
        }// 给截取但未确定时加标记
        if (music.music.entities[music.music.selectid].bmt !== 0) { // 给确定后加标记
          return (
            <View style={styles.slider_shelter_all}>
              <View style={styles.slider_shelter} style={{ width: `${shelter}` }} />
              <View style={styles.sliders} style={{ width: `${widths}` }} />
            </View>
          );
        }
    
        return (
          <View style={styles.slider} style={{ width: `${widths}` }} />
        );
      }
    
      const shelter = `${(music.music.entities[music.music.selectid].bmt / this.state.alltime) * 100}%`;
      const widths = `${(this.state.currentTime / this.state.alltime) * 100}%`;
      if (this.state.signstartTime !== 0) {
        return (
          <View style={styles.slider_shelter_all}>
            <View style={styles.slider_shelter} style={{ width: `${shelternow}` }} />
            <View style={styles.sliders} style={{ width: `${widths}` }} />
          </View>
        );
      }// 给截取但未确定时加标记
      if (music.music.entities[music.music.selectid].bmt !== 0) {
        return (
          <View style={styles.slider_shelter_all}>
            <View style={styles.slider_shelter} style={{ width: `${shelter}` }} />
            <View style={styles.sliders} style={{ width: `${widths}` }} />
          </View>
        );
      }
      return (
        <View style={styles.slider} style={{ width: `${widths}` }} />
      );
    }
    
    
      renderbuttons=() => { // 截取片断
        // console.log(111,this.state.signstartTime)
        // console.log(111,this.state.signendTime)
        const { music } = this.props;
        if ((music.music.entities[music.music.selectid].bmt === 0 &&
             music.music.entities[music.music.selectid].emt === 0) &&
              (this.state.signstartTime === 0 && this.state.signendTime === 0)) {
          return (
            <View style={styles.intercept}>
              <View>
                <View style={styles.intercept_1}>
                  <View style={styles.intercept_start}>
                  <Image
                    source={img4}
                    onClick={this.signstart}
                  />
                  </View>
                  <Text style={styles.intercept_descript}>标记起点</Text>
                </View>
              </View>
              <View>
                <View style={styles.intercept_1}>
                  <View style={styles.intercept_start}>
                  <Image source={img8} />
                  </View>
                   <Text style={styles.intercept_descript}>清除</Text>
                </View>
              </View>
              <View>
                <View style={styles.intercept_1}>
                <View style={styles.intercept_start}>
                  <Image
                    source={img5}
                    onClick={this.signend}
                  />
                  </View>
                  <Text style={styles.intercept_descript}>标记终点</Text>
                </View>
              </View>
            </View>
          );
        } else if (this.state.signstartTime > 0 && this.state.signendTime === 0) {
          return (
            <View style={styles.intercept}>
              <View>
                <View style={styles.intercept_1}>
                  <View style={styles.intercept_start}>
                  <Image source={img6} />
                  </View>
                   <Text style={styles.intercept_descript}>标记起点</Text>
                </View>
              </View>
              <View>
                <View style={styles.intercept_1}>
                  <View style={styles.intercept_start}>
                  <Image
                    source={img9}
                    onClick={this.cleansign}
                  /> 
                  </View>
                  <Text style={styles.intercept_descript}>清除</Text>
                </View>
              </View>
              <View>
                <View style={styles.intercept_1}>
                  <View style={styles.intercept_start}>
                  <Image
                    source={img5}
                    onClick={this.signend}
                  /> 
                  </View>
                  <Text style={styles.intercept_descript}>标记终点</Text>
                </View>
              </View>
            </View>
          );
        }
    
        return (
          <View style={styles.intercept}>
            <View>
              <View style={styles.intercept_1}>
                <View style={styles.intercept_start}>
                <Image source={img6} />
                </View>
                 <Text style={styles.intercept_descript}>标记起点</Text>
              </View>
            </View>
            <View>
              <View style={styles.intercept_1}>
                <View style={styles.intercept_start}>
                <Image source={img9} onClick={this.cleansign} />
                </View>
                 <Text style={styles.intercept_descript}>清除</Text>
              </View>
            </View>
            <View>
              <View style={styles.intercept_1}>
                <View style={styles.intercept_start}>
                <Image source={img7} />
                </View>
                 <Text style={styles.intercept_descript}>标记终点</Text>
              </View>
            </View>
          </View>
        );
      }
    
        rendersign=() => {
          const { music } = this.props;
          const startTime = `${(this.state.signstartTime / this.state.alltime) * 0.7 * 100}%`;
          const endTime = `${(this.state.signendTime / this.state.alltime) * 0.7 * 100}%`;
          if (!(music.music.recommendresult.indexOf(music.music.selectid) + 1)) {
            const signstartTime = `${(music.music.entities[music.music.selectid].bmt / this.state.alltime) * 0.7 * 100}%`;
            const signendTime = `${(music.music.entities[music.music.selectid].emt / this.state.alltime) * 0.7 * 100}%`;
            if (this.state.signstartTime > 0 && this.state.signendTime === 0) {
              return (
                <Image source={img4} style={styles.startsign} style={{ left: `${startTime}` }} />
              );
            } else if (this.state.signendTime > 0) {
              return (
                <View>
                  <Image source={img4} style={styles.startsign} style={{ left: `${startTime}` }} />
                  <Image source={img5} style={styles.endsign} style={{ left: `${endTime}` }} />
                </View>
              );
            }// 渲染未确定的标记
            if (music.music.entities[music.music.selectid].bmt > 0 &&
                 music.music.entities[music.music.selectid].emt === 0) { // 只渲染起点标记
              return (
                <Image source={img4} style={styles.startsign} style={{ left: `${signstartTime}` }} />
              );
            } else if (music.music.entities[music.music.selectid].emt > 0) {
              return (
                <View>
                  <Image source={img4} style={styles.startsign} style={{ left: `${signstartTime}` }} />
                  <Image source={img5} style={styles.endsign} style={{ left: `${signendTime}` }} />
                </View>
              );
            }
            return null;
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
      left:70,
      bottom:20,
      width: 200,
      height: 150,
      marginTop:40,
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
      alignItems:"flex-end"
        // float: right;
    },
    ListenMusic_time:{
      alignItems:"center",
      textAlign: "center",
    },
    ListenMusic_play_all0:{
      flexDirection:"row",
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
