import React, { useState } from 'react';
import axios from 'axios';

function MonthlyReportForm() {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.get(`http://localhost:3000/reports/${year}/${month}`);
          setReports(response.data.reports);
        } catch (error) {
          console.error('Error fetching monthly reports:', error);
        }
      };
      
    return (
        <div>
            <h1>Monthly Report</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="year">Year:</label>
                    <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="month">Month:</label>
                    <input type="text" id="month" value={month} onChange={(e) => setMonth(e.target.value)} />
                </div>
                <button type="submit">Show Report</button>
            </form>
            {error && <p>{error}</p>}
            <ul>
                {reports.map((report, index) => (
                    <li key={index}>
                        <h2>{report.month} {report.year} Report</h2>
                        <p>Total Number of Trainers: {report.total_number_of_trainers}</p>
                        <p>Total Number of Clients: {report.total_number_of_clients}</p>
                        <p>New Clients Acquired: {report.new_clients_acquired}</p>
                        <p>Client Retention Rate: {report.client_retention_rate}</p>
                        <p>Total Sessions Conducted: {report.total_sessions_conducted}</p>
                        <p>Average Attendance Rate: {report.average_attendance_rate}</p>
                        {/* Add more details here */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MonthlyReportForm;
