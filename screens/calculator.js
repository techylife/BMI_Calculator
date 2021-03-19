import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView} from 'react-native';
import {Icon, Header } from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import firebase from 'firebase';
import db from '../config'

export default class Calculator extends React.Component {
  constructor(props) {
    
    super(props);
    // var date = new Date.getDate();
    // var month = new Date.getMonth()+1;
    // var yr = new Date.getFullYear();
    this.state = {
      email : firebase.auth().currentUser.email,
      weight : 0,
      height : 0,
      bmi:0,
      date:this.getCurrentDate(),
      age:0,
      stat:'',
      sentence:"",
      timestamp:new Date().getTime()
    }
  }

  getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var timestamp =new Date().getTime();
    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
  }  

  calculate = () =>{
    var height_in_metre = this.state.height/100;
    console.log(height_in_metre)
    var height_squared = height_in_metre*height_in_metre;
    console.log(height_squared)
    var bmi = this.state.weight/height_squared;
    var rounded = Math.round(bmi)
    console.log(rounded)
    this.uploadData(rounded)
  }

  uploadData = (bmi)=>{
    
    console.log(this.state.age)
    db.collection('records').add({
      weight:this.state.weight,
      height:this.state.height,
      age:this.state.age,
      bmi:bmi,
      date: this.state.date,
      email:this.state.email,
      timestamp:this.state.timestamp
    })
    .then(doc=>{
      this.showResult(bmi,doc.id)
    })
    .catch(error=>{
      alert(error.message)
    })
  }

  updateSuggestions = (id)=>{
    db.collection('records').doc(id).update({
      status:this.state.stat,
      sentence:this.state.sentence,
    })
    .then(doc=>{
      alert("You are "+this.state.stat+"\n"+this.state.sentence)
      this.props.navigation.navigate('Home')
    })
    .catch(error=>{
      alert(error.message)
    })
  }

  showResult= (bmi, id)=>{
    var resultText; 
    if(bmi<=19){
      this.setState({stat:'underweight'})
    }else if(bmi>19&& bmi<=25){
      this.setState({stat:'normal'})
    }else if(bmi>25 && bmi<=29){
      this.setState({stat:'overweight'})
    }else if(bmi>29 && bmi<=40){
      this.setState({stat:'obese'})
    }else if(bmi>40){
      this.setState({stat:'exobese'})
    }else{
      this.setState({stat:'N.A.'})
    }
    resultText = "You are "+this.state.stat
    var sentence = this.getSentence()
    this.setState({sentence: sentence})
    alert(resultText+"\n"+sentence)
    this.updateSuggestions(id);
  }

  getSentence = ()=>{
    var stat = this.state.stat
    var age = this.state.age
    console.log(stat, age)
    var sentence;
    if(stat==='underweight'){
      sentence = "You need to increase your weight."
    }else if(stat==='normal'){
      sentence = "You are all normal,no need to worry."
    }else if(stat==='overweight'){
      if(age<25&&age>10){
        sentence = "You need to increase your height."
      }else{
        sentence = "You need to decrease your weight."
      }
    }else if(stat==='obese'){
      if(age<25&&age>15){
        sentence = "You need to increase your height."
      }else{
        sentence = "You need to decrease your weight."
      }
    }else if(stat==='exobese'){
      sentence = "You should start decreasing your weight as well as increase your height."
    }else{
      sentence = "N.A."
    }
    return sentence;
  }

  render(){
    return (
      <View style={styles.container}>
        <Header      
                    leftComponent={<Icon name='home' type='font-awesome-5' color='#2BB9E3' style={{alignSelf:'flex-start'}} onPress={()=>{this.props.navigation.navigate('BottomTab')}}/>}
                    centerComponent={{ text: "BMI App", style: { color: '#ffffff', fontSize:20,fontWeight:"bold" } }}    
                    rightComponent={<Icon name='account-circle'type='material-icons' color='#2BB9E3' onPress={()=>{this.props.navigation.navigate('Profile')}}/>}
                    style={{backgroundColor:'#33E5CC', flex:1, marginBottom:50}}
                />

        <Text style={styles.header}>Calculator</Text>
        <ScrollView>
          <TextInput keyboardType={'numeric'} style={styles.input} placeholder="Your weight (in kg)" onChangeText={text=>{this.setState({weight:text})}}/>
          <TextInput keyboardType={'numeric'} style={styles.input} placeholder="Your height (in centimetres)" onChangeText={text=>{this.setState({height:text})}}/>
          <TextInput keyboardType={'numeric'} style={styles.input} placeholder="Your age" onChangeText={text=>{this.setState({age:text})}}/>
          <TouchableOpacity style={styles.calButton} onPress={()=>{this.calculate()}}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  input:{
    borderColor:'#55C4E7',
    borderWidth:5,
    paddingVertical:5,
    paddingHorizontal:15,
    marginVertical:20,
    marginHorizontal:50,
    borderRadius:15
  },
  header:{
    color:'#00A8FF',
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold',
    marginVertical:50
  },
  calButton:{
    alignSelf:'center',
    backgroundColor:'#00A8FF',
    paddingHorizontal:50,
    paddingVertical:20,
    borderRadius:50,
    marginVertical:60
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:18
  }
})