// UpdateWorkoutPage.js
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateWorkoutPage() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Email: '',
        CustomerId: '',
        Gender: '',
        exercises1: [],
        exercises2: [],
        exercises3: []
    });

    useEffect(() => {
        fetchWorkout();
    }, []);

    const fetchWorkout = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/Threedayworkoutplan/get/${id}`);
            const { exercises1, exercises2, exercises3, ...rest } = response.data;
            setFormData({ ...rest, exercises1, exercises2, exercises3 });
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
            await axios.put(`http://localhost:3000/Threedayworkoutplan/update/${id}`, formData);
            alert('Workout plan updated successfully');
        } catch (error) {
            console.error('Error updating workout plan:', error);
            alert('Error updating workout plan');
        }
    };

    const handleAddExercise = (day) => {
        setFormData(prevState => {
            const exercises = Array.isArray(prevState[day]) ? [...prevState[day]] : [];
            return {
                ...prevState,
                [day]: [...exercises, { exercise: '', sets: '', reps: '' }]
            };
        });
    };
    
    const handleDeleteExercise = (day, index) => {
        setFormData(prevState => {
            const exercises = Array.isArray(prevState[day]) ? [...prevState[day]] : [];
            exercises.splice(index, 1);
            return {
                ...prevState,
                [day]: exercises
            };
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
                        <div key={index} style={{ marginBottom: '20px' }}>
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
                <div>
                    <h3>Two-Day Workout Plan</h3>
                    {formData.exercises2 && formData.exercises2.map((exercise, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <input
                                type="text"
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange('exercises2', index, 'exercise', e.target.value)}
                                style={{ width: 'calc(70% - 10px)', padding: '10px', borderRadius: '5px' }}
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
                            <button type="button" onClick={() => handleDeleteExercise('exercises2', index)} style={{ marginLeft: '5px' }}>Delete</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddExercise('exercises2')} style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>Add Exercise</button>
                </div>
                <div>
                    <h3>Three-Day Workout Plan</h3>
                    {formData.exercises3 && formData.exercises3.map((exercise, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <input
                                type="text"
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange('exercises3', index, 'exercise', e.target.value)}
                                style={{ width: 'calc(70% - 10px)', padding: '10px', borderRadius: '5px' }}
                            />
                            <input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) => handleExerciseChange('exercises3', index, 'sets', e.target.value)}
                                style={{ width: 'calc(70% - 10px)', padding: '10px', borderRadius: '5px' }}
                            />
                            <input
                                type="number"
                                value={exercise.reps}
                                onChange={(e) => handleExerciseChange('exercises3', index, 'reps', e.target.value)}
                                style={{ width: 'calc(70% - 10px)', padding: '10px', borderRadius: '5px' }}
                            />
                            <button type="button" onClick={() => handleDeleteExercise('exercises3', index)} style={{ marginLeft: '5px' }}>Delete</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddExercise('exercises3')} style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>Add Exercise</button>
                </div>
                <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Update</button>
            </form>
        </div></div>
    );
}

export default UpdateWorkoutPage;