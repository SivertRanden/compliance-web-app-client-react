import React from "react";
const { ListGroup, ListGroupItem } = require("react-bootstrap");
import axios from "axios";

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
        <ListGroup>
          {this.state.categories.map(cat => (
            <ListGroupItem key={cat.id}>
              {cat.id}. {cat.title}
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
