import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../header'
import ContactUs from '../contact'
import './index.css'

const initialApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class BookDetails extends Component {
  state = {apiStatus: initialApiStatus.initial, bookDetails: []}

  componentDidMount() {
    this.getBookDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    authorName: data.author_name,
    coverPic: data.cover_pic,
    aboutBook: data.about_book,
    rating: data.rating,
    readStatus: data.read_status,
    title: data.title,
    aboutAuthor: data.about_author,
  })

  getBookDetails = async () => {
    this.setState({apiStatus: initialApiStatus.loading})
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {bookId} = params
    console.log(bookId)
    const url = `https://apis.ccbp.in/book-hub/books/${bookId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.getFormattedData(data.book_details)
      console.log(updatedData)
      this.setState({
        apiStatus: initialApiStatus.success,
        bookDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: initialApiStatus.failure})
    }
  }

  getSuccessView = () => {
    const {bookDetails} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails
    return (
      <>
        <div className="bookDetailsCard">
          <div className="topCardSection">
            <img src={coverPic} alt={title} className="coverPic" />
            <div className="titleCard2">
              <h1 className="title2">{title}</h1>
              <p className="name2">{authorName}</p>
              <div className="ratingCard2">
                <p className="avgRating">Avg Rating</p>
                <BsFillStarFill className="starIcon" />
                <p className="rating2">{rating}</p>
              </div>
              <p className="statusCard">
                Status: <span className="status2">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="line" />
          <div className="bottomCard">
            <h1 className="title3">About Author</h1>
            <p className="para2">{aboutAuthor}</p>
            <h1 className="title3">About Book</h1>
            <p className="para2">{aboutBook}</p>
          </div>
        </div>
        <ContactUs />
      </>
    )
  }

  onClickTryAgain = () => {
    this.getBookDetails()
  }

  getFailureView = () => (
    <div className="failureContainer2">
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
      <div className="bookDetailsContainer">
        <Header />
        {this.getApiStatus()}
      </div>
    )
  }
}

export default BookDetails
