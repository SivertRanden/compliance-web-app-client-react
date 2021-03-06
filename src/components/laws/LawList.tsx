import React from "react";
const { ListGroup, ListGroupItem } = require("react-bootstrap");
import Law from "./Law";
import axios from "axios";

class LawList extends React.Component<{}, any> {
  
  constructor(props) {
    super(props);
    this.state = {
      laws: []
    }
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
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="lawlist">
        <ListGroup>
          {this.state.laws.map(l => (
            <ListGroupItem key={l.id}>
              <Law law = {l}/>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default LawList;
