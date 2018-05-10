import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import PanelComponent from "../UI-components/PanelComponent";

class RegulationDetails extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      regulation: {},
      law: {},
      subSections: []
    };
  }

  componentDidMount() {
    this.getRegulationDetails();
  }

  render() {
    return (
      <div className="regulationDetails">
        <h3>
          {this.state.regulation.title} - {this.state.regulation.dateCode}
        </h3>
        <h4>Hjemlet i {this.state.law.title}</h4>
        <PanelComponent
          title="Relevante paragrafer i forskriften"
          itemArray={this.state.subSections}
          extra="§"
          values={["number", "title"]}
          expanded
        />
      </div>
    );
  }

  private getRegulationDetails() {
    const id = this.props.match.params.regulationId;
    axios
      .get("/regulations/" + id)
      .then(res => {
        const regulationFromServer = {
          title: res.data[0].title,
          dateCode: res.data[0].date_code
        };

        const lawFromServer = {
          title: res.data[0].lawTitle,
          dateCode: res.data[0].lawCode
        };

        const subSectionsFromServer = res.data[1].map(sub => {
          return {
            id: sub.id_sub_section,
            number: sub.number,
            title: sub.title,
            type: sub.type
          };
        });
        const newState = Object.assign({}, this.state, {
          regulation: regulationFromServer,
          law: lawFromServer,
          subSections: subSectionsFromServer
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
}

export default RegulationDetails;
