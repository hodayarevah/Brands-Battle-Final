import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";
import { ImageBackground } from "react-native";
import styles from "./MyStyle";
import myurl from "./Url";
export default class WinnerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  UserName:"",
      //  UserStage:"",
      // UserPoints:"",
      tableData: []
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
    const url =myurl+ `Users/`;
    const userf = await fetch(url, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8"
      })
    });

    const res = await userf.json();
    // [[1],[2],[3],[4]]
    let i = 0;
    const Data = [];
    if (res != null) {
      let rowData = [];
      res.forEach(element => {
        i++;
        // rowData.push(["gj"],["g"],["j"], ["p"]);
        rowData.push(
          [i],
          [element.UserName],
          [element.Points],
       
        );
        Data.push(rowData);
        rowData = [];
      });

      this.setState({ tableData: Data });
    }
  };

  render() {
    const state = this.state;
    tableHead = ["place", "name", "Points"];
    const widthArr = [70, 60, 30, 50, 40, 40, 40];
    return (
      <ImageBackground source={require("../backh.jpg")} style={styles.image}>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#4682b4" }}>
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={styles.textx}
            />
            <Rows data={state.tableData} textStyle={styles.textx} />
          </Table>
        </View>
      </ImageBackground>
    );
  }
}
