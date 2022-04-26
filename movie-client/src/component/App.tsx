import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from './global/Navigation';
import Home from './global/Home';
import About from './global/About';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviesList from './moviesList/MoviesList';
import MoviesDetails from './moviesDetails/MoviesDetails';
import NoMatch from './global/NoMatch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navigation />
      <Container className="my-4">
          <Route path="/" component={Home} exact/>
          <Route path="/movies-in-theaters" component={MoviesList} exact />
          <Route path="/movies-coming" component={MoviesList} exact />
          <Route path="/top-rated-india" component={MoviesList} exact />
          <Route path="/top-rated-movies" component={MoviesList} exact />
          <Route path="/favourite" component={MoviesList} exact />
          <Route path="/about" component={About} exact />
          <Route path="/:moviesCategory/:path" component={MoviesDetails} exact/>
      </Container>
      <ToastContainer/>
    </>
  );
}

export default App;