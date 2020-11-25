import React, { useState } from "react";
import AddMovieForm from "./AddMovieForm";
import { dynamicMoviesList } from "./data";
import ImprovedMovieCard from "./ImprovedMovieCard";

const DynamicMovieList = () => {
  const [movies, setMovies] = useState(dynamicMoviesList);
  const [showOscarAwarded, setShowOscarAwarded] = useState(false);

  const deleteMovieHandler = (movieId) => {
    // Make copy of state so that we aren't directly mutating the state
    const moviesCopy = [...movies];
    // Look into movie state and compare incoming id with object id in state
    const movieIndex = moviesCopy.findIndex((item) => item.id === movieId);
    // Remove the movie that is similar
    moviesCopy.splice(movieIndex, 1);
    // setMovies - updating the values in the state 'movies'
    setMovies(moviesCopy);
  };

  // function to help toggle movies based on the state of showOscars
  const toggleMovies = () => setShowOscarAwarded(!showOscarAwarded);

  // filterMovies is the new array the results from filtering through the movies state and comparing the values of hasOscars and showOscarAwarded
  const filteredMovies = movies.filter(
    (movieItem) => movieItem.hasOscars === showOscarAwarded
  );

  // Add movie handler
  const addMovieHandler = (theMovie) => {
    const moviesCopy = [...movies]; // copy!
    moviesCopy.push(theMovie);
    setMovies(moviesCopy);
  };

  return (
    <div>
      {/* Form to add movies */}
      <AddMovieForm addMovie={addMovieHandler} />

      {/* Mapping through the new filtered list so that our button at the bottom can work */}
      {filteredMovies.map((movieItem, index) => (
        <ImprovedMovieCard
          key={index}
          {...movieItem}
          deleteOnClick={deleteMovieHandler}
        />
      ))}

      {/* Button that uses the toggleMovies to toggle movies according to whether they have oscars or not */}
      <button onClick={() => toggleMovies()}>
        {showOscarAwarded ? "Hide Oscar Awarded" : "Show Oscar Awarded"}
      </button>
    </div>
  );
};

export default DynamicMovieList;
