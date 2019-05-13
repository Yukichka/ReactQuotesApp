import React from "react";
import ReactDOM from "react-dom";
import originalData from "./data";

import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>QuotesApp</h1>
        <Listquotes />
      </div>
    );
  }
}

class Listquotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quote: null };
    this.handleClick = this.handleClick.bind(this);
    this.parseHtmlEntities = this.parseHtmlEntities.bind(this);
  }
  parseHtmlEntities(str) {
    return str.replace(/&#([0-9]{1,4});/gi, function(match, numStr) {
      var num = parseInt(numStr, 10); // read num as normal number
      return String.fromCharCode(num);
    });
  }

  handleClick(item) {
    const regex = /(&nbsp;|<([^>]+)>)/gi;
    this.setState({
      item: this.parseHtmlEntities(item.content).replace(regex, "")
    });
    // console.log(item);
  }

  render() {
    const regex = /(&nbsp;|<([^>]+)>)/gi;
    const listStyle = {
      margin: "1%",
      padding: "2%",
      width: "27%",
      float: "left",
      border: "1px solid black "
    };
    const hovered = {
      backgroundColor: "#FEFDBD"
    };
    const quotelist = originalData.map((item, idx) => (
      <div
        className="quote"
        style={listStyle}
        onClick={() => this.handleClick(item)}
      >
        {this.parseHtmlEntities(item.content).replace(regex, "")}
      </div>
    ));

    const mainStyle = {
      border: "3px solid pink",
      margin: "10px",
      padding: "20px"
    };
    //if this.state.item!="" no style var name = person ? person.name : "stranger";
    return (
      <div>
        {this.state.item == null ? (
          ""
        ) : (
          <h1 style={mainStyle}>{this.state.item}</h1>
        )}
        <div>{quotelist}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
