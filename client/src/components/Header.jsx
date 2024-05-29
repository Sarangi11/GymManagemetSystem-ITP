import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { MdShoppingCart } from "react-icons/md";
import logo from "./logo.jpeg";
import DropdownMenu from "./DropdownMenu";
import { signoutSuccess } from "../redux/user/userSilce";
import { useDispatch } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  console.log(totalItems);

  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isDropdownOpen &&
        event.target.closest(".dropdown-menu") === null &&
        event.target.closest("button") === null
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const CurrentuserId = currentUser ? currentUser._id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items/cartitem/${CurrentuserId}`);
        const data = await response.json();

        console.log("data", data);

        if (data.length > 0) {
          setTotalItems(data.length);
        } else {
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [CurrentuserId]);




  return (
    <div className="bg-black">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3 ">
      <img src={logo} alt="" className="w-12 h-12" /> 
        <Link to="/">
          <h1 className="font-bold text-yellow-300 ">GYM FLEX</h1>
        </Link>
        
        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-yellow-300 ">Home</li>
          </Link>

          {currentUser && currentUser.ismanger && (
            <Link to="/dashbord">
              <li className="text-yellow-300">Dashbord</li>
            </Link>
          )}

          {currentUser ? (
            <>
             <Link to="/h">
                <button className='text-yellow-300'>Store</button>
              </Link>
              <Link to="/form">
                <button className='text-yellow-300'>Contact Us</button>
              </Link>
              <Link to="/feed">
                <button className='text-yellow-300 '>FeedBack</button>
              </Link>
              <Link to="/Trainers">
                <button className='text-yellow-300 '>Trainers</button>
              </Link>
              <Link to="/viewnotifi">
                <button className='text-yellow-300 '>Notification</button>
              </Link>
              <Link to="/packages">
                <button className='text-yellow-300 '>Packages</button>
              </Link>

              <Link to="/addapoint">
                <button className='text-yellow-300 '>Doctor Appointment</button>
              </Link>
              <Link to="/addSchedule">
                <button className='text-yellow-300 '>Add Schedule</button>
              </Link>
             
              <Link to="/order1">
                <h1 className="text-yellow-300">payment</h1>
              </Link>
              <div className="relative">
                <button onClick={toggleDropdown}>
                  <div className="relative">
                    <MdShoppingCart className="text-2xl text-blue-500" />
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </div>
                  </div>
                </button>
                {isDropdownOpen && (
                  <DropdownMenu
                    isOpen={isDropdownOpen}
                    toggleDropdown={toggleDropdown}
                  />
                )}
              </div>

              <Link to={"/profil"}>
              <span onClick={handleSignout} className="cursor-pointer text-yellow-300">
           Sign Out
         </span>
              </Link>

              <Link to={'/dashprofil'}>
                <img src={currentUser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover" />
              </Link>

            </>
          ) : (
            <Link to="/sign-in" >
              <li className="text-yellow-300 ">Sing In</li>
            </Link>
          )}

        </ul>
      </div>
    </div>
  );
}

Header.displayName = 'Header';

export default Header;
