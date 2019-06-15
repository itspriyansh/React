import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dish.id, values.rating, values.author, values.comment);
    }

    render(){
        if(this.props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }else if(this.props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>       
                    </div>
                </div>
            );
        }else if(this.props.dish!=null){
            const comments = this.props.comments.map((comment) => {
                return(
                    <Fade in>
                        <div tag="li">
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    </Fade>
                );
            });
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='\menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <FadeTransform in
                                transformProps={{
                                    exitTransform: 'scale(0.5) translateY(-50%)'
                                }}>
                                <Card>
                                    <CardImg src={baseUrl + this.props.dish.image} alt={this.props.dish.name} />
                                    <CardBody>
                                        <CardTitle>{this.props.dish.name}</CardTitle>
                                        <CardText>{this.props.dish.description}</CardText>
                                    </CardBody>
                                </Card>
                            </FadeTransform>
                        </div>
                        <div className="col-12 col-md-5 m-1" list>
                            <h2>Comments</h2>
                            <Stagger in>{comments}</Stagger>
                            <Button outline onClick={this.toggleModal}>
                                <span class="fa fa-pencil"></span> Submit Comment
                            </Button>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author"
                                            id="author"
                                            name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required,
                                                minLength: minLength(3),
                                                maxLength: maxLength(15)
                                            }} />
                                        <Errors className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: "Required",
                                                minLength: "Must be greater than 2 charaters",
                                                maxLength: "Must be 15 characters or less"
                                            }} />
                                    </Col>
                                </Row>
                                <Row class="form-control">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment"
                                            id="comment"
                                            name="comment"
                                            rows="5" className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group mt-3">
                                    <Col md={12}>
                                        <Button color="primary" type="submit">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }
};
export default DishDetail;