import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: 0,
      count: 0,
      repos: [],
      sortBy: 'size',
      order: -1,
    }
    this.render = this.render.bind(this);
    this.search = this.search.bind(this);
    this.refresh = this.refresh.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.refresh();
  }

  search (username) {
    console.log(`${username} was searched`);
    // TODO
    $.ajax('/repos',
    {
      contentType: 'application/JSON',
      data: JSON.stringify({username}),
      method: 'POST',
      success: data => {
        if (typeof data === 'string') {
          alert(`${data} repos from ${username} added to database.`)
        } else {
          alert(`Encountered errors when adding repos from ${username}. See console for more details.`)
          console.log(data);
        }
        this.refresh();
      }
    } )
  }

  refresh () {

    $.ajax(`/repos/${this.state.sortBy}@${this.state.order.toString()}`,
    {
      method: 'GET',
      dataType: 'json',
      success: data => {
        this.setState({users: data[0], count: data[1], repos: data[2]});
        this.render();
      },
      error: (jqxhr, textStatus, errorThrown) => {
        console.log('refresh ajax error', textStatus)
      }
    })
  }
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList count={this.state.count} repos={this.state.repos} handleClick={this.handleClick} sortBy={this.state.sortBy} order={this.state.order} users={this.state.users}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }

  handleClick(e) {
    if (this.state.sortBy === e.target.innerText.toLowerCase()) {
      this.setState({order: this.state.order * -1});
    } else {
      this.setState({sortBy: e.target.innerText.toLowerCase(), order: -1})
    }
    $.ajax(`/repos/${this.state.sortBy}@${this.state.order.toString()}`,
    {
      method: 'GET',
      dataType: 'json',
      success: data => {
        this.setState({users: data[0], count: data[1], repos: data[2]});
        this.refresh();
      },
      error: (jqxhr, textStatus, errorThrown) => {
        console.log('render ajax error', textStatus)
      }
    })

  }
}

ReactDOM.render(<App />, document.getElementById('app'));