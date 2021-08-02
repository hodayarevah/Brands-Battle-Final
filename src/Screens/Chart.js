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
import BeautifulHorizontalList from "react-native-beautiful-horizontal-list";
import Loader from "./Loader";
//import sentiment from "sentiment";
import myurl from "./Url";


export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
    //console.log(this.props);

    this.state = {
      //listinfo: this.props.listinfo,
     // flag:this.props.flag,
      fetchlist: " ",
      brand:this.props.brand,
      posCounter: 0,
      Popularty: " ",
      currentBrands: [],
      allinfo:{},
      flag:false,
      popular:0,
    };
  }

  async componentDidMount(){
    const arr = await this.getDataforChart()
    this.setState({allinfo:arr})
   const gamegrade= await this.getPopular()
  this.setState({popular:gamegrade})
  
    await this.gochang();
    //this.gochang()
    
    //console.log(arr)
    
    
     
    
      }


      getPopular = async() =>{
     
        const url =  myurl+"brands?Brandname="+ this.state.brand +"&number="+1
         const userf =await fetch(url, {
             method: 'Get',
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
             if(res!=0)
               {
                 console.log(res)
                return res;
              };
             
       }

  gettwitterPop = async( name) => {
    const brandOFcat = [];
    const url =
      myurl + "/Twitter?Input=" + name + `&question=` + 11;
    const userf = await fetch(url, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8"
      })
    });
  
    //console.log(res);
    const res = await userf.json();
  return res;
  
  } 
  gochang=()=>{
  this.setState({flag:true})
  console.log("hkkkkkkk")
  }
  //מכין את המידע לגרף 
  getDataforChart=async()=>{
    // קריאה להביא רשימה לפי שם מותג 
        const url = myurl+`brands?brand=`+this.state.brand
        const userf =await fetch(url, {
            method: 'Delete',
            headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json; charset=UTF-8'
            })
          })
          
       const res=await userf.json()
        //  var abrand=
       //   var bbrand= 
        //  var cbrand= 
         // var dbrand =
        //  var hisbrand= 
        
          console.log("hii")
      let allinfo={
      labels:[res[0], res[5], res[2],res[6],this.state.brand],
      datasets:{first: await this.gettwitterPop(res[0]), second:await this.gettwitterPop(res[5]), third:await this.gettwitterPop(res[2]),forth: await this.gettwitterPop(res[6]), fifth:await this.gettwitterPop(this.state.brand)}
 
      }
        
    
    console.log(this.state.flag)
    
    return await allinfo;
    }
    

  render() {
    const staticData = [
      {
        title: "Plyers popularity Grade",
        value: this.state.popular*100,
        unit: "",
        primaryColor: "#10CFE4",
        imageSource: require("../images/user.png")
      }
    ]
    console.log(this.state.flag)
    console.log(this.state.allinfo)
    if(this.state.flag==false)
   return <Loader/>
   else return (

      <View style={styles.gridView}>
        <Text style={styles.text}> Other brands on the same category </Text>
        <LineChart  style={{
    paddingTop: '30%' }}
          gridView
          data={{
            labels: this.state.allinfo.labels,
            // ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data:[
                  this.state.allinfo.datasets.first,
                  this.state.allinfo.datasets.second,
                  this.state.allinfo.datasets.third,
                  this.state.allinfo.datasets.forth,
                  this.state.allinfo.datasets.fifth

                ],
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#6200EE",
            backgroundGradientTo: "#6200EE",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#6200EE"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
    <BeautifulHorizontalList style={{
    paddingTop: '20%' }} data={staticData} />
       
      </View>
    );

  }
}
const styles = StyleSheet.create({
  gridView: {
    marginTop: 100,
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
  text: {
    fontFamily: "HelveticaNeue",
    color:"white",
    backgroundColor: "#6200EE",
    textAlign:"center",
    fontSize: 25,
    padding: '5%',
    marginBottom:'15%'
   // bold:4

  },
  Header: {
    fontSize: 25,

    padding: 80
  }
});



