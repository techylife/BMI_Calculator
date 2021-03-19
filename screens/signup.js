import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView } from 'react-native';
import {Header} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import db from '../config';
import firebase from 'firebase';


export default class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      email:'',
      pass:'',
      name:'',
      confirmPassword:'',
    }
  }
  createUser = ()=>{
    var email = this.state.email
    var password = this.state.pass
    var name = this.state.name
    var confirmPassword = this.state.confirmPassword
    confirmPassword === password
    ?
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      db.collection('users').doc(email).set({
        name: name,
      })
      .then(()=>{
        this.props.navigation.navigate('Home')
      })
      .catch(error=>{
        alert(error.message)
      })
    })
    .catch(error=>{
      alert(error.message)
    })
    :alert("The passwords didn't match.")
  }
  
  render(){
     return(
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.authContainer}>
            <ScrollView>
              <TextInput style={styles.input} placeholder="Name" onChangeText={text=>{this.setState({name: text})}}/>
              <TextInput keyboardType={'email-address'} style={styles.input} placeholder="Email" onChangeText={text=>{this.setState({email: text})}}/>
              <TextInput secureTextEntry={true} style={styles.input}placeholder="Password" onChangeText={text=>{this.setState({pass: text})}}/>
              <TextInput secureTextEntry={true} style={styles.input}placeholder="Confirm password" onChangeText={text=>{this.setState({confirmPassword: text})}}/>
              <Text style={styles.navToLogin} onPress={()=>{this.props.navigation.navigate('Auth')}}>Already a member? Login</Text>
              <TouchableOpacity style={styles.button}onPress={()=>{this.createUser()}}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </ScrollView>
            
          </View>
        </View>
     )
   }
}
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  title:{
    fontSize:45,
    fontWeight:'bold',
    fontFamily:'sans-serif',
    color:'#0089CD',
    textAlign:'center',
    paddingVertical:50,
    marginTop:50
  },
  authContainer:{
    padding:50
  },
  input:{
    paddingHorizontal:15,
    paddingVertical:10,
    borderWidth:5,
    borderColor:'#55C4E7',
    fontFamily:'sans-serif',
    borderRadius:20,
    margin:10
  },
  button:{
    backgroundColor:'#0089CD',
    borderRadius:50,
    alignSelf:'center',
    margin:25
  },
  buttonText:{
    color:'white',
    fontSize:22,
    fontFamily:'sans-serif',
    textAlign:'center',
    paddingHorizontal:50,
    paddingVertical:20,
  },
  navToLogin:{
    color:'lightblue',
    fontSize:14,
    fontFamily:'sans-serif',
    margin:15
  }
})