import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Character from './components/Card/Character';
import axios from 'axios';
import Tabs from './components/Tabs/Tabs';

function App() {

  const PUBLIC_KEY = "4dea2179d429b3c3481c9343414b0227"
  const TIMESTAMP = "1600783133";
  const HASH = "f720aa3e246474b3e4eb05230211aa60";

  const [offset, setOffset] = useState(0);
  const [comicsOffset, setComicsOffset] = useState(0);
  const [seriesOffset, setSeriesOffset] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [checkedTab, setCheckedTab] = useState('characters');
  const [darkTheme, setDarkTheme] = useState(false);
  const[isLoading, setIsLoading] = useState(true);
  const ref = useRef();

  const[data, setData] = useState([]);
  
  const constructUrl = (type) => `http://gateway.marvel.com/v1/public/${type}?ts=${TIMESTAMP}&apikey=${PUBLIC_KEY}&hash=${HASH}&offset=${currentOffset}`;
  const URL = constructUrl(checkedTab);

  const isCurrentTab = (tabName) => tabName === checkedTab;

  const handlePageChange = (isNext = true) => {
    const pageOffset = isNext ? 20 : -20;
    let offsetFunc;
    let currentTabOffset;
    switch(checkedTab) {
      case 'characters':
        offsetFunc = setOffset;
        currentTabOffset = offset;
        break;
      case 'comics':
        offsetFunc = setComicsOffset;
        currentTabOffset = comicsOffset;
        break;
      case 'series':
        offsetFunc = setSeriesOffset;
        currentTabOffset = seriesOffset;
        break;
      default:
        return;
    }
    const tempOffset = currentTabOffset + pageOffset;
    offsetFunc(tempOffset);
    setIsLoading(true);
    setCurrentOffset(tempOffset);
  }
  
  useEffect(() => {
    setCurrentOffset(currentOffset);
    const fetchData = async () => {
      const response = await axios(URL);
      if(response){
        ref.current.scrollTop = 0;
        setData(response.data.data.results);
        setIsLoading(false);
      }
    };
    fetchData();
  },[URL, checkedTab, currentOffset, setCurrentOffset]);
  
  const handleTabClick = (tabName, currentTabOffset) => {
    if(isCurrentTab(tabName))return;
    setIsLoading(true);
    setCurrentOffset(currentTabOffset);
  }

  const handleTabChange = (tabName, currentTabOffset) => {
    setCheckedTab(tabName);
    handleTabClick(tabName, currentTabOffset);
  }

  return (
    <div className={`container ${darkTheme ? 'dark-theme': ''}`}>
        <div className="marvel-logo">
            <img src={process.env.PUBLIC_URL + '/marvel-logo.png'} alt="marvel-logo" width="150px" height="75px"/>
            <div className="theme-toggle">
              <label class="switch"> 
                <input type="checkbox" checked={darkTheme} onChange={() => setDarkTheme(!darkTheme)}></input>
                <span class="slider round"></span>
              </label>
            </div>
        </div>
        <div className="main-content">
          <div className="tab-container">
            <button
              className={`${currentOffset <= 0 ? 'inactive' : 'prev'}`}
              disabled={currentOffset <= 0}
              onClick={() => handlePageChange(false)}
            >
              Prev
            </button>
            <button
              className={`${currentOffset >= 1490 ? 'inactive': 'next'}`}
              disabled={currentOffset >= 1490}
              onClick={() => handlePageChange()}
            >
              Next
            </button>
          </div>
          <Tabs checkedTab={checkedTab} handleTabChange={handleTabChange} offset={offset} comicsOffset={comicsOffset} seriesOffset={seriesOffset} />
            <div className="grid-wrapper" ref={ref}>
              { 
                isLoading ? 
                <div className="loading-container">
                  <img src={process.env.PUBLIC_URL + '/spinner2.gif'} alt="spinner" width="80px" height="80px"/>       
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
        </div>
    </div>
  );
}

export default App;
