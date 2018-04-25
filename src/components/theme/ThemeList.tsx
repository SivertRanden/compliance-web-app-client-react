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
      .then(response => {
        const dataFromServer = {
          themes: response.data
        };
        const newState = Object.assign({}, this.state, {
          themes: dataFromServer.themes
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
              <th>
                Status pr {this.state.themes[0] ? this.state.themes[0].last_status_check : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.themes.map(t => (
              <tr key={t.id_theme}>
                <td>
                  <Link to={"/themes/" + t.id_theme}>
                    {t.id_theme}. {t.title}
                  </Link>
                </td>
                <td>{t.nr_of_documents}</td>
                <td>{t.theme_status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ThemeList;
