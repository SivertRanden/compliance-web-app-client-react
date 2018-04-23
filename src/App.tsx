import * as React from "react";
import "./App.css";
import LawList from "./components/laws/LawList";
import { Col, Grid, Row } from "react-bootstrap";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Grid>
          <Row className="show-grid text-center">
            <Col>
              <LawList />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
