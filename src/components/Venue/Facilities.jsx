import PropTypes from 'prop-types'
import { FaWifi, FaCar, FaDog, FaUtensils } from 'react-icons/fa'

const Facilities = ({ meta }) => (
  <div className="relative my-4 py-4">
    <div className="absolute left-0 top-0 h-px w-2/3 bg-gradient-to-r from-transparent via-secondaryText to-transparent"></div>
    <h2 className="mb-2 text-h2 font-h2">Facilities</h2>
    <ul>
      <li className="flex items-center">
        <FaWifi className="mr-3" />
        WiFi: {meta.wifi ? 'Available' : 'Not Available'}
      </li>
      <li className="flex items-center">
        <FaCar className="mr-3" />
        Parking: {meta.parking ? 'Available' : 'Not Available'}
      </li>
      <li className="flex items-center">
        <FaDog className="mr-3" />
        Pets: {meta.pets ? 'Allowed' : 'Not allowed'}
      </li>
      <li className="flex items-center">
        <FaUtensils className="mr-3" />
        Breakfast: {meta.breakfast ? 'Included' : 'Not included'}
      </li>
    </ul>
  </div>
)

Facilities.propTypes = {
  meta: PropTypes.shape({
    wifi: PropTypes.bool,
    parking: PropTypes.bool,
    pets: PropTypes.bool,
    breakfast: PropTypes.bool,
  }).isRequired,
}

export default Facilities
