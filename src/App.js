import React, {useState, useEffect} from 'react';
import './App.css';
import Character from './components/Card/Character';
import axios from 'axios';

function App() {

  const PUBLIC_KEY = "4dea2179d429b3c3481c9343414b0227"
  const TIMESTAMP = "1600783133";
  const HASH = "f720aa3e246474b3e4eb05230211aa60";

  const[offset, setOffset] = useState(0);
  const[comicsOffset, setComicsOffset] = useState(0);
  const[seriesOffset, setSeriesOffset] = useState(0);
  const[currentOffset, setCurrentOffset] = useState(0);

  const[isLoading, setIsLoading] = useState(true);

  const[showCharacters, setShowCharacters] = useState(true);
  const[showComics, setShowComics] = useState(false);
  const[showSeries, setShowSeries] = useState(false);

  const[data, setData] = useState([]);

  const charactersURL = `http://gateway.marvel.com/v1/public/characters?ts=${TIMESTAMP}&apikey=${PUBLIC_KEY}&hash=${HASH}&offset=${offset}`;
  const comicsURL = `http://gateway.marvel.com/v1/public/comics?ts=${TIMESTAMP}&apikey=${PUBLIC_KEY}&hash=${HASH}&offset=${comicsOffset}`;
  const seriesURL = `http://gateway.marvel.com/v1/public/series?ts=${TIMESTAMP}&apikey=${PUBLIC_KEY}&hash=${HASH}&offset=${seriesOffset}`;
  
  const onClickCharactersTab = () => {
    setIsLoading(true);
    setShowCharacters(true);
    setCurrentOffset(offset);
    setShowComics(false);
    setShowSeries(false);
  }

  const onClickComicsTab = () => {
    setIsLoading(true);
    setCurrentOffset(comicsOffset);
    setShowCharacters(false);
    setShowComics(true);
    setShowSeries(false);    
  }

  const onClickSeriesTab = () => {
    setIsLoading(true);
    setShowCharacters(false);
    setCurrentOffset(seriesOffset);
    setShowComics(false);
    setShowSeries(true);  
  }

  const onClickPrev = () => {
    if(showCharacters){
      if(offset > 0){
        setOffset(offset - 20);
      }
      setCurrentOffset(offset);
    }else if(showComics){
      if(comicsOffset > 0){
        setComicsOffset(comicsOffset - 20);
      }
      setCurrentOffset(comicsOffset);
    }else if(showSeries){
      if(seriesOffset > 0){
        setSeriesOffset(seriesOffset - 20);
      }
      setCurrentOffset(seriesOffset);
    }
  }

  const onClickNext = () => {
    setCurrentOffset(currentOffset);
    if(showCharacters){
      setOffset(offset + 20);
      setCurrentOffset(offset);
    }else if(showComics){
      setComicsOffset(comicsOffset + 20);
      setCurrentOffset(comicsOffset);
    }else if(showSeries){
      setSeriesOffset(seriesOffset + 20);
      setCurrentOffset(seriesOffset);
    }  
  }

  useEffect(() => {
    setCurrentOffset(currentOffset);
    let URL = "";
    const fetchData = async () => {
      if(showCharacters === true){
        URL = charactersURL;
      }else if(showComics === true){
        URL = comicsURL;
      }else if(showSeries === true){
        URL = seriesURL;
      }
      const response = await axios(URL);
      if(response){
        setData(response.data.data.results);
        setIsLoading(false);
      }
    };
    fetchData();
  },[showCharacters, showComics, showSeries, charactersURL, comicsURL, seriesURL, currentOffset, setCurrentOffset]);

  console.log("content rendered");
  return (
    <div className="container">
        <div className="marvel-logo">
            <img src={process.env.PUBLIC_URL + '/marvel-logo.png'} alt="marvel-logo" width="150px" height="75px"/>       
        </div>
        <div className="tab-container"> 
          {
            currentOffset <= 0 ?
            <button className="inactive" disabled >Prev</button>:
            <button className="prev" onClick={onClickPrev}> Prev</button> 
          }
          {  currentOffset >= 1490 ? 
            <button className="inactive" disabled>Next{currentOffset}</button> :
            <button className="next" onClick={onClickNext}>Next</button>
          }
        </div>
        <div className="switch-tabs-container">
          <button className="tab-btn" onClick={onClickCharactersTab}>Characters</button>
          <button className="tab-btn" onClick={onClickComicsTab}>Comics</button>
          <button className="tab-btn" onClick={onClickSeriesTab}>Series</button>
        </div>
        {
          isLoading ? 
          <div className="loading-container">
            <h1>Loading...</h1>
          </div> : 
          <div className="grid-container">
            { 
              data.map((res, key) => (
                <Character key={key}  {...res}/>
              ))
            }      
          </div> 
        }

    </div>
  );
}

export default App;
