import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const host = window.location.host;
  let apiBase = '';
  if (codespace) {
    apiBase = `${protocol}//${codespace}-8000.app.github.dev/api/workouts/`;
  } else {
    apiBase = `${protocol}//${host.replace(/:\d+$/, ':8000')}/api/workouts/`;
  }
  return apiBase;
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Workouts from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched Workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Workouts</h2>
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
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <td>{workout.id || idx + 1}</td>
                  <td>{workout.name || '-'}</td>
                  <td>{workout.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
