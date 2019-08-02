import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
export default ({
  title,
  description,
  imageUrl,
  onRemoveBlog,
  onClickShowUpdateForm
}) => {
  return (
    <Card className="text-center">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Button
          variant="primary"
          className="m-2"
          onClick={onClickShowUpdateForm}
        >
          update
        </Button>
        <Button variant="primary" className="m-2" onClick={onRemoveBlog}>
          delete
        </Button>
      </Card.Body>
    </Card>
  );
};
