import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const host = window.location.host;
  let apiBase = '';
  if (codespace) {
    apiBase = `${protocol}//${codespace}-8000.app.github.dev/api/teams/`;
  } else {
    apiBase = `${protocol}//${host.replace(/:\d+$/, ':8000')}/api/teams/`;
  }
  return apiBase;
};

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Teams from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched Teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Teams</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={team.id || idx}>
                  <td>{team.id || idx + 1}</td>
                  <td>{team.name || '-'}</td>
                  <td>{team.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
