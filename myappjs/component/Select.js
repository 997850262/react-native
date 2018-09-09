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

let color1='red';
let color2='white';
export default class Select extends Component {
    constructor(props){
        super(props);
        this.state = {
            select:true,
            selectmore:false
        }
    }
    onselectone=()=>{
        color1='red';
        color2='white';
        this.setState(()=>{
            return {
                select:true,
                selectmore:false
            }
        });
    }
    onselectmore=()=>{
        color1='white';
        color2='red';
        this.setState(()=>{
            return {
                select:false,
                selectmore:true
            }
        });
    }
    renderselectbtn(){
        if(this.state.select==true){
            return styles.select_red
        }
        else{
            return styles.select_white
        }
    }
    renderselectmorebtn(){
        if(this.state.selectmore==true){
            return styles.select_red
        }
        else{
            return styles.select_white
        }
    }
    render(){
        return(
        <View style={styles.containerall}>
            <View style={styles.container}>
                <Text style={styles.select}>单选</Text>
                <TouchableWithoutFeedback onPress={this.onselectone}>
                    <View style={this.renderselectbtn()}/>
                    {/* <View style={select?styles.select_red:styles.select_white}/> */}
                    {/* <View style={`{styles.select_${color1}}`}/> */}
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.container}>
                <Text style={styles.select}>多选</Text>
                <TouchableWithoutFeedback onPress={this.onselectmore}>
                    <View style={this.renderselectmorebtn()}/>
                    {/* <View style={`styles.select_${color2}`} /> */}
                </TouchableWithoutFeedback>
            </View>
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
    container: {
    width:50,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection :'row',
    marginTop: 10
    },
    select: {
    marginLeft:20,
    },
    // selectone: {
    //     width:14,
    //     height:14,
    //     borderRadius:7,
    //     backgroundColor:color1,
    //     borderStyle: 'solid',
    //     borderColor: 'black',
    //     borderWidth:1
    // //   border: '1 solid black',
    // },
    // selectmore: {
    // width:14,
    // height:14,
    // borderRadius:7,
    // backgroundColor:color2,
    // borderStyle: 'solid',
    // borderColor: 'black',
    // borderWidth:1
    // },
    select_red: {
        width:14,
        height:14,
        borderRadius:7,
        backgroundColor:'red',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth:1
    },
    select_white: {
        width:14,
        height:14,
        borderRadius:7,
        backgroundColor:'white',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth:1
    }
  });
