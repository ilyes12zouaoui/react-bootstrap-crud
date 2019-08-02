import React, { Component } from "react";
import _ from "lodash";
import { withRouter } from "react-router";
import { Button, Form, FormInput, Container } from "react-bootstrap";

class FormUpdate extends Component {
  state = {
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    isFormTouched: false,
    globalError: null
  };

  onInputChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value, isFormTouched: true });
  };

  verifyTitleInput = () => {
    const { title } = this.state;
    return title != "" && title.length >= 3;
  };
  verifyDescriptionInput = () => {
    const { description } = this.state;
    return description != "" && description.length >= 5;
  };
  verifyImageUrlInput = () => {
    const { imageUrl } = this.state;
    return imageUrl != "";
  };

  verifyFormInputs = () => {
    return (
      this.verifyDescriptionInput() &&
      this.verifyImageUrlInput() &&
      this.verifyTitleInput()
    );
  };
  onCancel = () => {
    this.props.history.push("/blogs");
  };

  onFormSubmit = event => {
    event.preventDefault();

    if (this.verifyFormInputs()) {
      this.props.appRouterStateManager.updateBlog(
        this.state.id,
        this.state.title,
        this.state.description,
        this.state.imageUrl
      );

      this.props.history.push("/blogs");
    }
    this.setState({
      globalError: "failed verify your inputs values",
      isFormTouched: true
    });
  };
  componentDidMount() {
    const { appRouterStateManager, match } = this.props;
    //get current blog id from url path param
    const currentBlogId = match.params.id;
    const currentBlog = appRouterStateManager.getBlogById(currentBlogId);
    this.setState({ ...currentBlog });
  }

  render() {
    const {
      globalError,
      description,
      title,
      imageUrl,
      isFormTouched
    } = this.state;

    return (
      <Container style={{ minHeight: "70vh" }}>
        <h1 className="display-4">Update blog</h1>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group controlId="formGroupTitle">
            <Form.Label>Title :</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter title"
              name="title"
              value={title}
              onChange={this.onInputChange}
              isValid={isFormTouched && this.verifyTitleInput()}
              isInvalid={isFormTouched && !this.verifyTitleInput()}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              title is required, minimum length 3
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGroupDescription">
            <Form.Label>Description :</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="enter description"
              name="description"
              value={description}
              onChange={this.onInputChange}
              isValid={isFormTouched && this.verifyDescriptionInput()}
              isInvalid={isFormTouched && !this.verifyDescriptionInput()}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              description is required, minimum length 5
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGroupImageUrl">
            <Form.Label>Image url :</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter image url"
              name="imageUrl"
              value={imageUrl}
              onChange={this.onInputChange}
              isValid={isFormTouched && this.verifyImageUrlInput()}
              isInvalid={isFormTouched && !this.verifyImageUrlInput()}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              imageUrl is required
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            update
          </Button>
          <Button variant="primary" className="ml-2" onClick={this.onCancel}>
            cancel
          </Button>
          {globalError && (
            <div className="small mt-2" style={{ color: "red" }}>
              {globalError}
            </div>
          )}
        </Form>
      </Container>
    );
  }
}

export default withRouter(FormUpdate);
