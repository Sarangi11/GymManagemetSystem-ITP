import { Link } from 'react-router-dom'; 


function Workoutpage() {
  return (
    <div className='container-a' >
      <h1 style={{marginBottom: "20px",fontSize:"40px",fontWeight: 'bold',color:"black"}}>Select Your Task</h1>
      {/* Use Link component with 'to' prop to navigate to different pages */}
      <Link to="/wpage" className="button-link">
        <button id="button11">Create Workout Plan</button>
      </Link>
      <Link to="/UpdateWorkout" className="button-link">
        <button id="button22">Change Workout Plan</button>
      </Link>
      <Link to="/Shedule" className="button-link">
        <button id="button33">Request Shedule Change</button>
      </Link>
    </div>
  );
}

export default Workoutpage;
