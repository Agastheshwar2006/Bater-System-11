import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class MyReceivedCamerasScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      receivedCamerasList : []
    }
  this.requestRef= null
  }

  getReceivedCamerasList =()=>{
    this.requestRef = db.collection("requested_cameras")
    .where('user_id','==',this.state.userId)
    .where("camera_status", '==','received')
    .onSnapshot((snapshot)=>{
      var receivedCamerasList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        receivedCamerasList : receivedCamerasList
      });
    })
  }

  componentDidMount(){
    this.getReceivedCamerasList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    console.log(item.camera_name);
    return (
      <ListItem
        key={i}
        title={item.camera_name}
        subtitle={item.cameraStatus}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Received Cameras" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.receivedCamerasList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Received Cameras</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.receivedCamerasList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#6fc0b8",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
