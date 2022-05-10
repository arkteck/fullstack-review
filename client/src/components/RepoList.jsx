import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.count} repos. Here are the top 25 based on size.
    <table>
      <thead>
      <tr>
        <th>github_id</th>
        <th>name</th>
        <th>username</th>
        <th>description</th>
        <th>created_at</th>
        <th>updated_at</th>
        <th>size</th>
        <th>stargazers</th>
        <th>watchers</th>
        <th>forks</th>
        <th>open_issues</th>
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