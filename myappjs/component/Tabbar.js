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

// let color1 = 'red';
// let color2 = 'black';
// let color3 = 'black';
// let linecolor1 = 'red';
// let linecolor2 = 'white';
// let linecolor3 = 'white';

export default class Tabbar extends Component {
    // setcolor=() => {
    //     color1 = 'red';
    //     color2 = 'black';
    //     color3 = 'black';
    //     linecolor1 = 'red';
    //     linecolor2 = 'white';
    //     linecolor3 = 'white';
    //   }
    //   setcolor2=() => {
    //     color1 = 'black';
    //     color2 = 'red';
    //     color3 = 'black';
    //     linecolor1 = 'white';
    //     linecolor2 = 'red';
    //     linecolor3 = 'white';
    //   }
    //   setcolor3=() => {
    //     color1 = 'black';
    //     color2 = 'black';
    //     color3 = 'red';
    //     linecolor1 = 'white';
    //     linecolor2 = 'white';
    //     linecolor3 = 'red';
    //   }

    render(){
        // const navigate = this.props.navigation;
        return(
        <View>
            <View style={styles.Tabbar_all}>
                <View
                    style={styles.Tabbar_1}
                    // style={{ color: `${color1}`, borderBottom: `1px solid ${linecolor1}` }}
                    onClick={this.setcolor}
                    >
                    {/* <Text>我的音乐</Text> */}
                    <Button
                    onPress={() => this.props.navigation.navigate('Music')}
                    // onPress={() => navigate.push('Music')}
                    title='我的音乐'/>
                </View>
                <View
                    style={styles.Tabbar_2}
                    // style={{ color: `${color2}`, borderBottom: `1px solid ${linecolor2}` }}
                    onClick={this.setcolor2}
                    >
                    {/* <Text>搜索音乐</Text> */}
                    <Button
                    onPress={() => this.props.navigation.navigate('SearchMusic')}
                    // onPress={() => navigate.push('SearchMusic')}
                    title='搜索音乐'/>
                </View>
                <View
                    style={styles.Tabbar_3}
                    // style={{ color: `${color3}`, borderBottom: `1px solid ${linecolor3}` }}
                    onClick={this.setcolor3}
                    >
                    {/* <Text>上传音乐</Text> */}
                    <Button
                    onPress={() => this.props.navigation.navigate('UploadMusic')}
                    // onPress={() => navigate.push('UploadMusic')}
                    title='上传音乐'/>
                </View>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    Tabbar_all: {
        display: 'flex',
        justifyContent:'space-around',
        flexDirection: 'row',
        height: 28,
    },
    Tabbar_1: {
        fontSize: 20,
        // display: 'block',
    },
    Tabbar_2: {
        fontSize: 20,
    },
    Tabbar_3: {
        fontSize: 20,
    },
    a: {
        // textDecoration: 'none',
    }
    
  });
