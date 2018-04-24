import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { ListGroup, ListGroupItem, Panel } from "react-bootstrap";

class LawDetails extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      law: {},
      regulations: [],
      subSections: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.lawId;
    axios
      .get("/laws/" + id)
      .then(response => {
        const dataFromServer = {
          law: response.data[0],
          regulations: response.data[1],
          subSections: response.data[2]
        };
        const newState = Object.assign({}, this.state, {
          law: dataFromServer.law,
          regulations: dataFromServer.regulations,
          subSections: dataFromServer.subSections
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="lawDetails">
        <h3>
          {this.state.law.title} - {this.state.law.date_code}
        </h3>
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Forskrifter som er hjemlet i loven
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <ListGroup>
              {this.state.regulations.map(r => (
                <ListGroupItem key={r.id_regulation}>{r.title}</ListGroupItem>
              ))}
            </ListGroup>
          </Panel.Collapse>
        </Panel>
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Relevante paragrafer i loven
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <ListGroup>
              {this.state.subSections.map(s => (
                <ListGroupItem key={s.id_sub_section}>{s.title}</ListGroupItem>
              ))}
            </ListGroup>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

export default LawDetails;
