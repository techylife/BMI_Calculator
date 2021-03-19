import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import {Icon, Header} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import firebase from 'firebase';
import db from '../config'

export default class ChangePass extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            user:firebase.auth().currentUser,
            newPass:'',
            confNewPass:'',
        }
    }

    changePass = () => {
        this.state.newPass === this.state.confNewPass
        ?
        this.state.user.updatePassword(this.state.newPass)
        .then(()=>{
            alert("Password changed successfully")
            this.props.navigation.navigate('Auth')
        })
        .catch(err =>{
            alert(err.message)
        })
        :alert("The passwords didn't match.")
    }

    render(){
        return(
            <View style={styles.container}>
                <Header      
                    leftComponent={<Icon name='home' type='font-awesome-5' color='#2BB9E3' style={{alignSelf:'flex-start'}} onPress={()=>{this.props.navigation.navigate('BottomTab')}}/>}
                    centerComponent={{ text: "BMI App", style: { color: '#ffffff', fontSize:20,fontWeight:"bold" } }}    
                    rightComponent={<Icon name='account-circle'type='material-icons' color='#2BB9E3' onPress={()=>{this.props.navigation.navigate('Profile')}}/>}
                    style={{backgroundColor:'#33E5CC', flex:1, marginBottom:50}}
                />
                <Text style={styles.title}>Change Pass</Text>
                <TextInput secureTextEntry={true} style={styles.input} placeholder={"New Password"} onChangeText={text=>{this.setState({newPass:text})}}/>
                <TextInput secureTextEntry={true} style={styles.input} placeholder={"Confirm New Password"} onChangeText={text=>{this.setState({confNewPass:text})}}/>
                <TouchableOpacity style={styles.button} onPress={()=>this.changePass()}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
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
        color:'#0F739B',
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
})