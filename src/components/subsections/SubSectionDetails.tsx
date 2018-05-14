import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import PanelComponent from "../UI-components/PanelComponent";
import { Link } from "react-router-dom";

class SubSectionDetails extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      subSection: {},
      law: {},
      regulation: {},
      themes: []
    };
  }

  componentDidMount() {
    this.getSubSectionFromServer();
  }

  render() {
    return (
      <div className="subSectionDetails">
        <h3>
          {this.state.subSection.type} {this.state.subSection.number} {this.state.subSection.title}
        </h3>
        {this.state.subSection.comment ? <h4>Kommentar: {this.state.subSection.comment}</h4> : ""}
        {this.state.law ? (
          <h4>
            Relevant lov: <Link to={"/laws/" + this.state.law.id}>{this.state.law.title}</Link>
          </h4>
        ) : (
          <h4>
            Relevant forskrift:{" "}
            <Link to={"/regulations/" + this.state.regulation.id}>
              {this.state.regulation.title}
            </Link>
          </h4>
        )}
        <PanelComponent
          title="Relevante tema"
          itemArray={this.state.themes}
          values={["title"]}
          link={"/themes/"}
          expanded
        />
      </div>
    );
  }

  getSubSectionFromServer() {
    const id = this.props.match.params.subSectionId;
    axios
      .get("/subSections/" + id)
      .then(res => {
        const subSectionFromServer = {
          id: res.data[0].id_sub_section,
          number: res.data[0].number,
          title: res.data[0].title,
          type: res.data[0].type == "Kapittel" ? "Kapittel" : "§",
          comment: res.data[0].comment
        };
        let lawFromServer;
        if (res.data[1]) {
          lawFromServer = {
            id: res.data[1].id_law,
            title: res.data[1].title,
            dateCode: res.data[1].date_code
          };
        }
        let regulationFromServer;
        if (res.data[2]) {
          regulationFromServer = {
            id: res.data[2].id_regulation,
            title: res.data[2].title,
            dateCode: res.data[2].date_code
          };
        }
        const themesFromServer = res.data[3].map(theme => {
          return {
            id: theme.id_theme,
            title: theme.title
          };
        });
        const newState = Object.assign({}, this.state, {
          subSection: subSectionFromServer,
          law: lawFromServer,
          regulation: regulationFromServer,
          themes: themesFromServer
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
}

export default SubSectionDetails;
