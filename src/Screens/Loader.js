 import React from 'react';
import LottieView from 'lottie-react-native';

export default class Loader extends React.Component {
  render() {
    return <LottieView  source={require("../62962-loader-animation.json")} autoPlay loop />;
  }
}