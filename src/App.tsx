import * as React from "react";
import "./App.css";
import { Col, Grid, Row } from "react-bootstrap";
import {BrowserRouter as Router, Route } from "react-router-dom";
import TopNavigation from './components/navigation/TopNavigation';
import LawList from './components/laws/LawList';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
        <TopNavigation />
          <Grid>
            <Row className="show-grid text-center">
              <Col>
                <Route path="/laws" component={LawList}/>
              </Col>
            </Row>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default App;
