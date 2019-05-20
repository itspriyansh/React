import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';

class Main extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS,
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
                    dish = {this.state.dishes.filter((dishes) => dishes.featured)[0]}
                    promotion = {this.state.promotions.filter((promotions) => promotions.featured)[0]}
                    leader = {this.state.leaders.filter((leaders) => leaders.featured)[0]}
                />
            );
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail
                    dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId===parseInt(match.params.dishId,10))}
                />
            );
        };

        return (
        <div>
            <Header />
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={Contact} />
                <Redirect to='/home' />
            </Switch>
            <Footer />
        </div>    
        );
    }
}

export default Main;