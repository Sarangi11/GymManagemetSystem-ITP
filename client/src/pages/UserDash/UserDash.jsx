import  { useState } from 'react';
import { Link } from 'react-router-dom';

function UserDash() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1
      }}>
        <div
          style={{
            cursor: 'pointer',
            marginBottom: '20px',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: activeTab === 'home' ? '#555' : '#333',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '18px'
          }}
          onClick={() => handleTabClick('home')}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#333', textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>
            Doctor Add Appointment
          </div>
          <div style={{ paddingLeft: '10px' }}>
            <div style={{ padding: '10px', cursor: 'pointer' }}>
              <Link to="/addapoint" style={{ textDecoration: 'none', color: 'white' }}>Add Appointments</Link>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#333', textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>
            Trainer Bookings
          </div>
          <div style={{ paddingLeft: '10px' }}>
            <div style={{ padding: '10px', cursor: 'pointer' }}>
              <Link to="/addSchedule" style={{ textDecoration: 'none', color: 'white' }}>Add Bookings</Link>
            </div>
          </div>
        </div>

      </div>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {activeTab === 'home' && (
          <div>
            <h1>Welcome to Admin Dashboard</h1>
            <p>This is the home page of the User dashboard.</p>
          </div>
        )}
        {/* Add routes for other pages here */}
      </div>
    </div>
  );
}

export default UserDash;
