import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

function UpdateWorkoutForm() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Email: '',
        CustomerId: '',
        Gender: '',
        exercises: []
    });

    useEffect(() => {
        fetchWorkout();
    }, []);

    const fetchWorkout = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/workoutplan/get/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching workout plan:', error);
        }
    };

    const handleChange = (index, field, value) => {
        const updatedExercises = [...formData.exercises];
        updatedExercises[index][field] = value;
        setFormData({
            ...formData,
            exercises: updatedExercises
        });
    };

    const handleAddExercise = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            exercises: prevFormData.exercises ? [...prevFormData.exercises, { exercise: '', sets: '', reps: '' }] : [{ exercise: '', sets: '', reps: '' }]
        }));
    };

    const handleDeleteExercise = (index) => {
        const updatedExercises = [...formData.exercises];
        updatedExercises.splice(index, 1);
        setFormData({
            ...formData,
            exercises: updatedExercises
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/workoutplan/update/${id}`, formData);
            generatePDF();
            alert('Workout plan updated successfully');
        } catch (error) {
            console.error('Error updating workout plan:', error);
            alert('Error updating workout plan');
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Workout Plan', 10, 10);
        let y = 20;

        // Add table headers
        doc.setFont('helvetica', 'bold');
        doc.text('Exercise', 10, y);
        doc.text('Sets', 50, y);
        doc.text('Reps', 90, y);
        y += 10;

        // Add table rows
        formData.exercises.forEach((exercise) => {
            doc.setFont('helvetica', 'normal');
            doc.text(exercise.exercise, 10, y);
            doc.text(exercise.sets.toString(), 50, y);
            doc.text(exercise.reps.toString(), 90, y);
            y += 10;
        });

        doc.save('workout_plan.pdf');
    };

    return (
        <div style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/dumbbells-floor-gym-ai-generative_123827-23745.jpg?w=1060&t=st=1713289323~exp=1713289923~hmac=def0332af43577aec1ba958e5e2435759c1ff763ebcf9aa1b16139c7c3eebc73)', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Update Workout Plan</h2>
                <form onSubmit={handleSubmit} style={{ width: '400px', padding: '20px', backgroundColor: '#f2f2f2', borderRadius: '10px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Email:</label>
                        <input
                            type="text"
                            name="Email"
                            value={formData.Email}
                            onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, CustomerId: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Gender:</label>
                        <select
                            name="Gender"
                            value={formData.Gender}
                            onChange={(e) => setFormData({ ...formData, Gender: e.target.value })}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Exercises:</label>
                        {formData.exercises && formData.exercises.map((exercise, index) => (
                            <div key={index} style={{ marginBottom: '20px' }}>
                                <input
                                    type="text"
                                    value={exercise.exercise}
                                    onChange={(e) => handleChange(index, 'exercise', e.target.value)}
                                    style={{ width: 'calc(70% - 10px)', padding: '10px', borderRadius: '5px' }}
                                />
                                <input
                                    type="number"
                                    value={exercise.sets}
                                    onChange={(e) => handleChange(index, 'sets', e.target.value)}
                                    style={{ width: 'calc(70% - 10px)', padding: '10px', borderRadius: '5px' }}
                                />
                                <input
                                    type="number"
                                    value={exercise.reps}
                                    onChange={(e) => handleChange(index, 'reps', e.target.value)}
                                    style={{ width: 'calc(70% - 10px)', padding: '10px', borderRadius: '5px' }}
                                />
                                <button type="button" onClick={() => handleDeleteExercise(index)} style={{ marginLeft: '5px' }}>Delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddExercise} style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>Add Exercise</button>
                    </div>
                    <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Update Workout Plan</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateWorkoutForm;
