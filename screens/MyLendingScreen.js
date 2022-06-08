import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyLendingScreen extends Component {
   constructor(){
     super()
     this.state = {
       lenderId : firebase.auth().currentUser.email,
       lenderName : "",
       allLendings : []
     }
     this.requestRef= null
   }

   static navigationOptions = { header: null };

   getLenderDetails=(lenderId)=>{
     db.collection("users").where("email_id","==", lenderId).get()
     .then((snapshot)=>{
       snapshot.forEach((doc) => {
         this.setState({
           "lenderName" : doc.data().first_name + " " + doc.data().last_name
         })
       });
     })
   }

   getAllLendings =()=>{
     this.requestRef = db.collection("all_lendings").where("lender_id" ,'==', this.state.lenderId)
     .onSnapshot((snapshot)=>{
       var allLendings = []
       snapshot.docs.map((doc) =>{
         var donation = doc.data()
         donation["doc_id"] = doc.id
         allLendings.push(donation)
       });
       this.setState({
         allLendings : allLendings
       });
     })
   }

   sendCamera=(cameraDetails)=>{
     if(cameraDetails.request_status === "Camera Sent"){
       var requestStatus = "Lender Interested"
       db.collection("all_lendings").doc(cameraDetails.doc_id).update({
         "request_status" : "Lender Interested"
       })
       this.sendNotification(cameraDetails,requestStatus)
     }
     else{
       var requestStatus = "Camera Sent"
       db.collection("all_lendings").doc(cameraDetails.doc_id).update({
         "request_status" : "Camera Sent"
       })
       this.sendNotification(cameraDetails,requestStatus)
     }
   }

   sendNotification=(cameraDetails,requestStatus)=>{
     var requestId = cameraDetails.request_id
     var lenderId = cameraDetails.lender_id
     db.collection("all_notifications")
     .where("request_id","==", requestId)
     .where("lender_id","==",lenderId)
     .get()
     .then((snapshot)=>{
       snapshot.forEach((doc) => {
         var message = ""
         if(requestStatus === "Camera Sent"){
           message = this.state.lenderName + " sent you camera"
         }else{
            message =  this.state.lenderName  + " has shown interest in donating the camera"
         }
         db.collection("all_notifications").doc(doc.id).update({
           "message": message,
           "notification_status" : "unread",
           "date"                : firebase.firestore.FieldValue.serverTimestamp()
         })
       });
     })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item.camera_name}
       subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
       leftElement={<Icon name="camera" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor : item.request_status === "Camera Sent" ? "green" : "#ff5722"
              }
            ]}
            onPress = {()=>{
              this.sendCamera(item)
            }}
           >
             <Text style={{color:'#ffff'}}>{
               item.request_status === "Camera Sent" ? "Camera Sent" : "Send Camera"
             }</Text>
           </TouchableOpacity>
         }
       bottomDivider
     />
   )


   componentDidMount(){
     this.getLenderDetails(this.state.lenderId)
     this.getAllLendings()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Lendings"/>
         <View style={{flex:1}}>
           {
             this.state.allLendings.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all Camera Lendings</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allLendings}
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
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})
