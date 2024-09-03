import React, { useState } from 'react';
import './App.css';
import Routes from './routes';

const App = () => {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [fullImage, setFullImage] = useState(null);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const a = e.target[0].value;
    const b = e.target[1].value;
    try {
      const response = await fetch(`http://localhost:5000/shortd/${a}/${b}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }

    setDisplay(true);
    e.target[0].value = '';
    e.target[1].value = '';
  };

  const openFullImage = (image) => {
    setFullImage(image);
  };

  const closeFullImage = () => {
    setFullImage(null);
  };

  return (
    <div className='mainContainer'>
      <div className='projectHeader'>IITG PathFinder</div>

      <div className='Maps'>
        <div className='satMap' onClick={() => openFullImage('./Maps/satMap.png')}></div>
        <div className='outMap' onClick={() => openFullImage('./Maps/outlineMap.png')}></div>
      </div>

      <div className='formInput'>
        <form method='post' onSubmit={onsubmitHandler} className='formGroup'>
          <div className='sourceForm'>
            <label htmlFor='source'>Source</label>
            <input id='source' name='a' type='number' min={1} max={64} placeholder='Enter Source' className='sourceInput' required></input>
          </div>
          <div className='destinationForm'>
            <label htmlFor='destination'>Destination</label>
            <input id='destination' name='b' type='number' min={1} max={64} placeholder='Enter Destination' className='destinationInput' required></input>
          </div>
          <button className='formButton'>Submit</button>
        </form>
      </div>

      <div className='projectDisplay'>
        {display && <Routes dataPoint={data} />}
      </div>

      {fullImage && (
        <div className='imageModal' onClick={closeFullImage}>
          <img src={fullImage} alt='Full Size Map' className='fullSizeImage' />
        </div>
      )}
    </div>
  );
};

export default App;
