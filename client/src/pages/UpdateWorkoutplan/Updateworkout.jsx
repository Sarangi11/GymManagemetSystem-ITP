import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateWorkout() {
    const [email, setEmail] = useState('');
    const [workoutPlanRequests, setWorkoutPlanRequests] = useState([]);
    const [twoDayWorkoutPlanRequests, setTwoDayWorkoutPlanRequests] = useState([]);
    const [threeDayWorkoutPlanRequests, setThreeDayWorkoutPlanRequests] = useState([]);
    const navigate = useNavigate();

    const styles = {
        container: {
            textAlign: 'center',
            minHeight: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#333',
            padding: '20px',
        },
        tableContainer: {
            margin: 'auto', // Center the table
            maxWidth: '800px',
        },
        table: {
            display: 'table',
            
            borderStyle: 'solid',
            borderColor: '#000',
            borderWidth: 1,
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            opacity: 0.7,
            color:'black',
            
        },
        row: {
            backgroundColor: "#343a40",
            color: "#fff",
            flexDirection: 'row',
        },
        cell: {
            flex: 1,
            padding: '8px',
            width: '10%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
            textAlign: 'center',
        },
        button: {
            backgroundColor: "#007bff",
            color: "white",
            borderWidth: 1,
            borderRadius: "5px",
            padding: "10px 10px",
            marginRight: "10px"
        },
    }    

    useEffect(() => {
        if (email.trim() !== '') {
            fetchRequests();
        }
    }, [email]);

    const fetchRequests = async () => {
        try {
            const response1 = await axios.get(`http://localhost:3000/workoutplan/trainer/${email}`);
            setWorkoutPlanRequests(response1.data);

            const response2 = await axios.get(`http://localhost:3000/Twodayworkoutplan/trainer/${email}`);
            setTwoDayWorkoutPlanRequests(response2.data);

            const response3 = await axios.get(`http://localhost:3000/Threedayworkoutplan/trainer/${email}`);
            setThreeDayWorkoutPlanRequests(response3.data);
        } catch (error) {
            console.error('Error fetching workout plan requests:', error);
        }
    };

    const confirmDelete = async (id, type) => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            await deleteRequest(id, type);
        }
    };
    

    const deleteRequest = async (id, type) => {
        try {
            await axios.delete(`http://localhost:3000/${type}/delete/${id}`);
            alert('Request deleted successfully');
            fetchRequests(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting request:', error);
            alert('Error deleting request');
        }
    };
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <div style={{ textAlign: 'center', minHeight: '100vh', backgroundImage: 'url("https://images.pexels.com/photos/28054/pexels-photo-28054.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: '100% 100%', color: 'white' }}>
            <div className="container" style={styles.tableContainer}>
                <h2>Enter Trainer Email</h2>
                <input type="email" value={email} onChange={handleEmailChange}  style={{
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        width: '100%',
        maxWidth: '400px', // Adjust the max width as needed
        backgroundColor: '#fff',
        color: '#333',
        fontSize: '16px',
    }}/>
                
                {email.trim() !== '' && (
                    <>
                        <h2>Workout Plan Requests</h2>
                        <table className="table" >
                            <thead className="thead-dark">
                                <tr>
                                    <th>CustomerId</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workoutPlanRequests.map(request => (
                                    <tr key={request._id} style={styles.row}>
                                        <td style={styles.cell}>{request.CustomerId}</td>
                                        <td style={styles.cell}>{request.Gender}</td>
                                        <td style={styles.cell}>
                                        <button style={styles.button} onClick={() => navigate(`/update/oneday/${request._id}`)}>Edit</button>
                                        <button style={styles.button} onClick={() => confirmDelete(request._id, 'workoutplan')}>Delete</button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h2>Two-Day Workout Plan Requests</h2>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>CustomerId</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {twoDayWorkoutPlanRequests.map(request => (
                                    <tr key={request.id} style={styles.row}>
                                        <td style={styles.cell}>{request.CustomerId}</td>
                                        <td style={styles.cell}>{request.Gender}</td>
                                        <td style={styles.cell}>
                                        <button style={styles.button} onClick={() => navigate(`/update/twoday/${request._id}`)}>Edit</button>
                                        <button style={styles.button} onClick={() => confirmDelete(request._id, 'Twodayworkoutplan')}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h2>Three-Day Workout Plan Requests</h2>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>CustomerId</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {threeDayWorkoutPlanRequests.map(request => (
                                    <tr key={request.id} style={styles.row}>
                                        <td style={styles.cell}>{request.CustomerId}</td>
                                        <td style={styles.cell}>{request.Gender}</td>
                                        <td style={styles.cell}>
                                        <button style={styles.button} onClick={() => navigate(`/update/threeday/${request._id}`)}>Edit</button>
                                        <button style={styles.button} onClick={() => confirmDelete(request._id, 'Threedayworkoutplan')}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>


    );
    
}

export default UpdateWorkout;