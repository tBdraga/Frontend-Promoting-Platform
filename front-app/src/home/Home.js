import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import Axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from '../components/post/Post.js';
import Profie from '../components/profile/Profile.js';


class Home extends Component {
    state = {
        posts: [],
        startPosition: 0,
        step: 3,
        hasMore: true
    }

    componentDidMount() {
        //get initial Posts
        this.fetchInitialPosts();
    }

    fetchInitialPosts() {
        let startPosition = this.state.startPosition;
        let step = this.state.step;

        //get initial Posts
        Axios.post('/users/getPostRecommendationsPaginated/2', null, {
            params: {
                startPosition: startPosition,
                step: step
            }
        })
            .then((res) => {
                let posts = res.data

                this.setState({
                    posts: posts,
                });
            })
            .catch(err => console.log(err));
    }

    fetchNextPosts = () => {
        let step = this.state.step;
        let currentStartPosition = this.state.startPosition;

        let newStartPosition = currentStartPosition + step;

        //get new Posts
        Axios.post('/users/getPostRecommendationsPaginated/2', null, {
            params: {
                startPosition: newStartPosition,
                step: step
            }
        })
            .then((res) => {
                let posts = res.data

                if (posts) {
                    this.setState({
                        //append new Posts
                        posts: this.state.posts.concat(posts),
                        startPosition: newStartPosition
                    });
                }else{
                    this.setState({
                        hasMore: false
                    });

                    return;
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        let recentPostsMarkup = this.state.posts ? (
            this.state.posts.map(post => <Post post={post}></Post>)
        ) : <p></p>

        return (
            <Grid container spacing={10}>

                <Grid item sm={5} xs={10}>
                    <InfiniteScroll dataLength={this.state.posts.length} next={this.fetchNextPosts} hasMore={this.state.hasMore} loader={<h4>Loading ...</h4>} endMessage={<p><b>No more posts :(</b></p>}>
                        {recentPostsMarkup}
                    </InfiniteScroll>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profie></Profie>
                </Grid>
            </Grid>
        );
    }
}

export default Home;