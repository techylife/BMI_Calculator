import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import {Icon, Header} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import firebase from 'firebase';
import db from '../config'

export default class Details extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      bmi : this.props.navigation.getParam('details')["bmi"],
      weight : this.props.navigation.getParam('details')["weight"],
      height : this.props.navigation.getParam('details')["height"],
      stat:this.props.navigation.getParam('details')["status"],
      sentence:this.props.navigation.getParam('details')["sentence"],
      date:this.props.navigation.getParam('details')["date"],
      age:this.props.navigation.getParam('details')["age"],
      id:this.props.navigation.getParam('details')["id"],
    }
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
        <Text style={styles.recTitle}>Your BMI record of {this.state.date}</Text>
        <ScrollView>
          <View style={styles.heroContainer}>        
            <Text style={styles.heroText}>Weight : {this.state.weight}</Text>
            <Text style={styles.heroText}>Height : {this.state.height}</Text>
            <Text style={styles.heroText}>Age : {this.state.age}</Text>
            <Text style={styles.heroText}>BMI : {this.state.bmi}</Text>
          </View>
          <Text style={styles.suggestionTitle}>Suggestion</Text>
          <View style={styles.suggestionContainer}>
            <Text style={styles.suggestionText}>You were {this.state.stat}</Text>
            <Text style={styles.suggestionText}>{this.state.sentence}</Text>
          </View>
        </ScrollView>
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  heroContainer: {
    backgroundColor:'#8EF7FF',
    borderRadius:20,
    width:450,
    alignSelf: 'center',
    paddingHorizontal:50,
    paddingVertical:30,
  },
  heroText: {
    color:'#0F739B',
    fontSize:22,
    fontWeight:'bold',
    fontFamily:'sans-serif',
    textAlign:'left',
    paddingVertical:10
  },
  recTitle:{
    fontSize:30,
    fontWeight:'bold',
    fontFamily:'sans-serif',
    color:'#22A2D8',
    textAlign:'center',
    padding:50
  },
  suggestionTitle:{
    fontSize:26,
    fontWeight:'bold',
    fontFamily:'sans-serif',
    color:'#22A2D8',
    textAlign:'center',
    padding:50,
    marginTop:100
  },
  suggestionContainer:{
    backgroundColor:'#8EF7FF',
    borderRadius:20,
    width:450,
    alignSelf: 'center',
    paddingHorizontal:50,
    paddingVertical:30,
  },
  suggestionText:{
    color:'#0F739B',
    fontSize:18,
    fontWeight:'bold',
    fontFamily:'sans-serif',
    textAlign:'left',
    paddingVertical:10
  },
  delButton:{
    alignSelf: 'center',
    backgroundColor:'red',
    borderRadius:15,
    paddingHorizontal:30,
    paddingVertical:10,
    margin:20,
    display:'flex',
    flexDirection:'row'
  },
  delButtonText:{
    color:'white',
    fontSize:18,
  },
  backButton:{
    paddingVertical:10,
    paddingHorizontal:30,
    backgroundColor:'#22A2D8',
    borderRadius:15,
    width:100,
    margin:20
  },
  backButtonText:{
    color:'white',
    textAlign:'center',
  }
})