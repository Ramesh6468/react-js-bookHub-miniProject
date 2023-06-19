import {FaGoogle} from 'react-icons/fa'
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from 'react-icons/ai'
import './index.css'

const ContactUs = () => (
  <div className="contactUsSection">
    <div className="iconsCard">
      <FaGoogle className="Icon" />
      <AiOutlineTwitter className="Icon" />
      <AiOutlineInstagram className="Icon" />
      <AiFillYoutube className="Icon" />
    </div>
    <p className="contact">Contact Us</p>
  </div>
)

export default ContactUs
