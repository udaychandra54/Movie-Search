import React, { useState } from "react";

const Form = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(false);
  //   const YOUR_APP_ID = "ba433bf0322b305e27042db69c1685ab";
  const YOUR_APP_KEY = "dd08f0e";
  const submitHandler = (e) => {
    e.preventDefault();
    setStatus(true)
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=${YOUR_APP_KEY}`)
      .then((res) => {
          if(res.ok){
              setStatus(false)
          }
        return res.json()
      })
      .then((data) => setMovies(data.Search))
      .catch((err) => console.log(err));
     
  };

  const download=(url,title)=>{
    fetch(url).then(res=>{
        res.arrayBuffer().then(function(buffer){
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement('a');
            link.href= url;
            link.setAttribute('download',`${title}.png`);
            document.body.appendChild(link);
            link.click();
        })
    }).catch(err=>{
        console.log(err)
    })
  }

  return (
    <>
    
      <div className="container px-0">
        <form
          className="container"
          onSubmit={submitHandler}
          style={{ width: "50%" }}
        >
          <div className="form-group">
            <label htmlFor="email">Search Movies:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Search"
              id="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

        </form>
        {status && (
            <div className='container mt-3'>
              <div className="spinner-border" role="status">
  <span className="visually-hidden"></span>
</div>
            </div>
        )}
        <div className="container px-0">
          {console.log(movies)}
          <div className="row">
            {movies.map((movie) => {
              return (
                <div className="col-md-4 my-2" key={movie.imdbID}>
                  <div className="card my-2 m-auto" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src={movie.Poster}
                      style={{ width: "100%" }}
                      alt="movie"
                    />
                    <div className="card-body">
                      <h4 className="card-title">
                        {movie.Title} - {movie.Year}
                      </h4>
                      <p className="card-text">{movie.Type}</p>
                      <a className='btn btn-primary' onClick={()=>download(movie.Poster,movie.Title)} download>Download Poster</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
