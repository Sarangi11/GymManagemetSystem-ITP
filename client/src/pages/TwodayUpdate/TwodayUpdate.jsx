// UpdateWorkoutPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

function UpdateWorkoutPage() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Email: '',
        CustomerId: '',
        Gender: '',
        exercises1: [],
        exercises2: []
    });

    useEffect(() => {
        fetchWorkout();
    }, []);

    const fetchWorkout = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/Twodayworkoutplan/get/${id}`);
            const { exercises1, exercises2, ...rest } = response.data;
            setFormData({ ...rest, exercises1: exercises1 || [], exercises2: exercises2 || [] });
        } catch (error) {
            console.error('Error fetching workout plan:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/Twodayworkoutplan/update/${id}`, formData);
            alert('Workout plan updated successfully');
            const doc = new jsPDF();
        doc.text('Workout Plan', 10, 10);
        doc.text(`Email: ${formData.Email}`, 10, 20);
        doc.text(`Customer ID: ${formData.CustomerId}`, 10, 30);
        doc.text(`Gender: ${formData.Gender}`, 10, 40);
        doc.text('One-Day Workout Plan:', 10, 50);
        formData.exercises1.forEach((exercise, index) => {
            doc.text(`${index + 1}. Exercise: ${exercise.exercise}, Sets: ${exercise.sets}, Reps: ${exercise.reps}`, 10, 60 + index * 10);
        });
        doc.text('Two-Day Workout Plan:', 10, 70 + formData.exercises1.length * 10);
        formData.exercises2.forEach((exercise, index) => {
            doc.text(`${index + 1}. Exercise: ${exercise.exercise}, Sets: ${exercise.sets}, Reps: ${exercise.reps}`, 10, 80 + formData.exercises1.length * 10 + index * 10);
        });
        doc.save('workout_plan.pdf');
        } catch (error) {
            console.error('Error updating workout plan:', error);
            alert('Error updating workout plan');
        }
    };

    const handleAddExercise = (day) => {
        setFormData(prevState => ({
            ...prevState,
            [day]: [...prevState[day], { exercise: '', sets: '', reps: '' }]
        }));
    };

    const handleDeleteExercise = (day, index) => {
        setFormData(prevState => {
            const exercises = [...prevState[day]];
            exercises.splice(index, 1);
            return { ...prevState, [day]: exercises };
        });
    };

    const handleExerciseChange = (day, index, field, value) => {
        setFormData(prevState => {
            const exercises = [...prevState[day]];
            exercises[index][field] = value;
            return { ...prevState, [day]: exercises };
        });
    };

    return (
        <div style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/dumbbells-floor-gym-ai-generative_123827-23745.jpg?w=1060&t=st=1713289323~exp=1713289923~hmac=def0332af43577aec1ba958e5e2435759c1ff763ebcf9aa1b16139c7c3eebc73)', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '30px', borderRadius: '10px' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Update Workout Plan</h2>
            <form onSubmit={handleFormSubmit} style={{ width: '400px', padding: '20px', backgroundColor: '#f2f2f2', borderRadius: '10px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="Email"
                        value={formData.Email}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Customer ID:</label>
                    <input
                        type="text"
                        name="CustomerId"
                        value={formData.CustomerId}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Gender:</label>
                    <select
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h3>One-Day Workout Plan</h3>
                    {formData.exercises1 && formData.exercises1.map((exercise, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange('exercises1', index, 'exercise', e.target.value)}
                                style={{ width: 'calc(70% - 10px)', padding: '10px', borderRadius: '5px' }}
                            />
                            <input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) => handleExerciseChange('exercises1', index, 'sets', e.target.value)}
                                style={{ width: 'calc(70% - 10px)', padding: '10px', borderRadius: '5px' }}
                            />
                            <input
                                type="number"
                                value={exercise.reps}
                                onChange={(e) => handleExerciseChange('exercises1', index, 'reps', e.target.value)}
                                style={{ width: 'calc(70% - 10px)', padding: '10px', borderRadius: '5px' }}
                            />
                            <button type="button" onClick={() => handleDeleteExercise('exercises1', index)} style={{ marginLeft: '5px' }}>Delete</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddExercise('exercises1')} style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>Add Exercise</button>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h3>Two-Day Workout Plan</h3>
                    {formData.exercises2 && formData.exercises2.map((exercise, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <input
                                type="text"
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange('exercises2', index, 'exercise', e.target.value)}
                            />
                            <input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) => handleExerciseChange('exercises2', index, 'sets', e.target.value)}
                            />
                            <input
                                type="number"
                                value={exercise.reps}
                                onChange={(e) => handleExerciseChange('exercises2', index, 'reps', e.target.value)}
                            />
                            <button type="button" onClick={() => handleDeleteExercise('exercises2', index)}>Delete</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddExercise('exercises2')} style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>Add Exercise</button>
                </div>
                <button type="submit"  style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Update</button>
            </form>
        </div></div>
    );
}

export default UpdateWorkoutPage;