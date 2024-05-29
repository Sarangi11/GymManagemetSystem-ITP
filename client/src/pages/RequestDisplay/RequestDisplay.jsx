import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: 'url("https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundSize: 'cover',
    color: '#000',
    minHeight: '100vh',
  },
  scheduleItem: {
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '10px',
    padding: '50px',
    color: '#fff',
    backgroundColor: 'rgba(128, 128, 128, 0.6)',
  },
  emailLabel: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    
  },
  h1:{
    color: '#fff',
    fontSize: '1.5rem',
    ontFamily:'Roboto, sans-serif',

  },
  requestLabel: {
    fontSize: '1.2rem',
  },
  deleteButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    background: 'red',
    color: '#fff',
  },
  notification: {
    position: 'fixed',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    borderRadius: '5px',
    color: '#fff',
    backgroundColor: '#333',
    zIndex: '999',
    display: 'none',
  },
};

const RequestDisplay = () => {
  const [schedules, setSchedules] = useState([]);
  const [notification, setNotification] = useState({ message: '', success: true });

  useEffect(() => {
    // Fetch schedules from backend when the component mounts
    fetchSchedules();
  }, []);

  useEffect(() => {
    // Hide the notification after 3 seconds
    const timer = setTimeout(() => {
      setNotification({ message: '', success: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  const fetchSchedules = async () => {
    try {
      // Make GET request to backend endpoint
      const response = await axios.get('http://localhost:3000/shedulech');
      // Update state with fetched schedules
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Make DELETE request to backend endpoint with schedule id
      await axios.delete(`http://localhost:3000/shedulech/delete/${id}`);
      // Refetch schedules after deletion
      fetchSchedules();
      // Show success notification
      setNotification({ message: 'Schedule deleted successfully', success: true });
    } catch (error) {
      console.error('Error deleting schedule:', error);
      // Show error notification
      setNotification({ message: 'Failed to delete schedule. Please try again.', success: false });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Schedules Notification</h1>
      <ul style={{ display: "flex", justifyContent: "center", flexWrap: "wrap"  }}>
        {schedules.map((schedule) => (
          <li key={schedule._id} style={styles.scheduleItem}>
            <button
              style={styles.deleteButton}
              onClick={() => handleDelete(schedule._id)}
            >
              Delete
            </button>
            <p style={styles.emailLabel}>Email: {schedule.Email}</p>
            <p style={styles.requestLabel}>Request: {schedule.Request}</p>
          </li>
        ))}
      </ul>
      <div
        style={{
          ...styles.notification,
          display: notification.message ? 'block' : 'none',
          backgroundColor: notification.success ? '#5cb85c' : '#d9534f',
        }}
      >
        {notification.message}
      </div>
    </div>
  );
};

export default RequestDisplay;
