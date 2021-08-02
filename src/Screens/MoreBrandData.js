import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { FlatGrid } from "react-native-super-grid";
import TweetsComponent from "./TweetsComponent";
import SentimentPage from "./Sentiment";
import Chart from "./Chart";
import Pie from "./Pie";
import sentiment from "sentiment";
import myurl from "./Url";
import Loader from "./Loader";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default class MoreBrandData extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    // console.log(this.props.navigation.state.params.chosenbrand);
    this.state = {
      brand:this.props.navigation.state.params.chosenbrand.name,
      chosenbrand: this.props.navigation.state.params.chosenbrand,
      doweknowthebarnd: this.props.navigation.state.params.doweknowthebarnd
    };
  }
  /* componentDidMount() {
                   this.gettwitts();
                 }
                 gettwitts = async questionNumber => {
                   //alert(chosenbrand)
                   const brandOFcat = [];

                   const url =
                     myurl +
                     `Twitter?Input=` +
                     this.state.chosenbrand +
                     `&question=` +
                     14;
                   const userf = await fetch(url, {
                     method: "Get",
                     headers: new Headers({
                       "Content-Type": "application/json; charset=UTF-8",
                       Accept: "application/json; charset=UTF-8"
                     })
                   });

                   const res = await userf.json();

                   this.setState({
                     listTweet: res
                   }); 
                   };
*/

  render() {
    //console.log(this.state.comments);
    return (
      <Swiper style={styles.wrapper} showsButtons loop={false}>
        <TweetsComponent first={this.state.chosenbrand} />

        <SentimentPage brand={this.state.chosenbrand} />
{(this.state.doweknowthebarnd)?
        <Chart
          brand={this.state.brand}
          // comments={this.state.comments}
          /*  likes={this.state.like_count}
          comments={this.state.comments}
          retweets={this.state.retweets}
          follow={this.state.follow} */
        />:null
      }
      </Swiper>
    );
  }

  styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1
    },
    itemContainer: {
      justifyContent: "flex-end",
      borderRadius: 5,
      padding: 10,
      height: 150
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
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#9DD6EB"
    },
    slide2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#97CAE5"
    },
    slide3: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#92BBD9"
    },
    text: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "bold"
    }
  });
}
