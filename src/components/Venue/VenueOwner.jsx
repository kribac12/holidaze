import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const OwnerDetails = ({ owner }) => {
  return (
    <div className="relative my-4 py-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-2/3 h-px bg-gradient-to-r from-transparent via-secondaryText to-transparent"></div>
      <h2 className="font-h2 text-h2 mb-2">Host</h2>
      <Link to={`/profile/${owner.name}`}>
        <div className="flex items-center space-x-4">
          <img
            src={owner.avatar.url}
            alt={owner.avatar.alt || 'Owner Avatar'}
            className="w-16 h-16 rounded-full"
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
