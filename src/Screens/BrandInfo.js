
 import { Item } from "native-base";
 import React, { useState } from "react";
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   TextInput,
   Dimensions
 } from "react-native";
 import {
   LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart
 } from "react-native-chart-kit";
 import SearchDropDown from "../components/SearchDropDown";
 import BrandInfo from "../components/BrandInfo";
 import Brands from "../data/Data";
 
 export default function MarketingPage() {
   const [dataSource] = useState([]);
   for (var index = 0; index < Brands.length; index++) {
     dataSource[index] = Brands[index].BrandName;
   }
   console.log(dataSource);
 
   const [colors] = useState(["#84DCC6", "#FEC8C8", "#F7E4CF", "#E8DEF3"]);
 
   const [filtered, setFiltered] = useState(dataSource);
   const [searching, setSearching] = useState(false);
   const [SelectedBrand, setSelectedBrand] = useState("Google");
 
   const onSearch = text => {
     if (text) {
       setSearching(true);
       const temp = text;
 
       const tempList = dataSource.filter(item => {
         if (item.match(temp)) {
           setSelectedBrand(item);
           return item;
         }
       });
       setFiltered(tempList);
     } else {
       setSearching(false);
       setFiltered(dataSource);
     }
   };
   const randomColor = () => {
     return colors[Math.floor(Math.random() * colors.length)];
   };
 
   const selectfunc = selecteditem => {};
   return (
     <View style={styles.container}>
       <Component1 />
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     // justifyContent: 'center',
     alignItems: "center",
     marginTop: "20%",
     flex: 1
   },
   textInput: {
     backgroundColor: "#BFBFBF",
     width: "80%",
     borderRadius: 5,
     height: 50,
     fontSize: 20,
     fontWeight: "bold",
     paddingHorizontal: 10
   }
 });
 