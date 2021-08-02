import React, { Component } from "react";
import { StyleSheet, Text, View, processColor, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import myurl from "./Url";

export default class Pie extends React.Component {
  constructor(props) {
    super(props);
    //alert(this.props.brand);
    this.state = {
      count: this.props.brand
      //fetchlist: [],
      // Sentimentfetchlist: [],

      // listTweet: [],
      // likes: props.likes,
      // comments: props.comments,
      // folow: props.folow,
      // retweets: props.retweets
    };
    // alert(this.state.count[1]);
  }

  /*   getTotalNew = a => {
    var sentiment = require("node-sentiment");
    //var Sent = new sentiment();
    var res = sentiment(a);
    console.log(res.comparative);
    if (res.comparative != 0) return res.comparative;
  };
  getMotal = a => {
    var sentiment = require("node-sentiment");
    //var sentiment = new Sentiment();
    var res = sentiment(a);
    //var res = sentiment.analyze(a);
    if (res.comparative > 0) {
      return "#1abc9c";
    }
    if (res.comparative < 0) return "#BC1A1A";
  }; */
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
    //console.log(this.getTotalNew(res[0]));

    this.setState({
      fetchlist: res
    });
  };
  /* componentDidMount() {
    this.gettwitterPop(12);
    let a = this.NewList(this.state.fetchlist);
    this.setState({
      Sentimentfetchlist: a
    });
    alert(this.state.likes);
  }
  NewList = a => {
    let i;
    var sum = [];
    var sentiment = require("node-sentiment");
    for (let index = 0; index < a.length; index++) {
      //let point = this.getTotalNew(a[index]);
      var res = sentiment(a[index]);
      if (res.comparative != 0) {
        sum.push(a[index]);
      }
      i++;
    }
    console.log(sum);
    return sum;
  }; */

  /*   const data = [
      {
        name: "Tweets",
        population: this.state.folow,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Retweets",
        population: this.state.retweets,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Comments",
        population: this.state.comments,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Likes",
        population: this.state.likes,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Followers",
        population: this.state.folow,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ]; */
  render() {
    const data = [
      {
        name: "Posetive",
        population: this.state.count[0],
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Negative",
        population: this.state.count[1],
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ];

    return (
      <View style={styles.gridView}>
        <PieChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1
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
