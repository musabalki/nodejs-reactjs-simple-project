import './App.css';
import React, { useState, useEffect } from "react"
import Axios from "axios"

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    getMovieList();
  }, [])

  const getMovieList = () => {
    Axios.get("http://localhost:3001/api/get").then((res) => {
      setMovieList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", { movieName, movieReview: review })
      .then((res) => {
        getMovieList();
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const deleteReview=(id)=>{
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
    .then(() => {
     console.log("success");
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="App">
      <div className="form">
        <h2>CRUD APPLICATION</h2>
        <label>Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => setMovieName(e.target.value)} />
        <label>Review</label>
        <input type="text" name="review" onChange={(e) => setReview(e.target.value)} />
        <button onClick={submitReview}>Add</button>
      </div>
      {
        movieReviewList.map((val) => {
          return (
            <div key={val.id}>
              <h1 key={val.id}>MovieName:{val.movieName} | Movie Review: {val.movieReview}</h1>
              <button onClick={()=>deleteReview(val.id)}>Delete</button>
              <button>Update</button>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
