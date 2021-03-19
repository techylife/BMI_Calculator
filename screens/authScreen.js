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


export default class AuthScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      email:'',
      pass:'',
      name:'',
      age:'',
      confirmPassword:'',
      isModalVisible:'false',
    }
  }

  loginUser = ()=>{
    var email = this.state.email;
    var password = this.state.pass;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      this.props.navigation.navigate('Home')
    })
    .catch(error=>{
      alert(error.message)
    })
  }

  createUser = ()=>{
    var email = this.state.email
    var password = this.state.password
    var name = this.state.name
    var confirmPassword = this.state.confirmPassword
    var age = this.state.age
    confirmPassword === password
    ?
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      db.collection('users').add({
        name: name,
        age: age,
        email: email,
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

  sendPassResetMail = ()=>{

  }

  render(){
     return(
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.authContainer}>
            <ScrollView>
              <TextInput keyboardType={'email-address'} style={styles.input} placeholder="Email" onChangeText={text=>{this.setState({email: text})}}/>
              <TextInput secureTextEntry={true} style={styles.input}placeholder="Password" onChangeText={text=>{this.setState({pass: text})}}/>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.navToSignUp} onPress={()=>{this.props.navigation.navigate('SignUp')}}>Not a member? Sign Up</Text>
                <Text style={styles.forgotPass} onPress={()=>{this.props.navigation.navigate('PassReset')}}>Forgot password?</Text>
              </View>            
              <TouchableOpacity style={styles.button}onPress={()=>{this.loginUser()}}>
                <Text style={styles.buttonText}>Login</Text>
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
    marginTop:100
  },
  buttonText:{
    color:'white',
    fontSize:22,
    fontWeight:'bold',
    fontFamily:'sans-serif',
    textAlign:'center',
    paddingHorizontal:50,
    paddingVertical:20,
  },
  navToSignUp:{
    color:'lightblue',
    fontSize:14,
    fontFamily:'sans-serif',
    margin:15,
  },
  forgotPass:{
    color:'lightblue',
    fontSize:14,
    fontFamily:'sans-serif',
    margin:15,
    alignSelf:'flex-end'
  }
})