import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookDetails
  return (
    <Link to={`/books/${id}`}>
      <div className="bookItemContainer">
        <img src={coverPic} alt={title} className="bookImage" />
        <div className="titleCard">
          <h1 className="bookTitle">{title}</h1>
          <p className="authorName2">{authorName}</p>
          <div className="ratingCard">
            <p className="ratingSide">Avg Rating</p>
            <BsFillStarFill className="starIcon" />
            <p className="rating">{rating}</p>
          </div>
          <p className="status">
            Status: <span className="readStatus">{readStatus}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default BookItem
