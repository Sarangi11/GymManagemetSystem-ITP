import  { useState } from 'react';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink,Image } from '@react-pdf/renderer';
import './AddWorkoutFormtwo.css';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#2B1857 ',
    padding: 20,
    fontSize: 16,
    color:'white',
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


function AddTwodayWorkoutform() {
  const [email, setEmail] = useState('');
  const [CustomerId ,setcustomerId] = useState('');
  const [gender, setGender] = useState('');
  const [exercises1, setExercises1] = useState([{ exercise: '', sets: '', reps: '' }]);
  const [exercises2, setExercises2] = useState([{ exercise: '', sets: '', reps: '' }]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [pdfData, setPdfData] = useState(null); // State to hold generated PDF data

  const handleExerciseChange = (index, key, value, day) => {
    if (day === 1) {
      const newExercises1 = [...exercises1];
      newExercises1[index][key] = value;
      setExercises1(newExercises1);
    } else if (day === 2) {
      const newExercises2 = [...exercises2];
      newExercises2[index][key] = value;
      setExercises2(newExercises2);
    }
  };

  const handleAddExercise = (day) => {
    if (day === 1) {
      setExercises1(prevState => [...prevState, { exercise: '', sets: '', reps: '' }]);
    } else if (day === 2) {
      setExercises2(prevState => [...prevState, { exercise: '', sets: '', reps: '' }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/Twodayworkoutplan/add', {
        Email: email,
        CustomerId:CustomerId,
        Gender: gender,
        exercises1: exercises1,
        exercises2: exercises2
      });
      alert(response.data); 

      // Generate PDF
      const pdfDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
          <View style={styles.header}>
              <Image src="Images/Gymflex_Logo_1.jpg" style={styles.logo} />
              <Text style={styles.title}> TwoDay Workout Plan</Text>
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
                {exercises1.map((exercise, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{exercise.exercise}</Text>
                    <Text style={styles.tableCell}>{exercise.sets}</Text>
                    <Text style={styles.tableCell}>{exercise.reps}</Text>
                  </View>
                ))}
              </View>
            
            <View style={styles.section}>
              <Text style={styles.title}>Exercises for Day 2:</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.headerCell]}>
                  <Text style={styles.tableCell}>Exercise</Text>
                  <Text style={styles.tableCell}>Sets</Text>
                  <Text style={styles.tableCell}>Reps</Text>
                </View>
                {exercises2.map((exercise, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{exercise.exercise}</Text>
                    <Text style={styles.tableCell}>{exercise.sets}</Text>
                    <Text style={styles.tableCell}>{exercise.reps}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Page>
        </Document>
      );
      setPdfData(pdfDoc);

      // Clear form fields
      setEmail('');
      setcustomerId('');
      setGender('');
      setExercises1([{ exercise: '', sets: '', reps: '' }]);
      setExercises2([{ exercise: '', sets: '', reps: '' }]);
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
        <div >
          <h1 className='h1'>Two Days Workout Plan</h1>
          {errorMessage && <div>{errorMessage}</div>}
          <form onSubmit={handleSubmit} >
            <label className='label'>
              Email:
              <input className={`input3 ${isValidEmail ? '' : 'invalid'}`} type="text" value={email} onChange={handleEmailChange} />
            </label>
            <br />
            <label className='label'>
          CustomerId:
            <input className='input' value={CustomerId} onChange={(e) => setcustomerId(e.target.value)}  />
          </label>
            <label className='label'>
              Gender:
              <select className='select' value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="option">option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <br /><br />
            <div className='label2'>
              <div>
                <h3>One Day</h3>
                {exercises1.map((exercise, index) => (
                  <div className='label1' key={index}>
                    <input className='input' type="text" value={exercise.exercise} onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value, 1)} placeholder="Exercise" />
                    <input className='input1' type="number" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value, 1)} placeholder="Sets" />
                    <input className='input1' type="number" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value, 1)} placeholder="Reps" />
                  </div>
                ))}
                <br /><button className='button1' type="button" onClick={() => handleAddExercise(1)}>Add Exercise</button>
              </div>
            </div>
            <br />
            <div className='label2'>
              <div >
                <h3>Second Day</h3>
                {exercises2.map((exercise, index) => (
                  <div className='label1' key={index}>
                    <input className='input' type="text" value={exercise.exercise} onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value, 2)} placeholder="Exercise" />
                    <input className='input1' type="number" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value, 2)} placeholder="Sets" />
                    <input className='input1' type="number" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value, 2)} placeholder="Reps" />
                  </div>
                ))}
                <br /><button className='button1' type="button" onClick={() => handleAddExercise(2)}>Add Exercise</button>
              </div>
            </div>
            <br />
            <button className='button2' type="submit">Add Workout Plan</button>
          </form>
        </div>
      </div>
      {pdfData && (
        <div className="generated-pdf">
          <h2 className="generated-pdf-heading">Generated PDF:</h2>
          <PDFDownloadLink document={pdfData} fileName="workout_plan.pdf">
            {({  loading}) => (loading ? 'Generating PDF...' : <button className="download-pdf-button">Download PDF</button>)}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default AddTwodayWorkoutform;
