import React from "react";
const { ListGroup, ListGroupItem } = require("react-bootstrap");
import Law from "./Law";
import axios from "axios";
import { Link } from "react-router-dom";

class LawList extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      laws: []
    };
  }

  componentDidMount() {
    this.getLawsFromServer();
  }

  render() {
    return (
      <div className="lawlist">
      <h3>Lover</h3>
        <ListGroup>
          {this.state.laws.map(l => (
            <ListGroupItem key={l.id}>
              <Link to={"/laws/" + l.id}>
                <Law law={l} />
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }

  getLawsFromServer() {
    axios
    .get("/laws")
    .then(res => {
      const lawsFromServer = res.data.map(l => {
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
    })
    .catch(error => console.log(error));
  }
}

export default LawList;
