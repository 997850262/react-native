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
let select = true;
let selectmore = false;
export default class Select extends Component {
    onselectone(){
        Alert.alert('单选');
        color1='red';
        color2='white';
        select = true;
        selectmore = false;
    }
    onselectmore(){
        Alert.alert('多选');
        color1='white';
        color2='red';
        select = false;
        selectmore = true;
        // Alert.alert(color1,color2);
    }

    render(){
        return(
        <View style={styles.containerall}>
            <View style={styles.container}>
                <Text style={styles.select}>单选</Text>
                <TouchableWithoutFeedback onPress={this.onselectone}>
                    <View style={styles.selectone}/>
                    {/* <View style={`{styles.select_${color1}}`}/> */}
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.container}>
                <Text style={styles.select}>多选</Text>
                <TouchableWithoutFeedback onPress={this.onselectmore}>
                    <View style={styles.selectmore}/>
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
    selectone: {
        width:14,
        height:14,
        borderRadius:7,
        backgroundColor:color1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth:1
    //   border: '1 solid black',
    },
    selectmore: {
    width:14,
    height:14,
    borderRadius:7,
    backgroundColor:color2,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth:1
    },
    select_red: {
    width:14,
    height:14,
    borderRadius:7,
    backgroundColor:'red',
    },
    select_white: {
        width:14,
        height:14,
        borderRadius:7,
        backgroundColor:'white',
    }
  });
