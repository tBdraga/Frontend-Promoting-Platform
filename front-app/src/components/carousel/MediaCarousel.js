import React, { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Axios from "axios";

class MediaCarousel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

    componentDidMount() {
        this.getPostMedia(this.props.post);
    }

    renderImageData() {
        return this.state.images.map((image) => {
            return (
                <div>
                    <img src={`data:image/jpeg;base64,${image}`} />
                </div>
            )
        })
    }

    getPostMedia(post) {
        let getMediaUrl = '/posts/getPostMedia/' + post.idPost;

        //get all post media
        Axios.get(getMediaUrl)
            .then((res) => {
                let media = res.data;

                this.setState({
                    images: media
                });
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Carousel showThumbs={false} showArrows={true} infiniteLoop={true} showStatus={false}>
                {this.renderImageData()}
            </Carousel>
        );
    }
}

export default MediaCarousel;