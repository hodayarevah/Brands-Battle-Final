import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  ImageBackground
} from "react-native";
import styles from "./MyStyle";
import { Icon, Avatar } from "react-native-elements";
import { Button } from "native-base";
class endgame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: "",
      UserPoints: "",
      UserName: "",
      img: ""
    };
  }

  async componentDidMount() {
    await this.getdata();
    this._unsubscribeFocus = await this.props.navigation.addListener(
      "focus",
      () => {
        this.getdata();
      }
    );
  }

  getdata = async () => {
    this.setState({
      UserId: this.props.navigation.state.params.UserId
    });
    this.setState({
      UserName: this.props.navigation.state.params.UserName
    });
    this.setState({
      UserPoints: this.props.navigation.state.params.UserPoints
    });
  };

  render() {
    return (
      <ImageBackground source={require("../backe.jpg")} style={styles.image}>
        <Image style={styles.king} source={require("../fire.gif")} />

        <Button
          rounded
          style={styles.butn}
          onPress={() => this.props.navigation.navigate("WinnerPage")}
        >
          <Text style={styles.words}> winners table</Text>
        </Button>
        <Button
          rounded
          style={styles.butn}
          onPress={() =>
            this.props.navigation.navigate("UserDashboard", {
              UserId: this.state.UserId,
              UserPoints: this.state.UserPoints,
              UserName: this.state.UserName
            })
          }
        >
          <Text style={styles.words}>my profile</Text>
        </Button>
      
      </ImageBackground>
    );
  }
}

export default endgame;
