import { useState } from "react";
import { Link } from "@reach/router";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { RouteComponentProps } from "@reach/router";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import ReportIcon from "@mui/icons-material/Assignment";
import FormIcon from "@mui/icons-material/Description";
import CompareIcon from "@mui/icons-material/Compare";
//created a navbar in react.

const Navbar: React.FC<RouteComponentProps> = () => {
{
    const[tab,setTab]=useState(false)
    function togglestatus()
    {
       setTab(!tab)
    }
    return(
       <div>
        <div style={{height:'8%',width:'100%',top:'0',position:'absolute',background:'#1560BD',left:'0',display:'flex',justifyContent:'center'}}>
            
          <button style={{left:'0',position:'absolute',background:'transparent',border:'none'}} onClick={togglestatus}><MenuOpenIcon sx={{color:'white',fontSize:'30px',marginTop:'10px',cursor:'pointer'}} /></button>
            <b><p style={{color:'white'}}>POTHOLE ANALYTICAL DASHBOARD</p></b>
            </div>
         {tab&& 
            <Sidebar style={{marginTop:'54px',height:'300px',color:'black',background:'gray',left:'0',position:'absolute'}}>
  <Menu >
  <MenuItem icon={<HomeIcon />} component={<Link to="/home" />}>
          Home
        </MenuItem>
        <MenuItem icon={<MapIcon />} component={<Link to="/viewmaps" />}>
          Maps - View Potholes
        </MenuItem>
        <MenuItem icon={<ReportIcon />} component={<Link to="/viewreport" />}>
          View Reports
        </MenuItem>
        <MenuItem icon={<FormIcon />} component={<Link to="/reports" />}>
          Pothole Reporting Form
        </MenuItem>
        <MenuItem icon={<CompareIcon />} component={<Link to="/comparisons" />}>
          Comparing Algorithms
        </MenuItem>
      </Menu>
</Sidebar>}
        </div>
    )
}}
export default Navbar;