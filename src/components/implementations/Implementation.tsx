import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { Table, ListGroup, ListGroupItem } from "react-bootstrap";

class Implementation extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      implementation: {},
      keyPersons: [],
      trainingPersons: []
    };
  }

  componentDidMount() {
    this.getImplementationFromServer();
  }

  render() {
    return (
      <div className="implementation">
        <h3>Implementasjon</h3>
        <h4>{this.state.implementation.themeTitle}</h4>
        <ListGroup>
            <ListGroupItem header="Nøkkelpersoner">
                {this.state.keyPersons.map((kp, i) => (
                    i < this.state.keyPersons.length - 1 ? kp.initials + ", " : kp.initials
                ))}
            </ListGroupItem>
            <ListGroupItem header="Opplæring/Introduksjon">
                {this.state.trainingPersons.map((tp, i) => (
                    i < this.state.trainingPersons.length - 1 ? tp.initials + ", " : tp.initials
                ))}
            </ListGroupItem>
        </ListGroup>
        <Table bordered>
          <thead>
            <tr>
              <th colSpan={3}>Leder og nøkkelpersoner</th>
              <th colSpan={2}>Høringsgruppe</th>
              <th colSpan={2}/>
            </tr>
            <tr>
              <th>Utfordring gitt</th>
              <th>Frist inspill</th>
              <th>Frist dokument</th>
              <th>Frist innspill</th>
              <th>Oppklaringsmøte</th>
              <th>Siste statusmøte</th>
              <th>Godkjent for opplasting</th>
            </tr>
            <tr>
              <td>{this.state.implementation.challengeGiven}</td>
              <td>{this.state.implementation.deadlineInputLN}</td>
              <td>{this.state.implementation.deadlineDocument}</td>
              <td>{this.state.implementation.deadlineInputH}</td>
              <td>{this.state.implementation.clarificationMeetingDate}</td>
              <td>{this.state.implementation.statusMeetingDate}</td>
              <td>{this.state.implementation.approvedUploadDate}</td>
            </tr>
          </thead>
        </Table>
      </div>
    );
  }

  getImplementationFromServer() {
    const id = this.props.match.params.themeId;
    axios
        .get("/themes/" + id + "/implementation")
        .then(res => {
            const implementationFromServer = {
                id: res.data [0].id_implementation,
                challengeGiven: res.data[0].challenge_given,
                deadlineInputLN: res.data[0].deadline_input_ln, 
                deadlineDocument: res.data[0].deadline_document,
                statusMeetingDate: res.data[0].status_meeting_date,
                deadlineInputH: res.data[0].deadline_input_h,
                clarificationMeetingDate: res.data[0].clarifiction_meeting_date,
                approvedUploadDate: res.data[0].approved_upload_date,
                themeTitle: res.data[0].theme_title
            }
            const keyPersonsFromServer = res.data[1].map(kp => {
                return {
                    initials: kp.initials
                }
            })
            const trainingPersonsFromServer = res.data[2].map(lp => {
                return {
                    initials: lp.initials
                }
            })
            const newState = Object.assign({}, this.state, {
                implementation: implementationFromServer,
                keyPersons: keyPersonsFromServer,
                trainingPersons: trainingPersonsFromServer
            })
            console.log(newState);
            this.setState(newState);
        })
  }
}

export default Implementation;
