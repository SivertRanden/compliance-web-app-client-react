import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import PanelComponent from "../UI-components/PanelComponent";

class ConnectedLawDetails extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      theme: {},
      law: {},
      regulations: [],
      subSections: []
    };
  }

  componentDidMount() {
    this.getLawdetailsConnectedToTheme();
  }

  render() {
    return (
      <div className="connectedlawdetails">
        <h3>
          Forskrifter og paragrafer for temaet <b>{this.state.theme.shortTitle}</b> og loven{" "}
          <b>{this.state.law.title}</b>
        </h3>
        <PanelComponent
          title="Forskrifter"
          itemArray={this.state.regulations}
          values={["title"]}
          expanded
        />
        <PanelComponent
          title="Paragrafer"
          itemArray={this.state.subSections}
          values={["type", "number", "title"]}
          link={"/subsections/"}
          expanded
        />
      </div>
    );
  }

  private getLawdetailsConnectedToTheme() {
    const themeId = this.props.match.params.themeId;
    const lawId = this.props.match.params.lawId;
    axios
      .get("/themes/" + themeId + "/laws/" + lawId)
      .then(res => {
        const themeFromServer = {
          id: res.data[0].id_theme,
          title: res.data[0].title,
          shortTitle: res.data[0].short_title
        };

        const lawFromServer = {
          id: res.data[1].id_law,
          title: res.data[1].title,
          dateCode: res.data[1].date_code
        };

        const regulationsFromServer = res.data[2].map(reg => {
          return {
            id: reg.id_regulation,
            title: reg.title,
            dateCode: reg.date_code
          };
        });

        const subSectionsFromServer = res.data[3].map(sub => {
          return {
            id: sub.id_sub_section,
            number: sub.number,
            title: sub.title,
            type: sub.type == "Kapittel" ? "Hele kapittel" : "§"
          };
        });

        const newState = Object.assign({}, this.state, {
          theme: themeFromServer,
          law: lawFromServer,
          regulations: regulationsFromServer,
          subSections: subSectionsFromServer
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
}

export default ConnectedLawDetails;
