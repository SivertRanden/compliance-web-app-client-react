import React from "react";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

function PanelComponent(props: {
  title: string;
  itemArray: any[];
  extra?: string;
  values: string[];
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
          {props.itemArray.map(i => (
            <ListGroupItem key={i.id}>
              {props.extra} {props.values.map(v => i[v] + " ")}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Panel.Collapse>
    </Panel>
  );
}

export default PanelComponent;
