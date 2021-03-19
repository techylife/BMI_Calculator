import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {Icon} from 'react-native-elements'
import Calculator from './screens/calculator'
import AuthScreen from './screens/authScreen'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomePage from './screens/homePage.js'
import Details from './screens/detailScreen.js'
import SignUp from './screens/signup'
import Profile from './screens/profile'
import ChangePass from './screens/changePass'
import PassResetMail from './screens/passReset'


export default class App extends React.Component {
  
  render(){
    return (
      <View style={styles.container}>
        <AppContainer/>
      </View>
    );
  }
}



const BottomTab = createBottomTabNavigator({
  Home :{
    screen: HomePage,
    navigationOptions:{
      tabBarIcon:<Icon name="home" type="antdesign" color='#2BB9E3'/>
    }
  },
  Calculator:{
    screen : Calculator,
    navigationOptions:{
      tabBarIcon:<Icon name="calculator" type="antdesign" color='#2BB9E3'/>
    }
  }
})

const SwitchNav = createSwitchNavigator({
  Auth:{
    screen: AuthScreen
  },
  SignUp:{
    screen: SignUp
  },
  BottomTab:{
    screen:BottomTab
  },
  Details:{
    screen: Details
  },
  Profile:{
    screen: Profile
  },
  ChangePass:{
    screen: ChangePass
  },
  PassReset:{
    screen:PassResetMail
  }
})

const AppContainer = createAppContainer(SwitchNav)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
