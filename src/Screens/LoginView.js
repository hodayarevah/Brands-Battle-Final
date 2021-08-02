import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, StyleSheet, View } from "react-native";
//import { Text } from 'react-native-paper'
<<<<<<< HEAD
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { Item, Text } from 'native-base';
import { theme } from '../core/theme'
import { ThemeContext ,navigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ThemeConsumer } from 'react-native-elements';
=======
import Background from "../components/BackgroundLogin";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { Item, Text } from "native-base";
import { theme } from "../core/theme";
import { ThemeContext, navigation } from "react-navigation";
import myurl from "./Url";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, ThemeConsumer } from "react-native-elements";
>>>>>>> game
import myUrl from "./Url";
import * as Localization from "expo-localization";
import color from "color";
export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      UserMail:"",
      UserName:"",
      UserPass:"",
      UserId:"",
      UserPoints:0,

    };
  }
 
  SubmitNote = async() =>{
 let  Mail=this.state.UserMail;
 let pass=this.state.UserPass ;
  if((Mail === '')||(pass === ''))
   {
        alert("Please insert info!")
    }
    else{
     // this.props.navigation.navigate('UserHome',{UserId:this.state.UserId,pointsU:this.state.pointsU,stageU:this.state.stageU,UserName:this.state.UserName,imgU:this.state.imgU});
    
     const url = `http://172.20.10.2:44365/api/Users`
      const userf =await fetch(url, {
          method: 'Put',
          body:   JSON.stringify([Mail, pass]),
          headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
          })
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
        const res= await userf.json()
          if(res.UserName != null)
            {
             this.props.navigation.navigate('UserHome',{UserId:res.Id,UserPoints:res.Points,UserName:res.UserName});
           };
          
    
    }
    
  }

=======
      UserMail: "hodaya@gmail.com",
      UserName: "",
      UserPass: "2021",
      UserId: "",
      UserPoints: 0
    };
  }
>>>>>>> game

  SubmitNote = async () => {
    let Mail = this.state.UserMail;
    let pass = this.state.UserPass;
    if (Mail === "" || pass === "") {
      alert("Please insert info!");
    } else {
      // this.props.navigation.navigate('UserHome',{UserId:this.state.UserId,pointsU:this.state.pointsU,stageU:this.state.stageU,UserName:this.state.UserName,imgU:this.state.imgU});

      const url = myurl + "Users";
      const userf = await fetch(url, {
        method: "Put",
        body: JSON.stringify([Mail, pass]),
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8"
        })
      }).catch(function(error) {
       
      alert("wrong info!");
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
       // throw error;
      });
      const res = await userf.json();
      if (res.UserName != null) {
        this.props.navigation.navigate("UserHome", {
          UserId: res.Id,
          UserPoints: res.Points,
          UserName: res.UserName
        });
      }
      else
      alert("wrong info!");

    }
  };

  render() {
    return (
      <Background>
        <Logo />
        <Header>Welcome back.</Header>
        <TextInput
          onChangeText={Info => this.setState({ UserMail: Info })}
          label="Email"
          style={styles.forgot}
        />
        <TextInput
          onChangeText={Info => this.setState({ UserPass: Info })}
          style={styles.forgot}
          label="Password"
        />
        <View style={styles.forgotPassword}></View>

        <View style={styles.forgot}>
          <Text style={styles.forgot}>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NewUser")}
          >
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.SubmitNote}>
          <Text style={styles.login}>Sign in</Text>
        </TouchableOpacity>
      </Background>
    );
  }
}
const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
    color: "#000000"
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    color: "#000000"
  },
  forgot: {
    fontSize: 13,
    color: "#000000"
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  },
  login: {
    fontSize: 43,
    color: "#0000ff",
    fontWeight: "bold"
  }
});
