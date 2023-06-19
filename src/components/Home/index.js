import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../header'
import ContactUs from '../contact'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const initialApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {booksData: [], apiStatus: initialApiStatus.initial}

  componentDidMount() {
    this.getBooks()
  }

  getFormattedData = data => ({
    id: data.id,
    authorName: data.author_name,
    coverPic: data.cover_pic,
    title: data.title,
  })

  getBooks = async () => {
    this.setState({apiStatus: initialApiStatus.loading})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.books.map(each => this.getFormattedData(each))
      console.log(updatedData)
      this.setState({
        apiStatus: initialApiStatus.success,
        booksData: updatedData,
      })
    } else {
      this.setState({apiStatus: initialApiStatus.failure})
    }
  }

  getSuccessView = () => {
    const {booksData} = this.state

    return (
      <ul className="successViewContainer">
        <Slider {...settings}>
          {booksData.map(eachLogo => {
            const {id, authorName, coverPic, title} = eachLogo
            return (
              <Link to={`/books/${id}`}>
                <li className="slickItem" key={id}>
                  <img
                    className="logo-image"
                    src={coverPic}
                    alt="company logo"
                  />
                  <h1 className="name">{title}</h1>
                  <p className="authorName">{authorName}</p>
                </li>
              </Link>
            )
          })}
        </Slider>
      </ul>
    )
  }

  onClickTryAgain = () => {
    this.getBooks()
  }

  getFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://res.cloudinary.com/dg3vzfe7f/image/upload/v1687065906/Group_7522_mwmqmk.png"
        alt="failure view"
        className="failureImage"
      />
      <p className="errorFailure">Something went wrong. Please try again</p>
      <button className="button2" type="button" onClick={this.onClickTryAgain}>
        Try Again
      </button>
    </div>
  )

  getLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickFind = () => <Redirect to="/shelf" />

  getApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initialApiStatus.success:
        return this.getSuccessView()
      case initialApiStatus.failure:
        return this.getFailureView()
      case initialApiStatus.loading:
        return this.getLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="homeContainer">
          <h1 className="heading">Find Your Next Favorite Books?</h1>
          <p className="para">
            You are in the right place.Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <div className="cardContainer">
            <div className="headLineSection">
              <h1 className="heading2">Top rated Books</h1>
              <Link to="/shelf">
                <button className="button2" type="button">
                  Find Books
                </button>
              </Link>
            </div>
            <div className="statusContainer">{this.getApiStatus()}</div>
          </div>
          <ContactUs />
        </div>
      </div>
    )
  }
}

export default Home
