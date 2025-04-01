
import { Router } from "@reach/router";
import Signin from "./Signin";
import NewUser from "./NewUser";

import Login from "./login";
import Home from "./Home";
import MyProfileDetails from "./ProfileDetails";

const App = () => {
  return (
      <Router>
        <Signin path="/" />
        <NewUser path="/newuser" />
        <MyProfileDetails path="/profile" />
        <Login path="/login"/>
        <Home path="/home"/>
      </Router>
  );
};
export default App;

//npm install @reach/router --legacy-peer-deps
//install via legacyPeers and then install dependencies.
