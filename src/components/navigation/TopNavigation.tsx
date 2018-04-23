import React from "react";
const {Navbar,Nav,NavItem} = require("react-bootstrap");
import { Link } from "react-router-dom";
  
  class TopNavigation extends React.Component {
    render() {
      return (
          <div>
            <Navbar fluid="true" collapseOnSelect="true">
            <Navbar.Header>
            <Navbar.Brand/>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav>
                <NavItem><Link to={"/laws"}>
                  Laws 
                </Link></NavItem>
                <NavItem><Link to={"/themes"}>
                  Themes 
                </Link></NavItem>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
      </div>
      );
    }
  }
  export default TopNavigation;

