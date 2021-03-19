import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';


const MyHeader = props => {
  return (
    <View>
      
        <Header      
        leftComponent={<Icon name='home' type='font-awesome-5' color='#696969' style={{alignSelf:'flex-start'}} onPress={()=>{this.props.navigation.navigate('BottomTab')}}/>}
        centerComponent={{ text: "BMI App", style: { color: '#ffffff', fontSize:20,fontWeight:"bold" } }}    
        rightComponent={<Icon name='account-circle'type='material-icons' onPress={()=>{this.props.navigation.navigate('BottomTab')}}/>}
        style={{backgroundColor:"#00A8FF", flex:1, marginBottom:50}}
        />
     
      
    </View>
    
  );
};

 

export default MyHeader;
