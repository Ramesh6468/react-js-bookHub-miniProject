import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home'
import BookShelves from './components/bookshelves'
import BookDetails from './components/bookDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/notFound'
import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={BookShelves} />
    <ProtectedRoute exact path="/books/:bookId" component={BookDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
