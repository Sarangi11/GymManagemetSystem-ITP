import React, { useState } from 'react';
import axios from 'axios';
import './AddMonthlyReport.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { jsPDF } from 'jspdf';



const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
    paddingTop: '50px',
    backgroundImage: 'url("https://wallpapercave.com/wp/wp11235081.jpg")',
    backgroundSize: 'cover',
    backdropFilter: 'blur(8px)', // Apply a blur effect
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  },
  button: {
    marginTop: '10px',
  },
  pdfViewer: {
    margin: '10px auto',
  },
  pdfDownloadLink: {
    margin: '10px',
  },
};

const AddMonthlyReport = () => {
  
  const [formData, setFormData] = useState({
    month: '',
    year: '',
    total_number_of_trainers: '',
    total_number_of_clients: '',
    new_clients_acquired: '',
    client_retention_rate: '',
    total_sessions_conducted: '',
    average_attendance_rate: '',
    trainer_performance: [],
    highlights: '',
    challenges: '',
    goals_for_next_month: '',
    revenue: '',
    additional_notes: '',
    conclusion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTrainerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTrainers = [...formData.trainer_performance];
    updatedTrainers[index][name] = value;
    setFormData({ ...formData, trainer_performance: updatedTrainers });
  };

  const handleDateChange = (date) => {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    setFormData({ ...formData, month, year });
  };

  const addTrainer = () => {
    setFormData({
      ...formData,
      trainer_performance: [
        ...formData.trainer_performance,
        { trainer_name: '', number_of_clients: '', new_clients_acquired: '', sessions_conducted: '', average_attendance_rate: '' }
      ]
    });
  };

  const handleSubmit = async (e) => {
    const pdfDoc = new jsPDF();
  pdfDoc.text(20, 20, `Month: ${formData.month} ${formData.year}`);
  pdfDoc.text(20, 30, `Total Number of Trainers: ${formData.total_number_of_trainers}`);
  pdfDoc.text(20, 40, `Total Number of Clients: ${formData.total_number_of_clients}`);
  pdfDoc.text(20, 50, `New Clients Acquired: ${formData.new_clients_acquired}`);
  pdfDoc.text(20, 60, `Client Retention Rate: ${formData.client_retention_rate}`);
  pdfDoc.text(20, 70, `Total Sessions Conducted: ${formData.total_sessions_conducted}`);
  pdfDoc.text(20, 80, `Average Attendance Rate: ${formData.average_attendance_rate}`);

  // Trainer Performance
  pdfDoc.text(20, 90, 'Trainer Performance:');
  formData.trainer_performance.forEach((trainer, index) => {
    const startY = 100 + index * 50;
    pdfDoc.text(30, startY, `Trainer ${index + 1}: ${trainer.trainer_name}`);
    pdfDoc.text(30, startY + 10, `Number of Clients: ${trainer.number_of_clients}`);
    pdfDoc.text(30, startY + 20, `New Clients Acquired: ${trainer.new_clients_acquired}`);
    pdfDoc.text(30, startY + 30, `Sessions Conducted: ${trainer.sessions_conducted}`);
    pdfDoc.text(30, startY + 40, `Average Attendance Rate: ${trainer.average_attendance_rate}`);
  });

  const startYAdditional = 100 + formData.trainer_performance.length * 50;
  pdfDoc.text(20, startYAdditional, `Highlights: ${formData.highlights}`);
  pdfDoc.text(20, startYAdditional + 10, `Challenges: ${formData.challenges}`);
  pdfDoc.text(20, startYAdditional + 20, `Goals for Next Month: ${formData.goals_for_next_month}`);
  pdfDoc.text(20, startYAdditional + 30, `Revenue: ${formData.revenue}`);
  pdfDoc.text(20, startYAdditional + 40, `Additional Notes: ${formData.additional_notes}`);
  pdfDoc.text(20, startYAdditional + 50, `Conclusion: ${formData.conclusion}`);

  // Save PDF document
  pdfDoc.save('monthly_report.pdf');

  

    try {
      await axios.post('http://localhost:3000/Report/add', formData);
      alert('Monthly report added successfully!');
      // Optionally, reset the form after successful submission
      setFormData({
        month: '',
        year: '',
        total_number_of_trainers: '',
        total_number_of_clients: '',
        new_clients_acquired: '',
        client_retention_rate: '',
        total_sessions_conducted: '',
        average_attendance_rate: '',
        trainer_performance: [],
        highlights: '',
        challenges: '',
        goals_for_next_month: '',
        revenue: '',
        additional_notes: '',
        conclusion: ''
      });
    } catch (error) {
      console.error('Error adding monthly report:', error);
      alert('Failed to add monthly report. Please try again.');
    }
  };

  

  return (
    <div style={styles.container}>
      <h2 style={{marginBottom: "20px",fontSize:"40px",fontWeight: 'bold',color:"white"}}> Monthly Report</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Month:</label>
        <DatePicker
          selected={new Date(`${formData.year}-${formData.month}-01`)}
          onChange={handleDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          required
        />

<label>Total Number of Trainers:</label>
        <input type="number" name="total_number_of_trainers" value={formData.total_number_of_trainers} onChange={handleChange} required />
        
        <label>Total Number of Clients:</label>
        <input type="number" name="total_number_of_clients" value={formData.total_number_of_clients} onChange={handleChange} required />

        <label>New Clients Acquired:</label>
        <input type="number" name="new_clients_acquired" value={formData.new_clients_acquired} onChange={handleChange} required />

        <label>Client Retention Rate:</label>
        <input type="number" name="client_retention_rate" min="0" max="100" value={formData.client_retention_rate} onChange={handleChange} required />

        <label>Total Sessions Conducted:</label>
        <input type="number" name="total_sessions_conducted" value={formData.total_sessions_conducted} onChange={handleChange} required />

        <label>Average Attendance Rate:</label>
        <input type="number" name="average_attendance_rate" min="0" max="100" value={formData.average_attendance_rate} onChange={handleChange} required />
        
        <h3>Trainer Performance</h3>
        {formData.trainer_performance.map((trainer, index) => (
          <div key={index} className="select-container">
            <label>Trainer Name:</label>
            <input type="text" name="trainer_name" value={trainer.trainer_name} onChange={(e) => handleTrainerChange(index, e)} required />
            
            <label>Number of Clients:</label>
            <input type="number" name="number_of_clients" value={trainer.number_of_clients} onChange={(e) => handleTrainerChange(index, e)} required />

            <label>New Clients Acquired:</label>
            <input type="number" name="new_clients_acquired" value={trainer.new_clients_acquired} onChange={(e) => handleTrainerChange(index, e)} required />

            <label>Sessions Conducted:</label>
            <input type="number" name="sessions_conducted" value={trainer.sessions_conducted} onChange={(e) => handleTrainerChange(index, e)} required />

            
            <label>Average Attendance Rate:</label>
            <input type="number" name="average_attendance_rate" min="0" max="100" value={trainer.average_attendance_rate} onChange={(e) => handleTrainerChange(index, e)} required />
          </div>
        ))}
        <button type="button" onClick={addTrainer} style={styles.button}>Add Trainer</button>
        
        <label>Highlights:</label>
        <textarea name="highlights" value={formData.highlights} onChange={handleChange} required />

        <label>Challenges:</label>
        <textarea name="challenges" value={formData.challenges} onChange={handleChange} required />

        <label>Goals for Next Month:</label>
        <textarea name="goals_for_next_month" value={formData.goals_for_next_month} onChange={handleChange} required />

        <label>Revenue:</label>
        <input type="number" name="revenue" value={formData.revenue} onChange={handleChange} required />

        <label>Additional Notes:</label>
        <textarea name="additional_notes" value={formData.additional_notes} onChange={handleChange} required />

        <label>Conclusion:</label>
        <textarea name="conclusion" value={formData.conclusion} onChange={handleChange} required />
        
        <button type="submit" style={styles.button}>Submit</button>
      </form>

      

      
    </div>
  );
};

export default AddMonthlyReport;