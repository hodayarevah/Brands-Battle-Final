import { Row } from "react-native-easy-grid";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import myurl from "./Url";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { Container } from "native-base";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import {
  Text,
  Item,
  Button,
  Form,
  Input,
  Label,
  Icon,
  Thumbnail
} from "native-base";
//import styles from "./MyStyle";
import myUrl from "./Url";
import { Vibration } from "react-native";
class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NewUserName: "",
      NewUserPass: "",
      NewUserMail: "",
      points: 0,
      newuser: "",
      hasCameraPermission: null
    };
  }

  async componentDidMount() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }

  insertUser = async () => {
    this.state.newuser = {
      UserName: this.state.NewUserName,
      UserPass: this.state.NewUserPass,
      points: this.state.points,
      Mail: this.state.NewUserMail
    };
    const url = myurl + `Users`;
    const userf = await fetch(url, {
      method: "Post",
      body: JSON.stringify(this.state.newuser),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8"
      })
    }).then(res => {
      if (res.json() != null) this.props.navigation.navigate("login");
    });

    this.setState({
      NewUserName: "",
      NewUserPass: "",
      newuser: "",
      NewUserMail: ""
    });
  };
  OpenCamera = async () => {
    var imgCamera = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!imgCamera.cancelled) {
      this.setAsyncStorage(imgCamera.uri);
      //alert("image uploded")
    }
  };
  OpenGallery = async () => {
    var imgGallery = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!imgGallery.cancelled) {
      this.setAsyncStorage(imgGallery.uri);
      // alert("image uploded")
    }
  };
  setAsyncStorage = async value => {
    try {
      await AsyncStorage.setItem(this.state.NewUserName, value);
 
    } catch (e) {
      alert("Failed to save the data to the storage");
      console.log(e);
    }
  };

  render() {
    const { image, hasCameraPermission } = this.state;
    const { navigation } = this.props;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access err</Text>;
    } else {
      return (
        <>
          <Background>
            <Logo />
            <Header>Create Account</Header>
            <TextInput
              onChangeText={Info => this.setState({ NewUserName: Info })}
              label="Name"
            />
            <TextInput
              onChangeText={Info => this.setState({ NewUserMail: Info })}
              label="Email"
            />
            <TextInput
              onChangeText={Info => this.setState({ NewUserPass: Info })}
              label="Password"
            />

            <Icon raised name="camera" onPress={this.OpenCamera}></Icon>
            <Icon raised name="image" onPress={this.OpenGallery}></Icon>
            <Button
              onPress={this.insertUser}
              mode="contained"
              style={{ marginTop: 24 }}
            >
              <Text>Sign Up</Text>
            </Button>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("login")}
              style={styles.row}
            >
              <Text>Already have an account? </Text>
            </TouchableOpacity>
          </Background>
        </>
      );
    }
  }
}

export default NewUser;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});
