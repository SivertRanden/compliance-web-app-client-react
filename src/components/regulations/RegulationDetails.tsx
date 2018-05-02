import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import PanelComponent from "../UI-components/PanelComponent";
class LawDetails extends React.Component<RouteComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      regulation: {},
      regulations: [],
      subSections: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.lawId;
    axios
      .get("/laws/" + id)
      .then(res => {
        const lawFromServer = {
          id: res.data[0].id_law,
          title: res.data[0].title,
          dateCode: res.data[0].date_code
        };
        const regulationsFromServer = res.data[1].map(reg => {
          return {
            id: reg.id_regulation,
            title: reg.title,
            dateCode: reg.date_code
          };
        });
        const subSectionsFromServer = res.data[2].map(sub => {
          return {
            id: sub.id_sub_section,
            number: sub.number,
            title: sub.title
          };
        });
        const newState = Object.assign({}, this.state, {
          law: lawFromServer,
          regulations: regulationsFromServer,
          subSections: subSectionsFromServer
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="lawDetails">
        <h3>
          {this.state.law.title} - {this.state.law.dateCode}
        </h3>
        <PanelComponent
          title="Forskrifter som er hjemlet i loven"
          itemArray={this.state.regulations}
          values={["title"]}
        />
        <PanelComponent
          title="Relevante paragrafer i loven"
          itemArray={this.state.subSections}
          extra="§"
          values={["number", "title"]}
        />
      </div>
    );
  }
}

export default LawDetails;
