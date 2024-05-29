import React, { useState } from 'react';
import axios from 'axios';
import './AddWorkoutForm.css';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'black',
    padding: 20,
    fontSize: 16,
    color:"white",
  },
  title:{
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color:"white",
    
  },
  logo:{
    width: 100, // Adjust the width of the logo
    
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize:"20px",
    color:"blue",
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    opacity: 0.7,
    color:'black',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
  

  headerCell: {
    backgroundColor: '#f0f0f0',
  },
});

function AddWorkoutForm() {
  const [email, setEmail] = useState('');
  const [CustomerId ,setcustomerId] = useState('');
  const [gender, setGender] = useState('');
  const [exercises, setExercises] = useState([
    { exercise: '', sets: '', reps: '' },
    { exercise: '', sets: '', reps: '' },
    { exercise: '', sets: '', reps: '' }
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [pdfData, setPdfData] = useState(null); // State to hold generated PDF data
  

  const handleExerciseChange = (index, key, value) => {
    const newExercises = [...exercises];
    newExercises[index][key] = value;
    setExercises(newExercises);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { exercise: '', sets: '', reps: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/workoutplan/add', {
        Email: email,
        CustomerId:CustomerId,
        Gender: gender,
        exercises: exercises
      });
      alert(response.data); 

      // Generate PDF
      const pdfDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Image src="Images/Gymflex_Logo_1.jpg" style={styles.logo} />
              <Text style={styles.title}> OneDay Workout Plan</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Email:</Text>
              <Text>{email}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>CustomerId:</Text>
              <Text>{CustomerId}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Gender:</Text>
              <Text>{gender}</Text>
            </View>
            <Text style={styles.title}>Exercises for Day 1:</Text>
            
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.headerCell]}>
                  <Text style={styles.tableCell}>Exercise</Text>
                  <Text style={styles.tableCell}>Sets</Text>
                  <Text style={styles.tableCell}>Reps</Text>
                </View>
                {exercises.map((exercise, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{exercise.exercise}</Text>
                    <Text style={styles.tableCell}>{exercise.sets}</Text>
                    <Text style={styles.tableCell}>{exercise.reps}</Text>
                  </View>
                ))}
              </View>
          </Page>
        </Document>
      );
      setPdfData(pdfDoc);

      // Clear form fields
      setEmail('');
      setcustomerId('');
      setGender('');
      setExercises([{ exercise: '', sets: '', reps: '' }]);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  return (
    <div>
      <div className='container1'>
        <h1 className='h1'>One Day Workout Plan</h1>
        {errorMessage && <div>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <label className='label'>
            Email:
            <input className={`input3 ${isValidEmail ? '' : 'invalid'}`} type="text" value={email} onChange={handleEmailChange} />
          </label>
          <label className='label'>
          CustomerId:
            <input className='input' value={CustomerId} onChange={(e) => setcustomerId(e.target.value)}  />
          </label>
          <br />
          <label className='label'>
            Gender:
            <select className='select' value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="option">option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <br /><br />
          <label className='label2'>
            Exercises:
            {exercises.map((exercise, index) => (
              <div className='label1' key={index}>
                <input className='input' type="text" value={exercise.exercise} onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value)} placeholder="Exercise" />
                <input className='input1' type="number" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)} placeholder="Sets" />
                <input className='input1' type="number" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)} placeholder="Reps" />
              </div>
            ))}
            <br /><button className='button1' type="button" onClick={handleAddExercise}>Add Exercise</button>
          </label>
          <br />
          <button className='button2' type="submit">Add Workout Plan</button>
        </form>
      </div>
      {pdfData && (
        <div className="generated-pdf">
          <h2 className="generated-pdf-heading">Generated PDF:</h2>
          <PDFDownloadLink document={pdfData} fileName="workout_plan.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : <button className="download-pdf-button">Download PDF</button>)}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default AddWorkoutForm;
