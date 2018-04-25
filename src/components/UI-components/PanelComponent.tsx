import React from "react";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

function PanelComponent(props: { title: string; itemArray: any[]; value: string }) {
  return (
    <Panel defaultExpanded>
      <Panel.Heading>
        <Panel.Title toggle componentClass="h3">
          {props.title}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <ListGroup>
          {props.itemArray.map(i => <ListGroupItem key={i.id}>{i[props.value]}</ListGroupItem>)}
        </ListGroup>
      </Panel.Collapse>
    </Panel>
  );
}

export default PanelComponent;
