import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { Table } from "react-bootstrap";
import PanelComponent from "../UI-components/PanelComponent";

class AnswerDetails extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      answer: {},
      themes: []
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
        <PanelComponent
          title={"Tilknyttede tema"}
          itemArray={this.state.themes}
          values={["title"]}
          link={"/themes/"}
        />
      </div>
    );
  }

  getAnswerFromServer() {
    const id = this.props.match.params.answerId;
    axios.get("/answers/" + id).then(res => {
      const answerFromServer = {
        id: res.data[0].id_answer,
        title: res.data[0].title,
        sentToHearing: res.data[0].sent_to_hearing,
        updated: res.data[0].updated,
        approved: res.data[0].approved,
        status: res.data[0].status,
        jobTechCode: res.data[0].job_tech_code,
        comment: res.data[0].comment,
        group: res.data[0].group_type,
        categoryName: res.data[0].category_title
      };

      const themesFromServer = res.data[1].map(t => {
        return {
          id: t.id_theme,
          title: t.title
        };
      });

      console.log(answerFromServer);

      const newState = Object.assign({}, this.state, {
        answer: answerFromServer,
        themes: themesFromServer
      });
      this.setState(newState);
    });
  }
}

export default AnswerDetails;
