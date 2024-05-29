import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateAppointment() {
  const [appointments, setappointment] = useState({  name: '', DoctorName: '', age: '', gender: '' , date: '' , time: ''});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchtaskDetails();
  }, []);

  const fetchtaskDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/appointment/get/${id}`);
      setappointment(response.data);
    } catch (error) {
      console.error('Error fetching appointment details:', error);
    }
  };

  const handleChange = (e) => {
    setappointment({ ...appointments, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/appointment/update/${id}`, appointments);
      alert('Task updated successfully');
      navigate('/display');
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Error updating appointment');
    }
  };

  return (
     
    <div style={{backgroundSize: "cover" , minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px',color: 'black' }}>Update Appointment</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px',color: 'black' }}>Name :</label>
              <input name="name" value={appointments.name} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px',color: 'black' }}>Doctor Name:</label>
              <input name="DoctorName" value={appointments.DoctorName} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px',color: 'black' }}>Age:</label>
              <input name="age" type="text" value={appointments.age} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px',color: 'black' }}>Gender:</label>
              <input name="gender" type="text" value={appointments.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px',color: 'black' }}>Date:</label>
              <input name="date" type="date" value={appointments.date} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px',color: 'black' }}>Time:</label>
              <input name="time" type="time" value={appointments.time} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit" onClick={() => navigate('/appoint')} style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Update Request</button>
              <button type="button" onClick={() => navigate('/appoint')} style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#ccc', color: 'white', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateAppointment;
