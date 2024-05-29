import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TrainerPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch("http://localhost:3000/employe/getTrainers");
        const data = await response.json();
        if (response.ok) {
          setTrainers(data.trainers);
          setFilteredTrainers(data.trainers); // Set filtered trainers initially to all trainers
        } else {
          console.error("Failed to fetch trainers");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trainers:", error);
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = trainers.filter(
      (trainer) =>
        trainer.FirstName.toLowerCase().includes(searchTerm) ||
        trainer.LastName.toLowerCase().includes(searchTerm)
    );
    setFilteredTrainers(filtered);
  };

  return (
    <div style={{ 
      backgroundImage: 'url("https://images.pexels.com/photos/4325462/pexels-photo-4325462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontWeight: 'bold'

    }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ marginBottom: "20px",fontSize:"40px",fontWeight: 'bold',color: 'White' }}>Trainers</h1>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ padding: "8px", marginBottom: "20px", width: "100%", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap"  }}>
            {filteredTrainers && filteredTrainers.length > 0 ? (
              filteredTrainers.map((trainer) => (
                <div key={trainer._id} style={{ width: "300px", margin: "10px", border: "1px solid #ccc", borderRadius: "5px", padding: "15px", textAlign: "left" , backgroundColor: 'rgba(255, 255, 255, 0.7)', }}>
                  <h3 style={{ color: 'blue',fontSize:"30px",textAlign: "center"}}>{trainer.FirstName} {trainer.LastName}</h3>
                  <p  style={{ color: 'black',}}>Email: {trainer.email}</p>
                  <p  style={{ color: 'blck',}}>Contact: {trainer.Contact}</p>
                  
                </div>
              ))
            ) : (
              <p>No trainers found</p>
            )}
          </div>
          <Link to="/profile" style={{ display: "block", textAlign: "center", marginTop: "20px" }}>Back to Profile</Link>
        </div>
      )}
    </div>
  );
};

export default TrainerPage;
