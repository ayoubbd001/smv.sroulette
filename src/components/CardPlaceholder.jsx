import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

export default function CardPlaceholder() {
  return (
    <div className="col-lg-3 col-sm-6 col-md-4 col-xs-6 my-3">
      <Card>
        <Placeholder style={{ height: "200px", width: "100%" }} />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />
            </Placeholder>
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  );
}
