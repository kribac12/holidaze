import PropTypes from "prop-types";

const Facilities = ({ meta }) => (
  <div className="my-4 py-4 border-t border-b">
    <h2 className="text-xl font-semibold">Facilities</h2>
    <ul>
      <li>Wifi: {meta.wifi ? "Available" : "Not available"}</li>
      <li>Parking: {meta.parking ? "Available" : "Not available"}</li>
      <li>Pets: {meta.pets ? "Allowed" : "Not allowed"}</li>
      <li>Breakfast: {meta.breakfast ? "Included" : "Not included"}</li>
    </ul>
  </div>
);

Facilities.propTypes = {
  meta: PropTypes.shape({
    wifi: PropTypes.bool,
    parking: PropTypes.bool,
    pets: PropTypes.bool,
    breakfast: PropTypes.bool,
  }).isRequired,
};

export default Facilities;
