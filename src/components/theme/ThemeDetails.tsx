import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import PanelComponent from "../UI-components/PanelComponent";
import { Link } from "react-router-dom";

class ThemeDetails extends React.Component<RouteComponentProps, any> {
  categories;
  constructor(props) {
    super(props);
    this.state = {
      theme: {},
      laws: [],
      regulations: [],
      answers: [],
      implementation: {}
    };
    this.categories = Array<{ title; id; answers: Array<{ id; title }> }>();
  }

  componentDidMount() {
    this.getThemesFromServer();
  }

  render() {
    return (
      <div className="themedetails">
        <h3>
          {this.state.theme.id}. {this.state.theme.title}
        </h3>
        <h4>
          <Link to={"/themes/" + this.state.theme.id + "/implementation"}>
            Se implementasjon
          </Link>
        </h4>
        <PanelComponent
          title="Lover"
          itemArray={this.state.laws}
          values={["title"]}
          link={"/themes/" + this.state.theme.id + "/laws/"}
          expanded
        />
        <PanelComponent
          title="Forskrifter"
          itemArray={this.state.regulations}
          values={["title"]}
          link={"/themes/" + this.state.theme.id + "/regulations/"}
          expanded
        />
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Svar
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            {this.categories.map(cat => (
              <div key={cat.id}>
                <h5>
                  <b>
                    <Link to={"/categories/" + cat.id + "/answers"}>{cat.title}</Link>
                  </b>
                </h5>
                <ListGroup>
                  {cat.answers.map(a => (
                    <ListGroupItem key={a.id}>
                      <Link to={"/answers/" + a.id}>{a.title}</Link>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            ))}
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }

  getThemesFromServer() {
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
            title: ans.title,
            categoryName: ans.category_title,
            categoryId: ans.category_id
          };
        });
        const implementationFromServer = {
          id: res.data[4].id_implementation
        };
        this.makeCategories(answersFromServer);
        this.sortAnswersByCategory(answersFromServer);
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

  sortAnswersByCategory(answers) {
    for (const c of this.categories) {
      for (const a of answers) {
        if (c.title === a.categoryName) {
          c.answers.push(a);
        }
      }
    }
  }

  makeCategories(answers) {
    for (const a of answers) {
      if (!this.categories.some(c => c.title === a.categoryName)) {
        this.categories.push({ title: a.categoryName, id: a.categoryId, answers: Array<{}>() });
      }
    }
  }
}

export default ThemeDetails;
