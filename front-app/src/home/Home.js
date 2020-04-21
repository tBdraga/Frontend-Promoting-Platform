import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import Axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

//Components
import Post from '../components/post/Post.js';
import Profie from '../components/profile/Profile.js';
import Dashboard from '../components/dashboard/Dashboard.js';

import { connect } from 'react-redux';
import { getPostsPaginated } from '../redux/actions/dataActions';

class Home extends Component {
    state = {
        idUser: null,
        userRole: '',
        startPosition: 0,
        step: 3,
        hasMore: true
    }

    componentDidMount() {
        //load initial Posts
        this.fetchPostRecommendations();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user){
            this.setState({
                idUser: nextProps.user.idUser,
                userRole: nextProps.user.userRole
            })
            console.log('miau miau', nextProps.user.userRole);
        }
    }

    fetchPostRecommendations(){
        let startPosition = this.props.data.currentIndex;
        let step = this.props.data.step;

        let url = '/users/getPostRecommendationsPaginated/' + this.props.user.idUser;
        
        if(this.props.data.hasMore){
            this.props.getPostsPaginated(url, startPosition, step);
        }else{
            this.setState({
                hasMore: false
            })
        }
    }

    fetchNextPostRecommendations = () =>{
        //check if more posts are available
        if(this.state.startPosition >= this.props.data.posts.length){

            //request new posts
            this.fetchPostRecommendations();
        }else{
            this.setState({
                startPosition: this.state.startPosition + this.state.step
            })
        }
    }

    render() {
        const { posts, loading } = this.props.data;

        let recentPostsMarkup = !loading ? (
            posts.slice(0, this.state.startPosition + this.state.step).map(post => <Post post={post}></Post>)
        ) : <p></p>

        return (
            <Grid container spacing={10}>

                <Grid item sm={5} xs={10}>
                    <InfiniteScroll dataLength={posts.length} next={this.fetchNextPostRecommendations} hasMore={this.state.hasMore} loader={<h4>Loading ...</h4>} endMessage={<p><b>No more posts :(</b></p>}>
                        {recentPostsMarkup}
                    </InfiniteScroll>
                </Grid>
                <Grid item sm={7} xs={12}>
                    <Profie></Profie>

                    {' '}

                    <Dashboard></Dashboard>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
    menu: state.menu
})

const mapActionsToProps = {
    getPostsPaginated
}

Home.propTypes = {
    getPostsPaginated: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)((Home));