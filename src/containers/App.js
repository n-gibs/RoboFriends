import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import './App.css';

import {setSearchField} from '../action.js';
const mapStateToProps = state => {
  return{
    searchField: state.searchField
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

//smart component because of state
class App extends Component{
  constructor() {
    super()
    this.state = {
      robots: []
      //searchField: ''
    }
  }

  componentDidMount(){

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({robots: users}));
  
  }

  // onSearchChange = (event) => {
  //   //when there is a change run function
  //   this.setState({searchField: event.target.value})
  // }

  render(){
    const { robots} = this.state;
    const {searchField, onSearchChange} = this.props;
    //update state to what matches the searchfield
    const filteredRobots = robots.filter(robots =>{
      return robots.name.toLowerCase().includes(searchField.toLowerCase())
    })
    //if there are no robots
    return !robots.length ?
    //show loading
      <h1>Loading....</h1> :
      //else
        (
        <div className = 'tc'>
          <h1 className = 'f1'>Robo Friends</h1>
          <SearchBox searchChange = {onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots = {filteredRobots}/>
            </ErrorBoundary>
          </Scroll>
        </div>
        );
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
