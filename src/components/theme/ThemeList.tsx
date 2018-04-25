import React from "react";
const { Table } = require("react-bootstrap");
import axios from "axios";
import { Link } from "react-router-dom";

// const statuscodes = {
//   green: "Godkjent og implementert i styringssystem",
//   yellow: "Arbeid pågår",
//   orange: "Må revideres"
// };

class ThemeList extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      themes: []
    };
  }

  componentDidMount() {
    axios
      .get("/themes")
      .then(res => {
        const themesFromServer = res.data.map(t => {
          return {
            id: t.id_theme,
            title: t.title,
            nrOfDocuments: t.nr_of_documents,
            lastStatus: t.last_status_check,
            status: t.theme_status
          };
        });
        const newState = Object.assign({}, this.state, {
          themes: themesFromServer
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="themelist">
        <Table bordered>
          <thead>
            <tr>
              <th>Temanavn</th>
              <th>Antall tilhørende dokumenter</th>
              <th>Status pr {this.state.themes[0] ? this.state.themes[0].lastStatus : ""}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.themes.map(t => (
              <tr key={t.id}>
                <td>
                  <Link to={"/themes/" + t.id}>
                    {t.id}. {t.title}
                  </Link>
                </td>
                <td>{t.nrOfDocuments}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ThemeList;
