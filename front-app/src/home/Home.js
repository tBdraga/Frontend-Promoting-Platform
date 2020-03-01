import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import Axios from "axios";

import Post from '../components/post/Post.js';
import { red } from "@material-ui/core/colors";


class Home extends Component {
    state = {
        posts: [],
    }

    componentDidMount() {
        let posts = [];

        //get new Posts
        Axios.get('/posts/getAllPosts')
            .then((res) => {
                posts = res.data

                this.setState({
                    posts: posts
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        let recentPostsMarkup = this.state.posts ? (
            this.state.posts.map(post => <Post post={post}></Post>)
        ) : <p>Loading ...</p>

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                    <p>Content ...</p>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile ...</p>
                </Grid>
            </Grid>
        );
    }
}

export default Home;