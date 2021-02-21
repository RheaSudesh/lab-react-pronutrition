import React, { Component } from "react";
import Search from "./Components/Search.jsx";
import "./App.css";

class App extends Component {
 
  render() {
    return (
      <>
      <center>
        <h1>Pro - Nutrition</h1>
        <div class ="content-top">
          <Search/>
        </div>
      </center>
      </>
    );
  }
}

export default App;