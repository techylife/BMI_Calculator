import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList, ScrollView } from 'react-native';
import {Header, ListItem, Icon} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import db from '../config'
import firebase from 'firebase';


export default class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email:firebase.auth().currentUser.email,
            recordsList:[],
        }
    }

    getData = ()=>{
        db.collection('records').where("email","==",this.state.email)
        .onSnapshot(snapshot=>{
            var records = snapshot.docs.map(doc => doc.data());
            this.setState({recordsList: records})
        })
    }

    componentDidMount(){
        this.getData()
    }

    renderItems =({item, i})=>{
        return(
            <ListItem
                key = {i}
                title = {"BMI : "+item.bmi}
                subtitle= {"Calculated on : "+item.date}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity style={styles.viewButton} onPress={()=>{this.props.navigation.navigate('Details',{'details':item})}}>
                        <Text style={styles.buttonText}>Details</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }
    
    render() {
        return(
              <View style={styles.container}>
                <Header      
                    leftComponent={<Icon name='home' type='font-awesome-5' color='#2BB9E3' style={{alignSelf:'flex-start'}} onPress={()=>{this.props.navigation.navigate('BottomTab')}}/>}
                    centerComponent={{ text: "BMI App", style: { color: '#ffffff', fontSize:20,fontWeight:"bold" } }}    
                    rightComponent={<Icon name='account-circle'type='material-icons' color='#2BB9E3' onPress={()=>{this.props.navigation.navigate('Profile')}}/>}
                    style={{backgroundColor:'#33E5CC', flex:1, marginBottom:50}}
                />

                  <ScrollView>
                      {
                          this.state.recordsList.length === 0
                          ?
                          <Text style={styles.text}>You don't have any records till now.</Text>
                          :<FlatList
                          keyExtractor={this.keyExtractor}
                          data={this.state.recordsList}
                          renderItem={this.renderItems}
                  />
                      }
                    
                  </ScrollView>
                  
              </View>             
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    viewButton: {
        paddingVertical:10,
        paddingHorizontal:30,
        backgroundColor:'#22A2D8',
        borderRadius:15,
    },
    buttonText:{
        color:'white'
    },
    text:{
        textAlign:'center',
        marginTop:200,
        fontSize:24,
        fontFamily:'sans-serif'
    }
})
