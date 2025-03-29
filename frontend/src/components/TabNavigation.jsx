import React from 'react';

function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="tab-navigation">
      <button 
        className={activeTab === 'active' ? 'active' : ''} 
        onClick={() => setActiveTab('active')}
      >
        Active Requests
      </button>
      <button 
        className={activeTab === 'myRequests' ? 'active' : ''} 
        onClick={() => setActiveTab('myRequests')}
      >
        My Requests
      </button>
      <button 
        className={activeTab === 'myDonations' ? 'active' : ''} 
        onClick={() => setActiveTab('myDonations')}
      >
        My Donations
      </button>
    </div>
  );
}

export default TabNavigation;