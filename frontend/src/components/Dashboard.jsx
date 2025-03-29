import React from 'react';

function Dashboard({ stats }) {
  return (
    <div className="dashboard">
      <div className="stat-card">
        <h3>Total Donations</h3>
        <p className="stat-value">{stats.totalDonations}</p>
      </div>
      <div className="stat-card">
        <h3>Active Requests</h3>
        <p className="stat-value">{stats.activeRequests}</p>
      </div>
      <div className="stat-card">
        <h3>Parents Helped</h3>
        <p className="stat-value">{stats.mothersHelped}</p>
      </div>
      <div className="stat-card">
        <h3>Items Still Needed</h3>
        <p className="stat-value">{stats.itemsNeeded}</p>
      </div>
    </div>
  );
}

export default Dashboard;