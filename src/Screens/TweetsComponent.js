import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { SectionGrid } from "react-native-super-grid";
//import Header from "../components/Header";
import BeautifulHorizontalList from "react-native-beautiful-horizontal-list";
import Pie from "./Pie";
import myurl from "./Url";
import Loader from "./Loader";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body
} from "native-base";

export default class TweetsComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.first);
    this.state = {
      brandInfo: this.props.first.name,
      desInfo: this.props.first.description,
      brand: this.props.first.name,
      fetchlist: " ",
      posCounter: 0,
      image: this.props.first.profile_image_url
      // fetchlist: this.props.first.description
    };
  }

  gettwitterPop = async questionNumber => {
    const brandOFcat = [];

    const url = myurl + `Twitter?Input=` + this.state.brand + `&question=` + 16;
    const userf = await fetch(url, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8"
      })
    });

    const res = await userf.json();
    //console.log(res);
    await this.ReactionCounter(res);
    /* this.setState({
      fetchlist: res
    }); */
    // console.log(this.state.fetchlist);
  };
  ReactionCounter =async a => {
    var sentiment = require("node-sentiment");
    let pos = [0, 0];
    //let neg = 0;
    //alert(a.length);
    for  (let index = 0; index < a.length; index++) {
      let res = sentiment(a[index]);

      if (res.comparative > 0) {
        //alert("hi");
        pos[0]++;
      }
      if (res.comparative < 0) {
        pos[1]++;
      }
    }

    await this.setState({
      posCounter: pos
    });
    // alert(this.state.posCounter[1]);
    // alert(this.state.posCounter[0]);
  };
  componentDidMount() {
    this.gettwitterPop(12);
    //his.ReactionCounter(this.state.fetchlist);
  }

  render() {
    const staticData = [
      {
        title: "followers",
        value: this.props.first.public_metrics.followers_count,
        unit: "Thousnds",
        primaryColor: "#10CFE4",
        imageSource: require("../images/user.png")
      },
      {
        title: "following",
        value: this.props.first.public_metrics.following_count,
        unit: "Thousnds",
        primaryColor: "#c84cf0",
        imageSource: require("../images/user.png")
      },
      {
        title: "tweet",
        value: this.props.first.public_metrics.tweet_count,
        unit: "Thousnds",
        primaryColor: "#10E471",
        imageSource: this.state.image,
        imageSource: require("../images/tweet.png")
      },
      {
        title: "created_at",
        value: this.props.first.created_at,
        unit: "Date",
        primaryColor: "#10E471",
        imageSource: this.state.image,
        imageSource: require("../images/writing.png")
      }
    ];
    if(this.state.posCounter==0)
return <Loader/>
   else return (
      
      <View style={styles.gridView}>
        <Image
          source={{ uri: this.state.image }}
          style={{ width: 80, height: 80, borderRadius: 60, margin: 10 }}
        />

        <Content>
          <Card style={{ width: "100%" }}>
            <CardItem header bordered>
              <Text>{this.state.brand}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>{this.state.desInfo}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Pie brand={this.state.posCounter}></Pie>
        <BeautifulHorizontalList data={staticData} />
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    margin: 20,
    flex: 1,
    padding: 20
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 200
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCard: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    backgroundColor: "#fff",
    color: "white",
    padding: 10
  },
  Header: {
    fontSize: 25,

    padding: 80
  }
});
