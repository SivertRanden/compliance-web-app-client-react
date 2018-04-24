import React from "react";
const { Navbar, Nav, NavItem } = require("react-bootstrap");
import { LinkContainer } from "react-router-bootstrap";

class TopNavigation extends React.Component {
  render() {
    return (
      <div>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand />
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to={"/laws"}>
                <NavItem>Laws</NavItem>
              </LinkContainer>
              <LinkContainer to={"/themes"}>
                <NavItem>themes</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default TopNavigation;
