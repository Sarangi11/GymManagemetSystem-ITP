import  { useState } from 'react';
import axios from 'axios';

const ScheduleChangeForm = () => {
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the data matches the server's expectations
      const requestData = {
        Email: email,
        Request: request
      };

      await axios.post('http://localhost:3000/shedulech/add', requestData);
      setMessage('Request sent successfully!');
    } catch (error) {
      console.error('Error submitting request:', error);
      setMessage('Failed to send request. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'request') setRequest(value);
  };

  const clearMessage = () => {
    setMessage('');
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: `url('https://images.pexels.com/photos/28054/pexels-photo-28054.jpg?auto=compress&cs=tinysrgb&w=6000') no-repeat center center fixed`,
      backgroundSize: 'cover',
    }}>
      <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Schedule Change Request</h2>
      <form onSubmit={handleSubmit} style={{ width: '500px', padding: '50px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#808080' }}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Your Email"
          style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', boxSizing: 'border-box' }}
          required
        />
        <textarea
          name="request"
          value={request}
          onChange={handleChange}
          placeholder="Your Request"
          style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', minHeight: '100px', boxSizing: 'border-box' }}
          required
        />
        <button
          type="submit"
          style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '18px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          onClick={clearMessage}
        >
          Submit Request
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', textAlign: 'center', fontStyle: 'italic', color: '#333' }}>{message}</p>}
    </div>
  );
};

export default ScheduleChangeForm;
