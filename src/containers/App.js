import React, {Component} from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import './App.css';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary.js';

//smart component because of state
class App extends Component{
  constructor() {
    super()
    this.state = {
      robots: [],
      searchField: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({robots: users}));
  
  }

  onSearchChange = (event) => {
    //when there is a change run function
    this.setState({searchField: event.target.value})
  }

  render(){
    const { robots, searchField} = this.state;
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
          <SearchBox searchChange = {this.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots = {filteredRobots}/>
            </ErrorBoundary>
          </Scroll>
        </div>
        );
    
  }
}
export default App;
