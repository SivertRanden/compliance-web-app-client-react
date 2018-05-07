import React from "react";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

function PanelComponent(props: {
  title: string;
  itemArray: any[];
  extra?: string;
  values: string[];
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
