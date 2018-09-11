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
const img =require('../source/select_music.png');
export default class MyMusic extends Component {
    handleselect=(item)=>{
        const{todoActions,select}=this.props;
        const id=item.id;
        if(select===true){
            todoActions.selectid(id)
        }
        else{
            todoActions.selectmoreid(id);
        }
    }
    handlemoreselect=item => {
        const { todoActions } = this.props;
        const id = item.id;
        todoActions.selectmoreid(id);
      }
    renderselectmusic=(item)=>{
        const{music,select }=this.props
        console.log(159)
        if(select === true &&item.id==music.music.selectid){
            console.log(951)
            return(
                <View style={styles.selectone}>
                    <Image style={{width:30,height:20}} source={img}/>
                </View>
            )
        }
}
rendermoreselectmusic=(item)=>{
    const{music,select }=this.props
    if(select==false){
        if (music.music.selectmoreid.indexOf(item.id) + 1){
            console.log(music.music.selectmoreid.indexOf(item.id)+1)
                return(
                    <View style={styles.moreselect} onPress={() => this.handlemoreselect(item)}>
                        <Text style={styles.moreselectnum}>{music.music.selectmoreid.indexOf(item.id)+1}</Text>
                    </View>
                )
        }
        else{
            return(
                <View style={styles.moreselect_white} onPress={() => this.handlemoreselect(item)}></View>
            ) 
        }
    }
}
    render(){
        const{music}=this.props;
        const mymusic =[]
        const recommendmusic=[]
        if(music.music.result!=undefined){
             music.music.result.map(Item=>{
                mymusic.push(music.music.entities[Item])
                return {...mymusic}
           }) 
        }
        if(music.music.recommendresult!=undefined){
            music.music.recommendresult.map(Item=>{
                recommendmusic.push(music.music.entities[Item])
               return {...recommendmusic}
          }) 
       }
        return(
            <ScrollView>
                <View style={styles.musiccontainer}>
                    <Text style={styles.welcome}>我的音乐</Text>
                    <FlatList
                    data={mymusic}
                    renderItem={({item}) =>
                    <View>
                    {this.rendermoreselectmusic(item)}
                    {this.renderselectmusic(item)}
                    <Text style={styles.music} onPress={()=>this.handleselect(item)}>
                    {item.name}
                    </Text>
                    </View>
                    }
                    />
                    <Text style={styles.welcome}>推荐音乐</Text>
                    <FlatList 
                    data={recommendmusic}
                    renderItem={({item}) => 
                    <View>
                    {this.rendermoreselectmusic(item)}
                    {this.renderselectmusic(item)}
                    <Text style={styles.music} onPress={()=>this.handleselect(item)}>
                    {item.name}
                    </Text>
                    </View>
                    }
                    />
                </View>
                </ScrollView>
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
        paddingLeft:10,
        marginBottom:100
      },
      welcome: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: 'left',
        margin: 10,
      },
      music: {
        fontSize: 20,
        marginTop:10,
        marginLeft:40,
        borderStyle: 'solid',
        borderBottomColor: 'black',
        borderBottomWidth:1
      },
      selectone:{
        position:"absolute",
        width:30,
        height:20,
        marginTop:10
      },
      moreselect:{
        position:"absolute",
        width: 20,
        height: 20,
        borderRadius:10,
        backgroundColor: "red",
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth:1,
        marginTop: 15,
        marginLeft:10
    },
    moreselect_white:{
        position:"absolute",
        width: 20,
        height: 20,
        borderRadius:10,
        backgroundColor: "white",
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth:1,
        marginTop: 15,
        marginLeft:10
    },
    list_all:{
        display: "flex",
        position: "relative",
    },
    number:{
        paddingLeft: 5,
    },
    MyMusic_list_all:{
        // textIndent:30,
        marginTop: 10,
        width: 350,
        borderStyle: 'solid',
        borderBottomColor: '#ccc',
        borderBottomWidth:1
    },
    moreselectnum: {
        marginLeft:4
    }
  });
