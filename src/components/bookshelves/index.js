import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../header'
import BookItem from '../BookItem'
import ContactUs from '../contact'
import './index.css'

const initialApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    searchInput: '',
    booksList: [],
    apiStatus: initialApiStatus.initial,
    activeShelf: bookshelvesList[0].value,
    activeLabel: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getBookShelves()
  }

  onClickShelf = activeShelf => {
    this.setState({activeShelf}, this.getBookShelves)
  }

  getBookShelves = async () => {
    this.setState({apiStatus: initialApiStatus.loading})
    const {searchInput, activeShelf} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeShelf}&search=${searchInput}`
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
      const updatedData = data.books.map(each => ({
        id: each.id,
        title: each.title,
        readStatus: each.read_status,
        rating: each.rating,
        authorName: each.author_name,
        coverPic: each.cover_pic,
      }))
      console.log(updatedData)
      this.setState({
        booksList: updatedData,
        apiStatus: initialApiStatus.success,
      })
    } else {
      this.setState({apiStatus: initialApiStatus.failure})
    }
  }

  getSuccessView = () => {
    const {searchInput, activeShelf, booksList} = this.state
    if (booksList.length > 0) {
      return (
        <>
          <div className="successShelfContainer">
            <ul className="booksShelfListCard">
              {booksList.map(each => (
                <li key={each.id}>
                  <BookItem key={each.id} bookDetails={each} />
                </li>
              ))}
            </ul>
          </div>
          <ContactUs />
        </>
      )
    }
    return (
      <div className="emptyContainer">
        <img
          src="https://res.cloudinary.com/dg3vzfe7f/image/upload/v1687097570/Group_a0hlto.png"
          alt="no Books"
          className="errorImage2"
        />
        <p className="noBooksMsg">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchButton = () => {
    this.setState(
      prevState => ({searchInput: prevState.searchInput}),
      this.getBookShelves,
    )
  }

  onClickTryAgain = () => {
    this.getBookShelves()
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
    const {activeShelf, searchInput, activeLabel} = this.state
    return (
      <>
        <Header />
        <div className="bookShelvesContainer">
          <div className="shelfContainer">
            <h1 className="shelfTitle">BookShelves</h1>
            <ul className="bookShelvesList">
              {bookshelvesList.map(each => {
                const activeFilterClass =
                  activeShelf === each.value ? 'activeLabel' : ''
                const onClickShelf = () => {
                  this.setState(
                    {
                      activeShelf: each.value,
                      activeLabel: each.label,
                    },
                    this.getBookShelves,
                  )
                }
                return (
                  <li className="shelfItem" key={each.label}>
                    <button
                      className={`shelfButton ${activeFilterClass}`}
                      onClick={onClickShelf}
                      type="button"
                    >
                      {each.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="rightContainer">
            <div className="searchContainer">
              <h1 className="activeShelf">{activeLabel} Books</h1>
              <div className="searchIconCard">
                <input
                  type="search"
                  placeholder="search"
                  onChange={this.getSearchInput}
                  value={searchInput}
                  className="searchBar"
                />
                <button
                  className="searchButton"
                  type="button"
                  onClick={this.getSearchButton}
                  testid="searchButton"
                >
                  <BsSearch className="searchIcon" />
                </button>
              </div>
            </div>
            {this.getApiStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default BookShelves
