import PropTypes from 'prop-types'

const Description = ({ description }) => (
  <div className="relative my-4 py-4">
    <div className="absolute top-0 left-0 w-2/3 h-px bg-gradient-to-r from-transparent via-secondaryText to-transparent"></div>
    <h2 className="font-h2 text-h2 mb-2">Description</h2>
    <p>{description}</p>
  </div>
)

Description.propTypes = {
  description: PropTypes.string.isRequired,
}

export default Description
