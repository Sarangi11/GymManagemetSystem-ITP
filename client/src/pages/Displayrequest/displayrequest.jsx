import  { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

function Displayrequest() {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:3000/maintenance/');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching maintenance requests:', error);
        }
    };

    const confirmDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            await deleteRequest(id);
        }
    };

    const deleteRequest = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/maintenance/delete/${id}`);
            alert('Request deleted successfully');
            fetchRequests(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting request:', error);
            alert('Error deleting request');
        }
    };

    const downloadReport = () => {
        const doc = new jsPDF();
        doc.text('Maintain Request Report', 14, 22);
        autoTable(doc, {
            head: [['Employee ID', 'Type of Equipment', 'Date', 'Description']],
            body: requests.map(request => [request.EmpId, request.Type0fEquipment, request.Date, request.Description]),
            theme: 'striped',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [22, 160, 133] },
        });
        doc.save('request_report.pdf');
    };

    return (
        <div style={{ backgroundImage: "url('Images/photo.jpg')", backgroundSize: "cover", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <h2 style={{ textAlign: "center", margin: "20px 0", color: "white" }}>Request Details</h2>
                
                <table style={{ width: "70%", border: "1px solid white", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                            <th style={tableHeaderStyle}>Employee ID</th>
                            <th style={tableHeaderStyle}>Type of Equipment</th>
                            <th style={tableHeaderStyle}>Date</th>
                            <th style={tableHeaderStyle}>Description</th>
                            <th style={tableHeaderStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id}>
                                <td style={tableCellStyle}>{request.EmpId}</td>
                                <td style={tableCellStyle}>{request.Type0fEquipment}</td>
                                <td style={tableCellStyle}>{request.Date}</td>
                                <td style={tableCellStyle}>{request.Description}</td>
                                <td style={tableCellStyle}>
                                    <button style={actionButtonStyle} onClick={() => navigate(`/updatereq/${request._id}`)}>Edit</button>
                                    <button style={actionButtonStyle} onClick={() => confirmDelete(request._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={downloadReport} style={{ marginTop: '20px', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Download Report
                </button>
            </div>
        </div>
    );
}

// Styles
const tableHeaderStyle = {
    padding: "10px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
};

const actionButtonStyle = {
    marginRight: "10px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
};

export default Displayrequest;
