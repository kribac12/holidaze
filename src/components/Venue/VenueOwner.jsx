import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const OwnerDetails = ({ owner }) => {
  return (
    <div className="relative my-4 overflow-hidden py-4">
      <div className="absolute left-0 top-0 h-px w-2/3 bg-gradient-to-r from-transparent via-secondaryText to-transparent"></div>
      <h2 className="mb-2 text-h2 font-h2">Host</h2>
      <Link to={`/profile/${owner.name}`}>
        <div className="flex items-center space-x-4">
          <img
            src={owner.avatar.url}
            alt={owner.avatar.alt || 'Owner Avatar'}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{owner.name}</h3>
            <p className="text-sm text-gray-600">{owner.email}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

OwnerDetails.propTypes = {
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default OwnerDetails
