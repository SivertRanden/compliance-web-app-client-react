import React from "react";
const { ListGroup, ListGroupItem } = require("react-bootstrap");
import axios from "axios";
import { Link } from "react-router-dom";

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
        console.log(dataFromServer);
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
        <ListGroup>
          {this.state.themes.map(t => (
            <ListGroupItem key={t.id_theme}>
              <Link to={"/themes/" + t.id_theme}>
                {t.id_theme}. {t.title}
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default ThemeList;
