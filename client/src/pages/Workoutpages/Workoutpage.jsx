
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Workoutpage.css';

function Workoutpage() {
  return (
    <div className='container-a'>
      <h1 style={{marginBottom: "20px",fontSize:"40px",fontWeight: 'bold',color:"black"}}>Workout Plan</h1>
      {/* Use Link component with 'to' prop to navigate to different pages */}
      <Link to="/addworkout" className="button-link">
        <button id="button11">One Day Workout Plan</button>
      </Link>
      <Link to="/twoadd" className="button-link">
        <button id="button22">Two Day Workout Plan</button>
      </Link>
      <Link to="/threeadd" className="button-link">
        <button id="button33">Three Day Workout Plan</button>
      </Link>
    </div>
  );
}

export default Workoutpage;
