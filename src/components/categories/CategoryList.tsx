import React from "react";
const { ListGroup, ListGroupItem } = require("react-bootstrap");
import axios from "axios";
import { Link } from "react-router-dom";

class CategoryList extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    this.getCategoriesFromServer();
  }

  render() {
    return (
      <div className="categorylist">
        <h3>Kategorier</h3>
        <ListGroup>
          {this.state.categories.map(cat => (
            <ListGroupItem key={cat.id}>
              <Link to={"/categories/" + cat.id + "/answers"}>
                {cat.id}. {cat.title}
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }

  getCategoriesFromServer() {
    axios
      .get("/categories")
      .then(res => {
        const categoriesFromServer = res.data.map(cat => {
          return {
            id: cat.id_category,
            title: cat.title
          };
        });
        const newState = Object.assign({}, this.state, {
          categories: categoriesFromServer
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
}

export default CategoryList;
