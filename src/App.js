import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_QUERY = 'query=';
const URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_QUERY}${DEFAULT_QUERY}`;

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Nik G',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Another Nik G',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'Moop',
    url: 'https://bloop.js.org/',
    author: 'Another Nik G',
    num_comments: 2,
    points: 5,
    objectID: 2,
  },
];

const isSearched = (searchTerm) => (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const filteredWords = words.filter(word => word.length > 6);
console.log(filteredWords)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updatedList});
  }

  render() {
    // const helloWorld = 'Welcome to the Learning experience';
    const {
      list, 
      searchTerm
    } = this.state;


    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value = {searchTerm} 
            onChange ={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table 
          list={list} 
          searchTerm={searchTerm} 
          onDismiss={this.onDismiss}/>
      </div>
    );
  }
}

// class Search extends Component {
  // render() {
    // const {value, onChange, children} = this.props
//Turns out you can also destructure function parameters (eg props)

 const Search = ({value, onChange, children}) =>
      <form>
        {children}
        <input type="text" 
        value = {value}
        onChange = {onChange}/>
      </form>

const largeColumn = {
  width: '40%'
}

const mediumColumn = {
  width: '30%'
}

const smallColumn = {
  width: '10%'
}

const Table = ({list, searchTerm, onDismiss}) =>
  <div className="table"> {
      list.filter(
        isSearched(searchTerm)
      ).map(item => 
        <div key={item.objectID} className="table-row">
          <span style = {largeColumn}><a href = {item.url}>{item.title}</a></span>
          <span style = {mediumColumn}>{item.author}</span>
          <span style = {smallColumn}>{item.num_comments}</span>
          <span style = {smallColumn}>{item.points}</span>
          <span style = {smallColumn}>
            <Button onClick={() => onDismiss(item.objectID)}>
              Dismiss
            </Button>
          </span>
        </div>
      )
  }</div>

const Button = ({
      onClick, 
      // Turns out that you can default values during destructuring.
      className = '', 
      children}) =>
  <button 
    onClick = {onClick}
    className = {className}
    type = "button"
  > 
    {children}
  </button>

export default App;
