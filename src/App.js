import React, {useState, useEffect} from 'react';
import './App.css';
import Character from './components/Card/Character';
import axios from 'axios';

function App() {

  const PUBLIC_KEY = "4dea2179d429b3c3481c9343414b0227"
  const TIMESTAMP = "1600783133";
  const HASH = "f720aa3e246474b3e4eb05230211aa60";

  const[data, setData] = useState([]);
  const[offset, setOffset] = useState(0);
  const[isLoading, setIsLoading] = useState(true);

  const URL = `http://gateway.marvel.com/v1/public/characters?ts=${TIMESTAMP}&apikey=${PUBLIC_KEY}&hash=${HASH}&offset=${offset}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(URL);
      if(response){
        setData(response.data.data.results);
        setIsLoading(false);
      }
    };
    fetchData();
  },[URL]);

  return (
    <div className="container">
        <div className="marvel-logo">
            <img src={process.env.PUBLIC_URL + '/marvel-logo.png'} alt="marvel-logo" width="150px" height="75px"/>       
        </div>
        <div className="tab-container"> 
          {
            offset > 0 ?
            <button className="prev" onClick={() => setOffset(offset - 20)} >Prev</button> :
            <button className="inactive" disabled > Prev</button>
          }
          {   offset >= 1490 ? 
            <button className="inactive" disabled>Next</button> :
            <button className="next" onClick={() => setOffset(offset + 20)}>Next</button>
          }
        </div>
        {
          isLoading ? 
          <div className="loading-container">
            <h1>Loading...</h1>
          </div> : 
          <div className="grid-container">
            { 
              data.map((res, key) => {
                return <Character key={key}  {...res}/>
              })
            }      
          </div>
        }

    </div>
  );
}

export default App;
