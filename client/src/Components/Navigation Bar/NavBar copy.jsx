import React, { useState } from 'react';
import { Menu, HomeOutlined, CampaignOutlined, ReceiptLongOutlined , LogoutOutlined } from "@mui/icons-material"
import { Box } from "@mui/system"
import { IconButton } from '@mui/material';
import { NavLink } from "react-router-dom";

import './NavBar.css'



const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMax, setIsMax] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState('MENU');
  const [usernameDisplay, setUser] = useState('')
  const toggle = () => setIsOpen(!isOpen);
  const toggle1 = () => {
    if (isMax < 1) {
      setIsMax(!isMax)
    }
    else {
      toggle()
    }
  }

  window.onresize = function() {
    var viewportWidth = window.innerWidth;
    if (viewportWidth < 768 ) {
      setIsMax(!isMax)
    }
  };

  const [roleID, setRoleId] = useState("-1")

  const doubleToggle = () => {
    toggle1();
    setSelectedMenuItem(' ');
  }
//   console.log(localStorage.getItem("username"))
//   const getUser = () => {
//     try{
//       console.log("here")
//       setUser(localStorage.getItem("username").substring(13,localStorage.getItem("username").length-2))
//       setRoleId(localStorage.getItem("role_id"))
//     } catch {
//       setUser("Guest")
//     }
//   }

  

  const menuItem = [
    {
      path: "/admin",
      name: "Home",
      icon: <HomeOutlined sx={{ fontSize: "5vh" }} style={{color: 'white'}}/>
    },
    {
      path: "/admin/announcements",
      name: "Announcements",
      icon: <CampaignOutlined sx={{ fontSize: "5vh" }} style={{color: 'white'}}/>
    },
    {
      path: "/admin/history",
      name: "History",
      icon: <ReceiptLongOutlined sx={{ fontSize: "5vh" }} style={{color: 'white'}}/>
    },
  ]

  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "28vh" : "9vh" , height: isMax ? "100%" : "88px"}} className="sidebar">
        <div className="sidebar-top-section">
          <div className="sidebar-hamburger">
            <Box>
              <IconButton>
                {" "}
                <Menu onClick={() => {
                  doubleToggle()
                //   getUser()
                }} sx={{ fontSize: "6vh" }} style={{color: 'white'}}/>
              </IconButton>
            </Box>
          </div>
          <div className="sidebar-display">
            <div style={{ display: isOpen ? "flex" : "none" }} className="sidebar-display-text">{selectedMenuItem}</div>
          </div>

        </div>
        <div className="sidebar-menu" style={{display: isMax ? "block" : "none"}}>
          {
            menuItem.map((item, index) => (
              <NavLink to={item.path} style={{textDecoration: 'none'}}>
              <div to={item.path} key={index} className="sidebar-link" activeclassName="sidebar-active" onClick={() => {setSelectedMenuItem(item.name);setIsOpen(false)}}>
                
                  <Box>
                    <IconButton >
                      <div className="sidebar-icon">{item.icon}</div>
                    </IconButton>
                  </Box>
                
                <div to={item.path} style={{ display: isOpen ? "flex" : "none"}} className="sidebar-link_text">{item.name}</div>
              </div>
              </NavLink>
            ))
          }
          <div className="sidebar-bottom-section">
            <Box>
              <IconButton>
                <div className="sidebar-user-icon">
  
                    <LogoutOutlined sx={{fontSize: "5vh"}} style={{color: 'white'}}/>

                </div>
              </IconButton>
            </Box>
            <div className = "sidebar-bottom-section-link-text"
                style={{display: isOpen? "flex": "none"}}>
                Log out
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Sidebar;