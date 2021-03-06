import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import axios from "axios";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import EditQuestion from "./EditQuestion";
import UpdateQuestion from "./UpdateQuestion";
import EditSubTopic from "./EditSubTopic";
import EditStudy from "./EditStudy";

function App() {
  return (
    <Router>
      <Route exact path="/" component={AddQuestion} />
      <Route exact path="/edit" component={EditQuestion} />
      <Route exact path="/subtopic" component={EditSubTopic} />
      <Route exact path="/study" component={EditStudy} />
      <Route path="/edit/:id" component={UpdateQuestion} />
    </Router>
  );
}

export default App;
