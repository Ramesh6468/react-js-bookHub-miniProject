import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    error: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, error: errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  getUserNameInput = () => {
    const {username} = this.state
    return (
      <div className="inputContainer">
        <label htmlFor="input1" className="label">
          Username*
        </label>
        <input
          type="text"
          className="input"
          id="input1"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  getPasswordInput = () => {
    const {password} = this.state
    return (
      <div className="inputContainer">
        <label htmlFor="input2" className="label">
          Password*
        </label>
        <input
          type="password"
          className="input"
          id="input2"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  render() {
    const {showError, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bgContainer">
        <img
          src="https://res.cloudinary.com/dg3vzfe7f/image/upload/v1686924381/Rectangle_1467_1_os1rau.png"
          alt="website login"
          className="loginImage"
        />
        <div className="loginContainer">
          <div className="logoCard">
            <img
              src="https://res.cloudinary.com/dg3vzfe7f/image/upload/v1686924710/Group_7731_1_plkne0.png"
              alt="login website logo"
              className="website logo"
            />
            <form className="formContainer" onSubmit={this.onSubmitForm}>
              <div className="usernameCard">{this.getUserNameInput()}</div>
              <div className="passwordCard">{this.getPasswordInput()}</div>
              <button className="button" type="submit">
                Login
              </button>
            </form>
            {showError && <p className="error">*{error}</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default Login
