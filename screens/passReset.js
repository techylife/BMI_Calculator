import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import {Icon, Header} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import firebase from 'firebase';
import db from '../config'

export default class PassResetMail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email:''
        }
    }

    sendMail = ()=>{
        firebase.auth().sendPasswordResetEmail(this.state.email).then(()=>{
            alert("Check your email for the password reset link.")
            this.props.navigation.navigate('Auth')
        })
        .catch(error=>{
            alert(error.message)
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Password reset</Text>
                <ScrollView>
                    <TextInput keyboardType={'email-address'} style={styles.input} placeholder={"Email"} onChangeText={text=>{this.setState({email:text})}}/>
                    <Text style={styles.navToAuth} onPress={()=>{this.props.navigation.navigate('Auth')}}>Back to Login</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>this.sendMail()}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </ScrollView>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
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
    title:{
        fontSize:45,
        fontWeight:'bold',
        fontFamily:'sans-serif',
        color:'#0089CD',
        textAlign:'center',
        paddingVertical:50,
        marginTop:50
    },
    button:{
        backgroundColor:'#0089CD',
        borderRadius:50,
        alignSelf:'center',
        margin:100
    },
    buttonText:{
        color:'white',
        fontSize:22,
        fontFamily:'sans-serif',
        textAlign:'center',
        paddingHorizontal:50,
        paddingVertical:20,
    },
    navToAuth:{
        color:'lightblue',
        fontSize:14,
        fontFamily:'sans-serif',
        margin:15,
    },
})