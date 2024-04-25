import PropTypes from "prop-types";

const VenueDetails = ({ venue }) => (
  <div className="p-4 space-y-2">
    <h1 className="text-2xl font-bold text-primary">{venue.name}</h1>
    <p className="text-secondaryText">{venue.description}</p>
    <div className="py-2 px-4 bg-white rounded shadow">
      <p className="font-bold">Price: ${venue.price} per night</p>
      <p>Max guests: {venue.maxGuests}</p>
      <p>Location: {venue.location?.city}</p>
      <p>Pets allowed: {venue.meta?.pets ? "Yes" : "No"}</p>
      <p>Parking: {venue.meta?.parking ? "Yes" : "No"}</p>
      <p>Wifi: {venue.meta?.wifi ? "Yes" : "No"}</p>
    </div>
  </div>
);

VenueDetails.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
      })
    ).isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      address: PropTypes.string,
      zip: PropTypes.string,
      country: PropTypes.string,
      continent: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
    }).isRequired,
    meta: PropTypes.shape({
      wifi: PropTypes.bool.isRequired,
      parking: PropTypes.bool.isRequired,
      breakfast: PropTypes.bool.isRequired,
      pets: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default VenueDetails;
