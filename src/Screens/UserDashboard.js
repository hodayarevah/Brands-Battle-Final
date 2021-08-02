import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";

//import styles from "./MyStyle";
import Background from "../components/Background";
import { Icon, Avatar } from "react-native-elements";
import { Button, Row } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
class MyPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: "",
      UserPoints: "",
      // stage: 1,
      UserName: "",
      img: ""
    };
  }
  async componentDidMount() {
    await this.getdata();
    this.setState({
      img: await this.getimagesec()
    });
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.getdata();
      }
    );
  }

  // async componentDidMount () {
  //   this.getdata();
  //  this.setState({
  //   img : await this.getimagesec()})

  //    this.willFocusSubscription = this.props.navigation.addListener(
  //   'payload',
  //      () => {
  //    this.getdata();
  //this.setState({img :await this.getimagesec})
  //     }
  //   );
  //  }

  componentWillUnmount() {
    this.willFocusSubscription();
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
    // this.getimage();
  };

  getimage = async () => {
    try {
      const getAsyncStorageData = await AsyncStorage.getItem(
        this.state.UserName
      );
      if (getAsyncStorageData !== null) {
        alert("Data successfully get");
        this.setState({ img: getAsyncStorageData });
        // value previously stored
      }
    } catch (e) {
      //   alert("Failed to get the data from the storage");
      //  console.log(e);
    }
  };
  getimagesec = async () => {
    try {
      const getAsyncStorageData = await AsyncStorage.getItem(
        this.state.UserName
      );
      if (getAsyncStorageData !== null) {
        alert("Data successfully get");
        return getAsyncStorageData;
        // value previously stored
      }
    } catch (e) {
      alert("Failed to get the data from the storage");
      //  console.log(e);
    }
  };

  render() {
    return (
      <Background>
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image
                  source={{
                    uri: this.state.img
                  }}
                  //  source={require("../assets/profile-pic.jpg")}
                  style={styles.image}
                  resizeMode="contain"
                ></Image>
              </View>
              <View style={styles.dm}>
                <MaterialIcons
                  name="chat"
                  size={18}
                  color="#dfd8c8"
                ></MaterialIcons>
              </View>
              <View style={styles.active}></View>
              <View style={styles.add}>
                <Ionicons
                  name="ios-add"
                  size={48}
                  color="#dfd8c8"
                  style={{ marginTop: 6, marginLeft: 2 }}
                ></Ionicons>
              </View>
            </View>

            <View style={styles.infoContainer}>
  
              <Text style={[styles.text, { color: "#aeb5bc", fontSize: 14 }]}>
              User Name 
              </Text>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {this.state.UserName}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>
                  {this.state.UserPoints}
                </Text>
                <Text style={[styles.text, styles.subText]}>Total Points</Text>
              </View>

            
            </View>

            <Button
              block
              success
              rounded
              style={styles.card}
              onPress={() =>
                this.props.navigation.push("Categories", {
                  UserId: this.state.UserId,
                  UserPoints: this.state.UserPoints,
                  UserName: this.state.UserName
                })
              }
            >
              <Text>Play</Text>
            </Button>

            <Button
              block
              rounded
              style={styles.card}
              onPress={() => this.props.navigation.navigate("WinnerPage")}
            >
              <Text> winners table</Text>
            </Button>
          </ScrollView>
        </SafeAreaView>
      </Background>
    );
  }
}
export default MyPageView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575d"
  },
  subText: {
    fontSize: 12,
    color: "#aeb5bc",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain"
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  dm: {
    backgroundColor: "#41444b",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#34ffb9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#41444b",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
  mediaCount: {
    backgroundColor: "#41444b",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  recentItemIndicator: {
    backgroundColor: "#CADFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  card: {
    //backgroundColor: "#41444b",
    //position: "absolute",
    bottom: 0,
    right: 0,
    //width: 200,
    height: 50,
    width: 200,
    margin: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  }
});
