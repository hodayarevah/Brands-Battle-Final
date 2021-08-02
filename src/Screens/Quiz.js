import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import { Button, ButtonContainer } from "../components/Button";
import Alert from "../components/Alert";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import myurl from "./Url"
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6F96B8",
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  }
});

class Quiz extends React.Component {

  state = {
    correctCount: 0,
    totalCount:this.props.navigation.state.params.questions.length,//this,props.navigation.getParams('questions',[])
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false,
    shuffeled:[],
    key:0,
    userupd :[],
    UserId:"",
    UserPoints:"",
    UserName:"",
    Points:0,
    brand:"",
  };


  async componentDidMount  (){
    await this.getdata()
    this._unsubscribeFocus  = await this.props.navigation.addListener('focus',(payload) =>{
    this.getdata()

  
});
  }
 
  getdata = async () => {
    this.setState({
      UserId:this.props.navigation.state.params.UserId,
    });
    this.setState({
      UserName:this.props.navigation.state.params.UserName,
    });
    this.setState({
      UserPoints:this.props.navigation.state.params.UserPoints,
    });
  };



   shuffle=(array)=> {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
      this.state.shuffeled=array
    }
    return array;
  }

 
  
  nextQuestion = () => {
    this.setState(state => {
      const internal = setInterval(() => {
        if (this.state.timer <= 0 ){
          this.nextQuestion()}
      else {
        this.setState({timer: this.state.timer - 1}) 
        clearInterval(internal)}
      } , 1000)
    
      const nextIndex = this.state.activeQuestionIndex + 1;
      if (nextIndex >= state.totalCount) {
        if (this.state.UserPoints=="")
        this.setState.UserPoints=0;
        this.state.userupd={
          Id:this.state.UserId,
         Points:this.state.UserPoints+this.state.correctCount,
        }
          this.postdata()
        return this.props.navigation.navigate('endgame',{UserId: this.state.UserId,
        UserPoints: this.state.userupd.Points,
        UserName: this.state.UserName})
    
       // return this.props.navigation.popToTop();
      }
  
      return {
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  };

 answer = correct => {
    this.setState(
      state => {
        const nextState = { answered: true };

        if (correct) {
          nextState.correctCount = state.correctCount + 1;
          nextState.answerCorrect = true;
          this.addToBrandCorrectCount()
        } else {
          nextState.answerCorrect = false;
         this.addToBrandCount()
        }

        return nextState;
      },
      
      () => { setTimeout(() => this.OnEndStage(), 1000);}
    );
  };

  addToBrandCorrectCount=async()=>{
    const url = (myurl+'brands?value='+this.state.brand)
    await fetch(url, {
       method: 'Post',
       body: JSON.stringify(this.state.userupd),
       headers: new Headers({
         'Content-Type': 'application/json; charset=UTF-8',
         'Accept': 'application/json; charset=UTF-8'
       })
     })

  }
  addToBrandCount=async()=>{
    const url = (myurl+'brands?value='+this.state.brand)
  await fetch(url, {
       method: 'Put',
       body: JSON.stringify(this.state.userupd),
       headers: new Headers({
         'Content-Type': 'application/json; charset=UTF-8',
         'Accept': 'application/json; charset=UTF-8'
       })
     })

  }
  postdata=async()=>{
    
    
    const url = (myurl+'Users/')
   const userdata= await fetch(url, {
      method: 'Delete',
      body: JSON.stringify(this.state.userupd),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
      })
    })
    this.setState({UserPoints:"",UserId:""})

  }

  OnEndTime=() => {

    this.state.key= this.state.key+1;
    this.nextQuestion();
    return [true, 1000];
  }
  OnEndStage=() => {

    this.state.key= this.state.key+1;
    this.nextQuestion();
    //return [true, 1000];
  }

  render() {
   

    const questions =this.props.navigation.state.params.questions// []);//this.props.navigation.state.param.questions;
    const question = questions[this.state.activeQuestionIndex];
    var answers=questions[this.state.activeQuestionIndex].answers;
    var brand=questions[this.state.activeQuestionIndex].brand;
  this.state.brand=brand;
    answers=this.shuffle(answers);
const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <Text className="timer">Too lale...</Text>;
  }

  return (
    <View className="timer">
      <Text className="text">Remaining</Text>
      <Text className="value" style={{textAlign:"center",fontSize:25,color:'#ffff'}}>{remainingTime}</Text>
      <Text className="text">seconds</Text>
    </View>
  );
};
    
    return (
      <View
        style={[
          styles.container,
          { backgroundColor:this.props.navigation.state.params.color}
        ]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
            
          <View className="timer-wrapper" style={{paddingLeft:'28%',paddingBottom:'15%'}}>
        <CountdownCircleTimer
         key={this.state.key}
          isPlaying
          duration={30}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={() => this.OnEndTime()}
        >
          {renderTime}
        </CountdownCircleTimer>
      </View>
     


            <Text style={styles.text}>{question.question}</Text>

            <ButtonContainer>
              {answers.map(answer => (
                <Button
                  key={answer.id}
                  text={answer.text}
                  onPress={() => this.answer(answer.correct)}
                />
              ))}
            </ButtonContainer>

          </View>
          <Alert
            correct={this.state.answerCorrect}
            visible={this.state.answered}
            ></Alert>
          <Text style={styles.text}></Text>
      
          <Button rounded text='SKIP' onPress={() => this.OnEndStage()}/>
    
         
        </SafeAreaView>
       
      </View>
      
    );
  }
}

export default Quiz;
