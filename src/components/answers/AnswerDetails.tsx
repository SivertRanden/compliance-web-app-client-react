import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { Table } from "react-bootstrap";

class AnswerDetails extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      answer: {}
    };
  }

  componentDidMount() {
    this.getAnswerFromServer();
  }

  render() {
    return (
      <div className="answerdetails">
        <h3>{this.state.answer.title}</h3>
        <h4>
          {this.state.answer.categoryName}
          {this.state.answer.group ? " - " + this.state.answer.group : ""}
          {this.state.answer.jobTechCode ? " - " + this.state.answer.jobTechCode : ""}
        </h4>
        <Table bordered>
          <thead>
            <tr>
              <th>Sendt på høring</th>
              <th>Oppdatert</th>
              <th>Godkjent og implementert</th>
              <th>Status</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.answer.sentToHearing ? "✓" : ""}</td>
              <td>{this.state.answer.updated ? "✓" : ""}</td>
              <td>{this.state.answer.approved ? "✓" : ""}</td>
              <td>{this.state.answer.status}</td>
              <td>{this.state.answer.comment}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  getAnswerFromServer() {
    const id = this.props.match.params.answerId;
    axios.get("/answers/" + id).then(res => {
      const answerFromServer = {
        id: res.data.id_answer,
        title: res.data.title,
        sentToHearing: res.data.sent_to_hearing,
        updated: res.data.updated,
        approved: res.data.approved,
        status: res.data.status,
        jobTechCode: res.data.job_tech_code,
        comment: res.data.comment,
        group: res.data.group_type,
        categoryName: res.data.category_title
      };

      console.log(answerFromServer);

      const newState = Object.assign({}, this.state, {
        answer: answerFromServer
      });
      this.setState(newState);
    });
  }
}

export default AnswerDetails;
