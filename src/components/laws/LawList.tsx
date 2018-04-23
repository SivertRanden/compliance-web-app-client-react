import React, { Component } from "react";
// const { ListGroup, ListGroupItem } = require("react-bootstrap");
// import Law from "./Law";
import axios from "axios";

class LawList extends Component {
  state = {
    laws: []
  };

  public render() {
    return (
      <div className="lawlist">
        {/* <ListGroup>
          {this.state.laws.map(l => (
            <ListGroupItem key={l.id}>
              <Law key={l.id} title={l.title} />
            </ListGroupItem>
          ))}
        </ListGroup> */}
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("/laws")
      .then(response => {
        const lawsFromServer = response.data.map(l => {
          return {
            id: l.id_law,
            title: l.title,
            dateCode: l.date_code
          };
        });
        const newState = Object.assign({}, this.state, {
          laws: lawsFromServer
        });

        this.setState(newState);
        console.log(lawsFromServer);
      })
      .catch(error => console.log(error));
  }
}

export default LawList;
