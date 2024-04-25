import PropTypes from "prop-types";

const Description = ({ description }) => (
  <div className="my-4 py-4 border-t ">
    <h2 className="text-xl font-semibold">Description</h2>
    <p>{description}</p>
  </div>
);

Description.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Description;
