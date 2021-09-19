import "../scss/main.scss";

import Predictor from "./predictor/Predictor";
import Dictionary from "./dictionary/Dictionary";
import Credits from "./Credits";
import Home from "./Home";
import Nav from "./Nav";
import PlantPredictor from "./predictor/PlantPredictor";
import WeatherPredictor from "./predictor/WeatherPredictor";
import PlantDictionary from "./dictionary/PlantDictionary";
import UndeadDictionary from "./dictionary/UndeadDictionary";
import WeatherDictionary from "./dictionary/WeatherDictionary";

import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/predictor" exact component={Predictor}></Route>
          <Route path="/predictor/plant" component={PlantPredictor}></Route>
          <Route path="/predictor/weather" component={WeatherPredictor}></Route>
          <Route path="/dictionary" exact component={Dictionary}></Route>
          <Route path="/dictionary/plant" component={PlantDictionary}></Route>
          <Route path="/dictionary/undead" component={UndeadDictionary}></Route>
          <Route
            path="/dictionary/weather"
            component={WeatherDictionary}
          ></Route>
          <Route path="/credits" component={Credits}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
