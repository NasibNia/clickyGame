import React, { Component } from 'react';
import Navbar from "./Navbar";
import DisplayCards from "./DisplayCards";
import Wrapper from "../Wrapper";
import toys from "./toys.json";
import Container from './Container';
import Row from "./Row"
import Col from "./Col"


class Toys extends Component {

  state = {
    toys : toys ,
    score : 0,
    topScore : 0
  };

  Shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handleGuess = id => {
    console.log(this.state.toys);
    let currentToy = this.state.toys[id];
    console.log(currentToy)
    if (currentToy.guessed === true){
      alert("you lost; start over");
      this.Restart();
    } else {
      this.state.toys[id].guessed = true;
      this.Shuffle(this.state.toys);
      this.setState({toys :toys , score : this.state.score + 1 });
    }
  }
  Max = (a,b) =>{
    if (a>b) {
      return a;
    } else {
      return b;
    }
  }

  Restart = () =>{

    this.setState({toys : (this.state.toys.map(x => (x.guessed = false))),
    topScore : this.Max(this.state.score , this.state.topScore),
    score : 0});
  }

    render() {
      return (
        <Container>
          <Row>
            <Navbar score = {this.state.score} topScore={this.state.topScore}/>
          </Row>
          <Row>
            {this.state.toys.map (x => (
              <DisplayCards id={x.id}
                            key={x.id}
                            guessed = {x.guessed}
                            image = {x.image}
                            handleGuess={this.handleGuess}
              />
            ))};
          </Row>
        </Container> 
      );
    }
  }

  export default Toys;
