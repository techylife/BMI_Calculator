import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import {Icon, Header} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import firebase from 'firebase';
import db from '../config'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            user:firebase.auth().currentUser,
        }
        var email = this.state.user.email
        db.collection('users').doc(email).get()
        .then(doc =>{
            this.setState({name:doc.data().name})
        })
    }

    deleteUser = ()=>{
        var user = this.state.user
        user.delete().then(()=>{
            alert("Successfully deleted your account.")
            this.props.navigation.navigate('Auth')
        })
        .catch(error => {
            alert(error.message)
        })
    }

    logout = ()=>{
        firebase.auth().signOut().then(()=>{alert("You have been logged out.");this.props.navigation.navigate('Auth')}).catch(error =>{alert(error.message)})
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
                <ScrollView>
                    <Text style={styles.header}>Hi, {this.state.name}</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('ChangePass')}}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{this.deleteUser()}}>
                        <Text style={styles.buttonText}>Delete my account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{this.logout()}}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        color:'#0F739B',
        fontSize:28,
        fontFamily:'sans-serif',
        fontWeight:'bold',
        textAlign:'center',
        margin:30
    },
    button:{
        backgroundColor:'#22A2D8',
        paddingHorizontal:30,
        paddingVertical:10,
        borderRadius:20,
        alignSelf:'center',
        margin:50
    },
    buttonText:{
        color:'white',
        fontSize:18,
        fontFamily:'sans-serif',
        textAlign:'center',
        fontWeight:'bold',
    }
})