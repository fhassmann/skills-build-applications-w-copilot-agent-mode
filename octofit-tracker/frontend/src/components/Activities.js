import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const host = window.location.host;
  let apiBase = '';
  if (codespace) {
    apiBase = `${protocol}//${codespace}-8000.app.github.dev/api/activities/`;
  } else {
    // fallback for local/dev
    apiBase = `${protocol}//${host.replace(/:\d+$/, ':8000')}/api/activities/`;
  }
  return apiBase;
};


function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Activities from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched Activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Activities</h2>
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
              {activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  <td>{activity.id || idx + 1}</td>
                  <td>{activity.name || '-'}</td>
                  <td>{activity.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
