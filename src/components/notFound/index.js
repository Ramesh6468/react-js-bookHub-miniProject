import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <img
      src="https://res.cloudinary.com/dg3vzfe7f/image/upload/v1687105689/Group_7484_g77lpr.png"
      alt="not found"
      className="notFoundImage"
    />
    <h1 className="notFoundTitle">Page Not Found</h1>
    <p className="para4">
      we are sorry, the page you requested could not be found, please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="button2" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
