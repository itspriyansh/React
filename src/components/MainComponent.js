import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        comments: state.comments,
        leaders: state.leaders
    };
};

class Main extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            selectedDish: null
        };
    }
    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }
    render(){
        const HomePage = () => {
            return (
                <Home
                    dish = {this.props.dishes.filter((dishes) => dishes.featured)[0]}
                    promotion = {this.props.promotions.filter((promotions) => promotions.featured)[0]}
                    leader = {this.props.leaders.filter((leaders) => leaders.featured)[0]}
                />
            );
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail
                    dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId===parseInt(match.params.dishId,10))}
                />
            );
        };

        return (
        <div>
            <Header />
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={Contact} />
                <Redirect to='/home' />
            </Switch>
            <Footer />
        </div>    
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));