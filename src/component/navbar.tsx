import React from "react";
import { RouteComponentProps } from "@reach/router";
import './navbar.css'
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { IconButton } from "@mui/material";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "@reach/router";

const Navbar: React.FC<RouteComponentProps> = () => {
  return (
    <section className="app">
      <aside className="sidebar">
        <header>Menu</header>
        <nav className="sidebar-nav">
            <br></br>
            <div style={{marginLeft:'20px'}}>
            <IconButton >
            <HomeIcon sx={{ fontSize: 30, color: "white", "&:hover": { color: "red" } }} />
            </IconButton>
            </div>
            <br></br>     
            <br></br>
            <div style={{marginLeft:'20px'}}>
            <IconButton >
            <ChatIcon sx={{ fontSize: 30, color: "white", "&:hover": { color: "red" } }} />
            </IconButton>
            </div>
         <br></br>     
        <br></br>
        <div style={{marginLeft:'20px'}}>
        <IconButton>
        <Link to="/profile"><AccountBoxIcon sx={{ fontSize: 30, left:'5px',color: "white", "&:hover":{color:"red"}}}></AccountBoxIcon></Link>
        </IconButton>
        </div>
        <br></br>     
        <br></br>
        <div style={{marginLeft:'20px'}}>
        <IconButton >
        <LockPersonIcon sx={{ fontSize: 30, left:'5px',color: "white", "&:hover":{color:"red"}}} />
        </IconButton>
        </div>
        </nav>
      </aside>
    </section>
  );
};

export default Navbar;
