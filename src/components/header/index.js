import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'
import './index.css'

class Header extends Component {
  state = {showNavbar: false}

  onClickMenu = () => {
    this.setState(prevState => ({
      showNavbar: !prevState.showNavbar,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
    console.log('logout')
  }

  onClickCross = () => {
    this.setState({showNavbar: false})
  }

  render() {
    const {showNavbar} = this.state
    console.log('get')
    console.log(showNavbar)
    const {home, shelves} = this.props
    const activeHome = home ? 'active' : ''
    const activeShelves = shelves ? 'active' : ''

    return (
      <>
        <nav className="headerContainer">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dg3vzfe7f/image/upload/v1686924710/Group_7731_1_plkne0.png"
              alt="website logo"
              className="headerLogo"
            />
          </Link>
          <ul className="navItemContainer">
            <Link to="/">
              <li className={`item ${activeHome}`}>Home</li>
            </Link>
            <Link to="/shelf">
              <li className={`item ${activeShelves}`}>BookShelves</li>
            </Link>
            <button
              className="logoutButton"
              type="button"
              onClick={this.onClickLogout}
            >
              logout
            </button>
          </ul>
        </nav>

        <div className="headerContainer2">
          <div className="menuCard">
            <img
              src="https://res.cloudinary.com/dg3vzfe7f/image/upload/v1686924710/Group_7731_1_plkne0.png"
              alt="website logo"
              className="headerLogo2"
            />
            <button
              className="iconButton"
              type="button"
              onClick={this.onClickMenu}
            >
              <FiMenu />
            </button>
          </div>
          {showNavbar && (
            <>
              <div className="itemContainer">
                <Link className="link" to="/">
                  <h1 className={`home ${activeHome}`}>Home</h1>
                </Link>
                <Link className="link" to="/shelf">
                  <h1 className={`bookshelves ${activeShelves}`}>
                    BookShelves
                  </h1>
                </Link>
                <button
                  className="logoutButton2"
                  type="button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
                <button
                  onClick={this.onClickCross}
                  className="closeIconButton"
                  type="button"
                >
                  <RiCloseCircleFill className="crossIcon" />
                </button>
              </div>
            </>
          )}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
