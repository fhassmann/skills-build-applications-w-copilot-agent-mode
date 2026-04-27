import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const host = window.location.host;
  let apiBase = '';
  if (codespace) {
    apiBase = `${protocol}//${codespace}-8000.app.github.dev/api/leaderboard/`;
  } else {
    apiBase = `${protocol}//${host.replace(/:\d+$/, ':8000')}/api/leaderboard/`;
  }
  return apiBase;
};

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Leaderboard from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Leaderboard</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={entry.id || idx}>
                  <td>{entry.id || idx + 1}</td>
                  <td>{entry.name || entry.username || '-'}</td>
                  <td>{entry.score || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
