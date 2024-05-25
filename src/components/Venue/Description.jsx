import PropTypes from 'prop-types'

const Description = ({ description }) => (
  <div className="relative my-4 py-4">
    <div className="absolute left-0 top-0 h-px w-2/3 bg-gradient-to-r from-transparent via-secondaryText to-transparent"></div>
    <h2 className="mb-2 text-h2 font-h2">Description</h2>
    <p className="truncate">{description}</p>
  </div>
)

Description.propTypes = {
  description: PropTypes.string.isRequired,
}

export default Description
