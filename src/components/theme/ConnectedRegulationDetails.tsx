import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import PanelComponent from "../UI-components/PanelComponent";

class ConnectedRegulationDetails extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      theme: {},
      regulation: {},
      laws: [],
      subSections: []
    };
  }

  componentDidMount() {
    this.getRegulationDetailsConnectedToTheme();
  }

  render() {
    return (
      <div className="connectedregulationdetails">
        <h3>
          Lover og paragrafer for temaet {this.state.theme.shortTitle} og forskriften{" "}
          {this.state.regulation.title}
        </h3>
        <PanelComponent
          title="Hjemlet i følgende lover"
          itemArray={this.state.laws}
          values={["title", "dateCode"]}
          link={"/laws/"}
          expanded
        />
        <PanelComponent
          title="Paragrafer"
          itemArray={this.state.subSections}
          extra="§"
          values={["number", "title"]}
          expanded
        />
      </div>
    );
  }

  private getRegulationDetailsConnectedToTheme() {
    const themeId = this.props.match.params.themeId;
    const regulationId = this.props.match.params.regulationId;
    axios
      .get("/themes/" + themeId + "/regulations/" + regulationId)
      .then(res => {
        const themeFromServer = {
          id: res.data[0].id_theme,
          title: res.data[0].title,
          shortTitle: res.data[0].short_title
        };

        const regulationFromServer = {
          id: res.data[1].id_regulation,
          title: res.data[1].title,
          dateCode: res.data[1].date_code
        };

        const lawsFromServer = res.data[2].map(law => {
          return {
            id: law.id_law,
            title: law.title,
            dateCode: law.date_code
          };
        });

        const subSectionsFromServer = res.data[3].map(sub => {
          return {
            id: sub.id_sub_section,
            number: sub.number,
            title: sub.title
          };
        });

        const newState = Object.assign({}, this.state, {
          theme: themeFromServer,
          regulation: regulationFromServer,
          laws: lawsFromServer,
          subSections: subSectionsFromServer
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
}

export default ConnectedRegulationDetails;
