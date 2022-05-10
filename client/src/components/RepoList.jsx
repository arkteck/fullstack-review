import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.count} repos in the database. Here are the top 25 sorted by {props.sortBy}, {props.order === 1 ? 'ascending' : 'descending'}.
    <table>
      <thead>
      <tr>
        <th onClick={props.handleClick}>github_id</th>
        <th onClick={props.handleClick}>name</th>
        <th onClick={props.handleClick}>username</th>
        <th onClick={props.handleClick}>description</th>
        <th onClick={props.handleClick}>created_at</th>
        <th onClick={props.handleClick}>updated_at</th>
        <th onClick={props.handleClick}>size</th>
        <th onClick={props.handleClick}>stargazers</th>
        <th onClick={props.handleClick}>watchers</th>
        <th onClick={props.handleClick}>forks</th>
        <th onClick={props.handleClick}>open_issues</th>
      </tr>
      </thead>
      <tbody>
      {props.repos.map(repo => {
        let createdAt = new Date(repo.created_at);
        let updatedAt = new Date(repo.updated_at);

      return (
        <tr>
        <td>{repo.github_id}</td>
        <td><a href={repo.url}>{repo.name}</a></td>
        <td>{repo.username}</td>
        <td>{repo.description}</td>
        <td>{createdAt.toDateString()}</td>
        <td>{updatedAt.toDateString()}</td>
        <td>{repo.size}</td>
        <td>{repo.stargazers}</td>
        <td>{repo.watchers}</td>
        <td>{repo.forks}</td>
        <td>{repo.open_issues}</td>
        </tr>
      )
    })}
    </tbody>
    </table>
  </div>
)

export default RepoList;