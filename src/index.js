import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Categories from "./screens/Categories";
import Quiz from "./screens/Quiz";
import MoreBrandData from "./screens/MoreBrandData";

const MainStack = createStackNavigator({
  Categories: {
    screen: Categories,
    navigationOptions: {
      headerTitle: "CHOOSE CATEGORY",
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.getParam("title"),
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: navigation.getParam("color"),
        borderBottomColor: navigation.getParam("color"),
      },
    }),
  },
});

export default createAppContainer(MainStack);
