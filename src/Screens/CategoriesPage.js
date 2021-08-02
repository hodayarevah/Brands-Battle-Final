import React, { Component } from "react";
import myurl from "./Url";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView
} from "react-native";
import CircularCard from "../lib/CircularCard";
import ImagedCarouselCard from "../lib/ImagedCarouselCard";
import Background from "../components/Backgroundcat";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Loader from "./Loader";
//import QuizQuestions from './QuizQuestions'

import Questions from "./Questions";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBrands: [],
      allQ: [],
      arryOfQuestions: [],
      chosenbranda: "",
      chosenbrandb: "",
      UserId: "",
      UserPoints: "",
      UserName: "",
      choosen: false
    };
  }

  async componentDidMount() {
    await this.getdata();
    this._unsubscribeFocus = await this.props.navigation.addListener(
      "focus",
      payload => {
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

  getQ = async Catname => {
    this.state.currentBrands = await this.getallbrands(Catname);
    return await this.getallqustions();
  };
  getallbrands = async Catname => {
    const brandOFcat = [];
    const url = myurl + `brands?Catname=` + Catname;
    const userf = await fetch(url, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8"
      })
    });

    const res = await userf.json();
    if (res != null) {
      res.forEach(element => {
        brandOFcat.push(element.Brandname);
      });
    }
    return brandOFcat;
  };

  getallqustions = async () => {
    var i = 0;
    var arryQuestions = Questions;
    var prevQ = "";
    var endQ = "";
    var chosenbrand = "";
    var array = [];
    var answers = "";
    while (i <= 10) {
      var randomNumberB = Math.floor(
        Math.random() * (this.state.currentBrands.length - 1)
      );
      var randomNumberQ = Math.floor(Math.random() * 10);
      this.state.chosenbranda = this.state.currentBrands[randomNumberB];
      prevQ = arryQuestions[randomNumberQ].prev;
      endQ = arryQuestions[randomNumberQ].end;
      idtw = arryQuestions[randomNumberQ].id;

      if (
        randomNumberQ == 3 ||
        randomNumberQ == 4 ||
        randomNumberQ == 5 ||
        randomNumberQ == 9
      ) {
        var randomNumberC = Math.floor(
          Math.random() * (this.state.currentBrands.length - 1)
        );
        if (this.state.currentBrands[randomNumberC] == this.state.chosenbranda)
          if (randomNumberC == this.state.currentBrands.length - 1)
            randomNumberC--;
          else randomNumberC++;
        this.state.chosenbrandb = this.state.currentBrands[randomNumberC];
        var fuuQ =
          prevQ + this.state.chosenbranda + endQ + this.state.chosenbrandb;
        answers = await this.ansgetB(idtw);
        array.push({
          question: fuuQ,
          answers: answers,
          brand: this.state.chosenbranda
        });
        i++;
      } else {
        var fuuQ = prevQ + this.state.chosenbranda + endQ;
        answers = await this.ansgetA(idtw);
        array.push({
          question: fuuQ,
          answers: answers,
          brand: this.state.chosenbranda
        });
        i++;
      }
    }
    return (this.state.arryOfQuestions = array);
  };

  ansgetA = async questionNumber => {
    var twitterAns = await this.gettwitterAns(questionNumber);
    // var twitterAns="2400"
    var arrayOfUnmixAns = [];
    var max = 0;
    var idcorrect;
    if (questionNumber == 14) {
      for (var i = 0; i < 4; i++) {
        if (max <= twitterAns[i][1]) {
          idcorrect = i + 1;
          max = twitterAns[i][1];
        }
      }
      for (var i = 0; i < 4; i++) {
        if (i + 1 == idcorrect)
          arrayOfUnmixAns.push({
            id: i + 1,
            text: twitterAns[i][0].toLocaleString(),
            correct: true
          });
        else
          arrayOfUnmixAns.push({
            id: i + 1,
            text: twitterAns[i][0].toLocaleString()
          });
      }
    } else {
      var twitterAnsWithC = Number(twitterAns);
      if (twitterAnsWithC <= 3) {
        arrayOfUnmixAns.push({
          id: 1,
          text: (twitterAnsWithC + 2).toLocaleString()
        });
        arrayOfUnmixAns.push({
          id: 2,
          text: (twitterAnsWithC + 3).toLocaleString()
        });
        arrayOfUnmixAns.push({
          id: 3,
          text: (twitterAnsWithC + 6).toLocaleString()
        });
        arrayOfUnmixAns.push({
          id: 4,
          text: twitterAnsWithC.toLocaleString(),
          correct: true
        });
      } else if (twitterAnsWithC >= 5) {
        arrayOfUnmixAns.push({
          id: 1,
          text: (
            twitterAnsWithC + Math.floor(twitterAnsWithC * 0.2)
          ).toLocaleString()
        });
        arrayOfUnmixAns.push({
          id: 2,
          text: (
            twitterAnsWithC - Math.floor(twitterAnsWithC * 0.2)
          ).toLocaleString()
        });
        arrayOfUnmixAns.push({
          id: 3,
          text: Math.floor(twitterAnsWithC / 2).toLocaleString()
        });
        arrayOfUnmixAns.push({
          id: 4,
          text: twitterAnsWithC.toLocaleString(),
          correct: true
        });
      } else {
        arrayOfUnmixAns.push({
          id: 1,
          text: (twitterAnsWithC + 2).toLocaleString()
        });
        arrayOfUnmixAns.push({
          id: 2,
          text: (twitterAnsWithC - 3).toLocaleString()
        });
        arrayOfUnmixAns.push({
          id: 3,
          text: (twitterAnsWithC + 6).toLocaleString()
        });
        arrayOfUnmixAns.push({
          id: 4,
          text: twitterAnsWithC.toLocaleString(),
          correct: true
        });
      }
    }

    return arrayOfUnmixAns;
  };

  ansgetB = async questionNumber => {
    var twitterAns = await this.gettwitterDoubleAns(questionNumber);
    var arrayOfUnmixAns = [];
    if (twitterAns == this.state.chosenbranda) {
      arrayOfUnmixAns.push({ id: 1, text: this.state.chosenbrandb });
      arrayOfUnmixAns.push({
        id: 2,
        text: this.state.chosenbranda,
        correct: true
      });
    } else if (twitterAns == this.state.chosenbrandb) {
      arrayOfUnmixAns.push({ id: 1, text: this.state.chosenbranda });
      arrayOfUnmixAns.push({
        id: 2,
        text: this.state.chosenbrandb,
        correct: true
      });
    }
    return arrayOfUnmixAns;
  };

  gettwitterDoubleAns = async questionNumber => {
    const url =
      myurl +
      `Twitter?InputA=` +
      this.state.chosenbrandb +
      "&InputB=" +
      this.state.chosenbranda +
      "&question=" +
      questionNumber;

    const userf = await fetch(url, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8"
      })
    });

    const res = await userf.json();
    return res;
  };
  gettwitterAns = async questionNumber => {
    const url =
      myurl +
      `Twitter?Input=` +
      this.state.chosenbranda +
      `&question=` +
      questionNumber;
    const userf = await fetch(url, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8"
      })
    });

    const res = await userf.json();
    if (res != null) {
      switch (questionNumber) {
        case 0:
          return res.data.public_metrics.followers_count;
        case 1:
          return res[0].FavoriteCount;
        case 2:
          return res[0].RetweetCount;

        default:
          return res;
      }
    }
  };

  render() {
    return (
      <Background>
        {this.state.choosen ? (
          <Loader />
        ) : (
          // <View> <Text> Please choose category to play with </Text> </View>
          <View style={styles.add}>
            <ScrollView horizontal={true} showHorizontalScrollIndicator={false}>
              <CircularCard
                title="Cars"
                source={require("../images/car.jpg")}
                onPress={async () => {
                  this.setState({ choosen: true });
                  this.props.navigation.navigate("Quiz", {
                    title: "Cars",
                    questions: await this.getQ("Cars"),
                    color: "#6F96B8",
                    UserId: this.state.UserId,
                    UserPoints: this.state.UserPoints,
                    UserName: this.state.UserName
                  });
                }}
              />

              <CircularCard
                title="Fast Food"
                source={require("../images/fastfood.jpg")}
                onPress={async () => {
                  this.setState({ choosen: true });
                  await this.props.navigation.navigate("Quiz", {
                    title: "Fast Food",
                    questions: await this.getQ("Fast Food"),
                    color: "#6F96B8",
                    UserId: this.state.UserId,
                    UserPoints: this.state.UserPoints,
                    UserName: this.state.UserName
                  });
                }}
              />
              <CircularCard
                title="Technology"
                source={require("../images/Technology.jpg")}
                onPress={async () => {
                  this.setState({ choosen: true });
                  await this.props.navigation.navigate("Quiz", {
                    title: "Technology",
                    questions: await this.getQ("Technology"),
                    color: "#6F96B8",
                    UserId: this.state.UserId,
                    UserPoints: this.state.UserPoints,
                    UserName: this.state.UserName
                  });
                }}
              />
              <CircularCard
                title="Retail"
                source={require("../images/Retail.png")}
                onPress={async () => {
                  this.setState({ choosen: true });
                  await this.props.navigation.navigate("Quiz", {
                    title: "Retail",
                    questions: await this.getQ("Retail"),
                    color: "#6F96B8",
                    UserId: this.state.UserId,
                    UserPoints: this.state.UserPoints,
                    UserName: this.state.UserName
                  });
                }}
              />
              <CircularCard
                title="Personal Care"
                source={require("../images/PersonalCare.png")}
                onPress={async () => {
                  this.setState({ choosen: true });
                  await this.props.navigation.navigate("Quiz", {
                    title: "Personal Care",
                    questions: await this.getQ("Personal Care"),
                    color: "#6F96B8",
                    UserId: this.state.UserId,
                    UserPoints: this.state.UserPoints,
                    UserName: this.state.UserName
                  });
                }}
              />
              <CircularCard
                title="Apparel"
                source={require("../images/Apparel.jpg")}
                onPress={async () => {
                  this.setState({ choosen: true });
                  await this.props.navigation.navigate("Quiz", {
                    title: "Apparel",
                    questions: await this.getQ("Apparel"),
                    color: "#6F96B8",
                    UserId: this.state.UserId,
                    UserPoints: this.state.UserPoints,
                    UserName: this.state.UserName
                  });
                }}
              />
            </ScrollView>
          </View>
        )}
      </Background>
    );
  }
}
export default Categories;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  middle: {
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 5
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
    // borderRadius: 20,

    //borderBottomLeftRadius: 20,
    //borderBottomRightRadius: 20,
  },
  imagecard: {
    resizeMode: "cover",
    //borderRadius: 80,
    margin: 10,
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  text: {
    color: "black",
    marginTop: 150,
    fontSize: 62,
    //fontWeight: "bold",
    textAlign: "center"
    //backgroundColor: "#000000a0"
  },
  card: {
    //color: "white",
    borderRadius: 105,
    margin: 20,
    //padding: 20,
    //fontSize: 42,
    //fontWeight: "bold",
    //textAlign: "center",
    //borderBottomLeftRadius: 8,
    //borderBottomRightRadius: 8,
    // justifyContent: 'center',
    //backgroundColor: "#000000a0"
    borderWidth: 3,
    borderColor: "#000000"
  },

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
    height: undefined
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
    //backgroundColor: "#41444b",
    //position: "absolute",
    bottom: 0,
    right: 0,
    //width: 200,
    height: 200,
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
  }
});
