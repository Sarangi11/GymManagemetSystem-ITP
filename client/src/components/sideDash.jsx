import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faDatabase, faWrench } from '@fortawesome/free-solid-svg-icons';
import { HiUser, HiChartPie } from 'react-icons/hi';
import PropTypes from 'prop-types';

const DropdownMenu = ({ title, icon, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="relative">
      <Link
        to=""
        className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black flex items-center`}
        onClick={toggleDropdown}
      >
        {icon}
        <span className="ml-2">{title}</span>
      </Link>
      {isOpen && (
        <ul className="bg-blue-300 shadow-md rounded-lg text-white divide-y divide-white">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="block py-2 px-4 text-gray-800 hover:bg-yellow-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

DropdownMenu.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);

  const packagesItems = [
    { label: 'Add Package', path: '/add' },
    { label: 'Add Promotional Package', path: '/addpro' },
    { label: 'View Package', path: '/viewpkg' },
    { label: 'View Promotional Package', path: '/viewpro' },
    { label: 'View Order', path: '/order' },
    { label: 'View Promotional Order', path: '/proorder' },
  ];

  const maintenanceItems = [
    { label: 'Add Request', path: '/req' },
    { label: 'Add Task', path: '/task' },
    { label: 'View Request', path: '/viewreq' },
    { label: 'View Task', path: '/viewtask' },
  ];

  const trainerReqItems = [
    { label: 'Workout', path: '/TrainerRequest' },
    { label: 'Shedule Notification', path: '/displaySchedule' },
  ];

  const trainerManager = [
    { label: 'Notification', path: '/requestdisplay' },
    { label: 'Generate Report', path: '/Report' },
  ];

  return (
    <div className="hidden flex-col flex-shrink-0 p-3 bg-black w-55 h-[600px] lg:block">
      <ul className="flex flex-col space-y-1 mb-auto">
        {currentUser && currentUser && (
          <li className="nav-item">
            <Link
              to="/profile"
              className={`block py-2 px-4 rounded-lg hover:bg-yellow-300 hover:text-black bg-opacity-20 text-white `}
            >
              <HiChartPie className="inline-block w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link
            to="/register"
            className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black `}
          >
            <HiUser className="inline-block w-5 h-5 mr-2" />
            Register
          </Link>
        </li>
        <li>
          <Link
            to="/viewemp"
            className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black `}
          >
            <HiUser className="inline-block w-5 h-5 mr-2" />
            All Employees
          </Link>
        </li>
        <li>
          <Link
            to="/absent"
            className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black `}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="inline-block w-5 h-5 mr-2" />
            Leave
          </Link>
        </li>
        <DropdownMenu
          title="Packages"
          icon={<FontAwesomeIcon icon={faDatabase} className="inline-block w-5 h-5 mr-2" />}
          items={packagesItems}
        />
        <DropdownMenu
          title="Maintenance"
          icon={<FontAwesomeIcon icon={faWrench} className="inline-block w-5 h-5 mr-2" />}
          items={maintenanceItems}
        />
        <li>
          <Link
            to="/appoint"
            className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black `}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="inline-block w-5 h-5 mr-2" />
            Doctor Appointment
          </Link>
        </li>
        <li>
          <Link
            to="/scheduledisplay"
            className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black `}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="inline-block w-5 h-5 mr-2" />
            Trainer Booking
          </Link>
        </li>
        <DropdownMenu
          title="Trainer Task"
          icon={<FontAwesomeIcon icon={faWrench} className="inline-block w-5 h-5 mr-2" />}
          items={trainerReqItems}
        />
        <DropdownMenu
          title="Trainer Management"
          icon={<FontAwesomeIcon icon={faWrench} className="inline-block w-5 h-5 mr-2" />}
          items={trainerManager}
        />
      </ul>
      <hr className="my-2 border-gray-300" />
    </div>
  );
}