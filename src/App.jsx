import { useEffect,useState } from 'react';
import searchicon from './assets/search.svg';
import Moviecard from './Moviecard';
import './App.css'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const APP_URL = 'https://www.omdbapi.com/?apikey=651fc73e';

  const searchMovie = async (searchValue) => {
    const res = await fetch(`${APP_URL}&s=${searchValue}`);
    const data = await res.json();  
    setMovies(data.Search);
  }
  useEffect(()=>{
    searchMovie('stranger things');
  },[])
  


  return (
    <div className="app">
      <h1>MovieMania</h1>
      <div className='search'>
        <input 
          placeholder="Search for movies" 
          value={search} 
          onChange = {(e)=>{setSearch(e.target.value)}}
          onKeyDown = {(e)=>{if(e.key === 'Enter'){searchMovie(search)}}}
        />
        <img src={searchicon} alt='search icon' onClick={()=>{searchMovie(search)}}></img>
      </div>
      {
        movies?.length >0?(
          <div className='container'>
            {
              movies.map((movie)=>(
                <Moviecard movie={movie}/>
              ))
            }
          </div>

        ):(
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  )
}

export default App