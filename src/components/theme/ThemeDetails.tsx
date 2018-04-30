import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import PanelComponent from "../UI-components/PanelComponent";

class ThemeDetails extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      theme: {},
      laws: [],
      regulations: [],
      answers: [],
      implementation: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.themeId;
    axios
      .get("/themes/" + id)
      .then(res => {
        const themeFromServer = {
          id: res.data[0].id_theme,
          title: res.data[0].title
        };
        const lawsFromServer = res.data[1].map(law => {
          return {
            id: law.id_law,
            title: law.title,
            dateCode: law.date_code
          };
        });
        const regulationsFromServer = res.data[2].map(reg => {
          return {
            id: reg.id_regulation,
            title: reg.title,
            dateCode: reg.date_code
          };
        });
        const answersFromServer = res.data[3].map(ans => {
          return {
            id: ans.id_answer,
            title: ans.title
          };
        });
        const implementationFromServer = {
          id: res.data[4].id_implementation
        };
        const newState = Object.assign({}, this.state, {
          theme: themeFromServer,
          laws: lawsFromServer,
          regulations: regulationsFromServer,
          answers: answersFromServer,
          implementation: implementationFromServer
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="themedetails">
        <h3>
          {this.state.theme.id}. {this.state.theme.title}
        </h3>
        <PanelComponent title="Lover" itemArray={this.state.laws} values={["title"]} />
        <PanelComponent title="Forskrifter" itemArray={this.state.regulations} values={["title"]} />
        <PanelComponent title="Svar" itemArray={this.state.answers} values={["title"]} />
      </div>
    );
  }
}

export default ThemeDetails;
