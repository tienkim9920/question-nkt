import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Header from "./Component/Header";
import Home from "./Component/Home"
import { useState } from "react";
import One from "./Component/One";
import Two from "./Component/Two";
import Three from "./Component/Three";
import Four from "./Component/Four";
import Five from "./Component/Five";
import Six from "./Component/Six";
import Seven from "./Component/Seven";
import Eight from "./Component/Eight";
import Nine from "./Component/Nine";
import Ten from "./Component/Ten";
import Finish from "./Component/Finish";
import Rank from "./Component/Rank";
import Result from "./Component/Result";

function App() {

  const [result, set_result] = useState({
    name: '',
    answer: [],
    time: []
  })

  const addName = (name) => {
    
    set_result({...result, name})

  }

  const addAnswer = (value) => {

    const answer = result.answer

    answer.push(value)

    set_result({...result, answer})

  }

  const addTime = (value) => {

    const time = result.time

    time.push(value)

    set_result({...result, time})

    console.log(result)

  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Switch>
            <Route exact path="/">
              <Home addName={addName} />
            </Route>
            <Route path="/one">
              <One addAnswer={addAnswer} addTime={addTime} />
            </Route>
            <Route path="/two">
              <Two addAnswer={addAnswer} addTime={addTime} />
            </Route>
            <Route path="/three">
              <Three addAnswer={addAnswer} addTime={addTime} />
            </Route>
            <Route path="/four">
              <Four addAnswer={addAnswer} addTime={addTime} />
            </Route>
            <Route path="/five">
              <Five addAnswer={addAnswer} addTime={addTime} />
            </Route>
            <Route path="/six">
              <Six addAnswer={addAnswer} addTime={addTime} />
            </Route>
            <Route path="/seven">
              <Seven addAnswer={addAnswer} addTime={addTime} />
            </Route>
            <Route path="/eight">
              <Eight addAnswer={addAnswer} addTime={addTime} />
            </Route>
            <Route path="/nine">
              <Nine addAnswer={addAnswer} addTime={addTime} />
            </Route>
            <Route path="/ten">
              <Ten addAnswer={addAnswer} addTime={addTime} result={result}  />
            </Route>
            <Route path="/finish">
              <Finish result={result} />
            </Route>
            <Route path="/rank">
              <Rank />
            </Route>
            <Route path="/result">
              <Result />
            </Route>
          </Switch>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;
