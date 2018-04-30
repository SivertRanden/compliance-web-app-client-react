import React from "react";
import axios from "axios";

class CategoryList extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    axios
      .get("/categories")
      .then(res => {
        //TODO: Mappe attributter fra api til category objekter
      })
      .catch(error => console.log(error));
  }

  render() {
    //TODO: Lage UI elementer for å vise kategoriene
    return <div className="categorylist" />;
  }
}

export default CategoryList;
