import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = '';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_QUERY = 'query=';

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const filteredWords = words.filter(word => word.length > 6);
console.log(filteredWords)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  fetchSearchTopStories(searchTerm) {
    fetch (`${PATH_BASE}${PATH_SEARCH}?${PARAM_QUERY}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
    //This stops the default behavior of a submitted form in the browser that causes a page refresh.
    event.preventDefault();
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      // Basically copies everything from subsequent arguments into {}, empty object
      // result: Object.assign({}, this.state.result, {hits: updatedHits} )
      // or just use the spread operator on the map
      result: {...this.state.result, hits: updatedHits}
    });
  }

  render() {
    // const helloWorld = 'Welcome to the Learning experience';
    const {
      result, 
      searchTerm
    } = this.state;


    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value = {searchTerm} 
            onChange ={this.onSearchChange}
            onSubmit ={this.onSearchSubmit}>
            Search
          </Search>
        </div>
        {
          result ?
            <Table 
              list={result.hits} 
              onDismiss={this.onDismiss}/>
            : null
        }
      </div>
    );
  }
}

// class Search extends Component {
  // render() {
    // const {value, onChange, children} = this.props
//Turns out you can also destructure function parameters (eg props)

 const Search = ({value, onChange, onSubmit, children}) =>
      <form onSubmit = {onSubmit}>
        {children}
        <input type="text" 
        value = {value}
        onChange = {onChange}
        />
        <button type = "submit">
          children
        </button>
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

const Table = ({list, onDismiss}) =>
  <div className="table"> {
      list.map(item => 
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
