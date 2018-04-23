import React from "react";

function Law(props: any) {
  return (
    <div className="law">
      <span>{props.law.title}</span>
    </div>
  );
}

export default Law;
