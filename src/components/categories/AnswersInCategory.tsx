import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { Table } from "react-bootstrap";

class AnswersInCategory extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      answers: []
    };
  }

  componentDidMount() {
    this.getAnswersFromServer();
  }

  render() {
    return (
      <div className="answersincategory">
        <h3>Svar i kategorien {this.state.category.title}</h3>
        <Table bordered>
          <thead>
            <tr>
              <th>Gruppering</th>
              <th>Svarnavn</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.answers.map(a => (
              <tr key={a.id}>
                <td>{a.group}</td>
                <td>{a.title}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  getAnswersFromServer() {
    const id = this.props.match.params.categoryId;
    axios
      .get("/categories/" + id + "/answers")
      .then(res => {
        const categoryFromServer = {
          id: res.data[0].id_category,
          title: res.data[0].title
        };

        const answersFromServer = res.data[1].map(a => {
          return {
            id: a.id_answer,
            title: a.title,
            group: a.group_type,
            status: a.status
          };
        });

        const newState = Object.assign({}, this.state, {
          category: categoryFromServer,
          answers: answersFromServer
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
}

export default AnswersInCategory;