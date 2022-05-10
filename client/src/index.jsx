import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      repos: []
    }
    this.render = this.render.bind(this);
    this.search = this.search.bind(this);

  }

  search (username) {
    console.log(`${username} was searched`);
    // TODO
    $.ajax('/repos',
    {
      contentType: 'application/JSON',
      data: JSON.stringify({username}),
      method: 'POST',
      success: this.render,
    } )
  }

  render () {
    $.ajax('/repos',
    {
      method: 'GET',
      dataType: 'json',
      success: data => {
        this.setState({count: data[0], repos: data[1]});
      },
      error: (jqxhr, textStatus, errorThrown) => {
        console.log('render ajax error', textStatus)
      }
    })

    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList count={this.state.count} repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));