import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const host = window.location.host;
  let apiBase = '';
  if (codespace) {
    apiBase = `${protocol}//${codespace}-8000.app.github.dev/api/users/`;
  } else {
    apiBase = `${protocol}//${host.replace(/:\d+$/, ':8000')}/api/users/`;
  }
  return apiBase;
};

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Users from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched Users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Users</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id || idx}>
                  <td>{user.id || idx + 1}</td>
                  <td>{user.username || '-'}</td>
                  <td>{user.name || '-'}</td>
                  <td>{user.email || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
