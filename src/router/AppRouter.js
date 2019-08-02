import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import generateUniqueId from "../helpers/generateUniqueId";

import _ from "lodash";

import Home from "./Home";
import PageNotFound from "./PageNotFound";
import Header from "./Header";
import Footer from "./Footer";

import { Blogs, FormCreate, FormUpdate } from "../blogs";

// import Blogs from "./Blogs";

class AppRouter extends Component {
  state = {
    listBlogs: []
  };

  appRouterStateManager = {
    getBlogs: () => {
      //return an immutable copy of listBlogs list
      return _.cloneDeep(this.state.listBlogs);
    },
    getBlogById: id => {
      const { listBlogs } = this.state;
      const blog = listBlogs.find(blog => {
        return blog.id == id;
      });
      //return an immutable copy of blog object
      return _.cloneDeep(blog);
    },
    removeBlogById: id => {
      const { listBlogs } = this.state;

      const newListBlogs = listBlogs.filter(blog => {
        return blog.id != id;
      });

      this.setState({
        listBlogs: newListBlogs
      });
      return true;
    },
    updateBlog: (id, title, description, imageUrl) => {
      const { listBlogs } = this.state;

      let newListBlogs = listBlogs.map(blog => {
        if (blog.id == id) return { id, title, description, imageUrl };
        return blog;
      });
      this.setState({ listBlogs: newListBlogs });
      return true;
    },
    createBlog: (title, description, imageUrl) => {
      const { listBlogs } = this.state;
      const id = generateUniqueId();
      const newListBlogs = [...listBlogs, { id, title, description, imageUrl }];
      //or const newListBlogs = listBlogs.concat({ id, title, description, imageUrl });
      this.setState({ listBlogs: newListBlogs });
      return true;
    }
  };

  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/blogs/create"
            exact
            render={() => (
              <FormCreate appRouterStateManager={this.appRouterStateManager} />
            )}
          />
          <Route
            path="/blogs/update/:id"
            exact
            render={() => (
              <FormUpdate appRouterStateManager={this.appRouterStateManager} />
            )}
          />

          <Route
            path="/blogs"
            exact
            render={() => (
              <Blogs appRouterStateManager={this.appRouterStateManager} />
            )}
          />

          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default AppRouter;
