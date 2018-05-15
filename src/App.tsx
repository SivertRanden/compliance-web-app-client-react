import * as React from "react";
import "./App.css";
import { Col, Grid, Row } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import TopNavigation from "./components/navigation/TopNavigation";
import AppRoutes from "./Routes/AppRoutes";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <TopNavigation />
          <Grid>
            <Row className="show-grid text-center">
              <Col>
                <AppRoutes />
              </Col>
            </Row>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default App;
