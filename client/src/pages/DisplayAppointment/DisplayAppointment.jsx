import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DisplayAppointment() {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:3000/appointment/');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const confirmDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            await deleteAppointment(id);
        }
    };

    const deleteAppointment = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/appointment/delete/${id}`);
            alert('Appointment deleted successfully');
            fetchAppointments(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting appointment:', error);
            alert('Error deleting appointment');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto py-8">
                <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Doctor Name</th>
                                <th className="py-2 px-4">Age</th>
                                <th className="py-2 px-4">Gender</th>
                                <th className="py-2 px-4">Date</th>
                                <th className="py-2 px-4">Time</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appointment => (
                                <tr key={appointment._id} className="even:bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <td className="py-2 px-4 border border-gray-300">{appointment.name}</td>
                                    <td className="py-2 px-4 border border-gray-300">{appointment.DoctorName}</td>
                                    <td className="py-2 px-4 border border-gray-300">{appointment.age}</td>
                                    <td className="py-2 px-4 border border-gray-300">{appointment.gender}</td>
                                    <td className="py-2 px-4 border border-gray-300">{appointment.date}</td>
                                    <td className="py-2 px-4 border border-gray-300">{appointment.time}</td>
                                    <td className="py-2 px-4 border border-gray-300">
                                        <div className="flex justify-center">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
                                                onClick={() => navigate(`/update/${appointment._id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                                                onClick={() => confirmDelete(appointment._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <footer />
                </div>
             
            </div>
     
               
            
        </div>
    );
}

export default DisplayAppointment;