import React, { Component } from "react";
import Blog from "./Blog";
import { CardColumns, Container } from "react-bootstrap";
import { withRouter } from "react-router";

class Blogs extends Component {
  onClickShowUpdateForm = id => {
    const { history } = this.props;
    history.push(`/blogs/update/${id}`);
  };

  render() {
    const { appRouterStateManager } = this.props;
    const blogs = appRouterStateManager.getBlogs();
    if (!blogs.length)
      return (
        <Container style={{ minHeight: "70vh" }}>
          <h1
            className="display-3 mt-5 text-center"
            style={{ minHeight: "70vh" }}
          >
            there is no blogs add one pls :D
          </h1>
        </Container>
      );
    return (
      <Container style={{ minHeight: "70vh" }}>
        <CardColumns>
          {blogs.map(blog => {
            return (
              <Blog
                key={blog.id}
                onClickShowUpdateForm={() =>
                  this.onClickShowUpdateForm(blog.id)
                }
                onRemoveBlog={() =>
                  appRouterStateManager.removeBlogById(blog.id)
                }
                {...blog}
              />
            );
          })}
        </CardColumns>
      </Container>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onRemoveBlog: id => {
//       dispatch(actions.remove(id));
//     },
//     onRemoveBlogAsync: id => {
//       dispatch(actions.removeAsync(id));
//     }
//   };
// };

export default withRouter(Blogs);
