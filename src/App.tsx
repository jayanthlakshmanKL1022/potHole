
import { Router } from "@reach/router";
import Signin from "./Signin";
import NewUser from "./NewUser";
import PotholeMap from "./Maps";
import Login from "./login";
import Home from "./Home";
import MyProfileDetails from "./ProfileDetails";
import ReportForms from "./ReportForms";
import Report from "./Reports";
import ChartsOverviewDemo from "./comparingAlgoorithms";

const App = () => {
  return (
      <Router>
        <Signin path="/" />
        <NewUser path="/newuser" />
        <MyProfileDetails path="/profile" />
        <Login path="/login"/>
        <Home path="/home"/>
        <PotholeMap path="/viewmaps"/>
        <ReportForms path="/reports"/>
        <Report path="/viewreport"/>
        <ChartsOverviewDemo path="/comparisons"/>
      </Router>
  );
};
export default App;

//npm install @reach/router --legacy-peer-deps
//install via legacyPeers and then install dependencies.
