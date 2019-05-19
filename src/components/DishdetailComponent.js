import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';

class DishDetail extends Component{
    render() {
        if(this.props.dish!=null){
            const dish = this.props.dish;
            const comments = dish.comments.map((comment) => {
                return(
                    <div tag="li">
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                );
            });
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg src={dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1" list>
                            <h2>Comments</h2>
                            {comments}
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }
}
export default DishDetail;