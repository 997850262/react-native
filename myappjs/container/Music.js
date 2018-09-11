import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActionCreators from '../actions/index';
import Select from '../component/Select';
import MyMusic from '../component/MyMusic';
import Footer from '../component/Footer';
import ListenMusic from '../component/ListenMusic';
import Delect from '../component/Delect';
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
  navigation,
  Modal
} from 'react-native';


class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: true,
      isAcitve: false,
      ispart: 0,
      modalVisible: false
    };
  }
  componentDidMount(){
    const { todoActions } = this.props;
    const token='test181153814';
    const tpl_id='100022';
    const limit='30';
    const offset='0';
    todoActions.fetchmymusic(token,limit,offset);
    todoActions.fetchrecommendmusic(token,tpl_id);
  }
  onCancel=() => {
    this.setState({
      isAcitve: false,
      modalVisible: false
    });
  }
  ondelect=(visible) => {
    this.setState({
      isAcitve: true,
      modalVisible: visible,
      ispart: 4
    });
  }
  handleplay=(visible) => {
    this.setState({
      isAcitve: true,
      modalVisible: visible,
      ispart: 0
    });
  }
  handlepart=(visible) => {
    this.setState({
      isAcitve: true,
      modalVisible: visible,
      ispart: 2
    });
  }
  handlerename=(visible) => {
    this.setState({
      isAcitve: true,
      modalVisible: visible,
      ispart: 1
    });
  }
  handlemoreselect=() => {
    const { todoActions } = this.props;
    this.setState({
      select: false
    });
    todoActions.onmoreselect();
  }
  handleselect=() => {
    const { todoActions } = this.props;
    this.setState({
      select: true
    });
    todoActions.onselect();
  }

  render() {
    // const navigate = this.props.navigation;
    const{music,todoActions}=this.props;
    return (
  <View style={styles.container_all} >
    <Modal 
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      // transparent={false}
    >
      <Delect
        style={styles.delectview}
        music={music}
        select={this.state.select}
        todoActions={todoActions}
        isAcitve={this.state.isAcitve}
        onCancel={this.onCancel}
        ispart={this.state.ispart}
      />
      <ListenMusic
        isAcitve={this.state.isAcitve}
        todoActions={todoActions}
        music={music}
        onCancel={this.onCancel}
        ispart={this.state.ispart}
      />
    </Modal>
        <View style={styles.select_all}>
          <Select 
            todoActions={todoActions}             
            handleselect={this.handleselect}
            music={music}
            handlemoreselect={this.handlemoreselect}
            select={this.state.select}
          />
        </View>
      <ScrollView style={styles.scrollView}>
        <MyMusic music={music} todoActions={todoActions} select={this.state.select}/>
      </ScrollView>
        <View style={styles.footer_all}>
        <Footer style={styles.footer}             
          music={music}
          todoActions={todoActions}
          select={this.state.select}
          handleplay={this.handleplay}
          ispart={this.state.ispart}
          handlepart={this.handlepart}
          handlerename={this.handlerename}
          isAcitve={this.state.isAcitve}
          ondelect={this.ondelect}
        />
        </View>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  // test1:{
  //   backgroundColor:"yellow",
  //   opacity:0.5
  // },
  // test2:{
  //   marginTop:100,
  //   backgroundColor:"blue",
  //   opacity:0.3
  // },
  container_all: {
    height:"100%",
    width:"100%",
  },
  delectview: {
    height:"100%",
    width:"100%",
  },
  select_all: {
    position:"relative",
    height:50,
    width:"100%",
  },
  scrollView: {
    position:"relative"
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button: {
    marginBottom: 30,
    width: 300,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  footer_all: {
    position:"absolute",
    bottom:0,
    left:0,
    zIndex:100
  },
  footer: {
  // height:80,
  // width:350,
  // justifyContent:'center',
  // alignItems:'center',
  // position:'absolute',
  }
});

const mapStateToProps=(state)=> {
  const {
    music
  } = state;
  console.log('容器', music);
  return {
     music
  };
}

const mapDispatchToProps=(dispatch)=> {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Music);