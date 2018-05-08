import React from "react";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

// This is a reusable component that will make a collapsable "panel" that
// contains a list of items
// Title is the title of the panel
// itemArray is an array of the items you want to list, must have an id attribute
// values are the values of the items you want written out
// Link is an optional attribute that will make each item have a link
function PanelComponent(props: {
  title: string;
  itemArray: any[];
  extra?: string;
  values: string[];
  seperator?: string;
  link?: string;
}) {
  return (
    <Panel defaultExpanded>
      <Panel.Heading>
        <Panel.Title toggle componentClass="h3">
          {props.title}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <ListGroup>
          {/* If link is supplied, it will show link, if not it will not */}
          {props.itemArray.map(i => (
            <ListGroupItem key={i.id}>
              {props.link ? (
                <Link to={props.link + i.id}>
                  {props.extra} {props.values.map(v => i[v] + " ")}
                </Link>
              ) : (
                <div>
                  {props.extra} {props.values.map(v => i[v] + " ")}
                </div>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Panel.Collapse>
    </Panel>
  );
}

export default PanelComponent;
