import React, { useEffect, useState } from 'react';
import './App.css';
import Routes from './routes';

const locations = [
  "Main Gate",
  "Market Complex Circle",
  "D-Type Circle",
  "Serpentine Entrance via Market Complex",
  "Serpentine Entrance via Subhansiri",
  "Serpentine Entrance via Hospital",
  "New Guest House",
  "Hospital",
  "Married Scholar Gate 2",
  "Married Scholar Gate 1",
  "Biotech Park Road",
  "Dhansiri",
  "New Sac",
  "Swimming Pool Ground",
  "Central Gym",
  "Kameng Turn",
  "Kameng",
  "Manas",
  "Barak Turn",
  "Umiam/Barak",
  "Brahma Y Junction",
  "Khoka Market",
  "Dihing Gate",
  "Dihing Mess",
  "Brahma Gate",
  "Brahma Hostel",
  "Kapili",
  "Kapili Road",
  "Tapri",
  "Lohit Turn",
  "Lohit",
  "Old Sac Junction",
  "Old Sac Office",
  "Old Sac",
  "Subansiri Stop",
  "Subansiri",
  "F-Type Bus Stop",
  "Conference Circle",
  "Director's Bungalow",
  "Auditorium",
  "Conference Centre",
  "Cycle Shop",
  "Library Turn",
  "Library Entrance",
  "Bank",
  "Lecture Hall",
  "Core 1",
  "Academic Complex Cycle Stand",
  "Core 5 Road",
  "Mechanical Workshop",
  "Core 5",
  "Core 5 Entrance",
  "Core 2",
  "Core 3",
  "Core 2/3 Turn",
  "Hashtag",
  "Core 4 Junction",
  "Tea Stall Core 5",
  "Core 4",
  "Core 5 Road 2",
  "Core 5 Road 1",
  "Tea Stall Core 4",
  "Academic Complex Road",
  "KV Gate"
];

const App = () => {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [mode, setMode] = useState('walk');

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);

    const storedFavorites = JSON.parse(localStorage.getItem('favoriteLocations')) || [];
    setFavoriteLocations(storedFavorites);
  }, []);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const a = e.target[0].value;
    const b = e.target[1].value;

    try {
      const response = await fetch(`http://localhost:5000/shortd/${a}/${b}`);
      const jsonData = await response.json();
      setData({ ...jsonData, mode });
      addRecentSearch(a, b);
    } catch (error) {
      console.error('Error:', error);
    }

    setDisplay(true);
    e.target[0].value = '';
    e.target[1].value = '';
  };

  const addRecentSearch = (source, destination) => {
    const newSearch = { source, destination };
    const updatedSearches = [newSearch, ...recentSearches].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const toggleFavoriteLocation = (location) => {
    let updatedFavorites;
    if (favoriteLocations.includes(location)) {
      updatedFavorites = favoriteLocations.filter(fav => fav !== location);
    } else {
      updatedFavorites = [...favoriteLocations, location];
    }
    setFavoriteLocations(updatedFavorites);
    localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
  };


  const calculateTime = (distance, mode) => {
    const speeds = { walk: 5, bike: 15, car: 40, cycle: 10 }; // Speeds in km/h
    const timeInHours = distance / 1000 / speeds[mode];
    const timeInMinutes = Math.round(timeInHours * 60);
    return `${timeInMinutes} minutes`;
  };

  return (
    <div className='mainContainer'>
      <div className='projectHeader'>IITG PathFinder</div>

      <div className='Maps'>
        <div 
          className='satMap' 
          onClick={() => window.location.href = 'https://www.iitg.ac.in/campusmap/index.php?hq'}
        ></div>
      </div>
      <div className='recentSearches'>
        <h3>Recent Searches</h3>
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index} onClick={() => {
              document.getElementById('source').value = search.source;
              document.getElementById('destination').value = search.destination;
            }}>
              {search.source} to {search.destination}
            </li>
          ))}
        </ul>
      </div>
      <div className='formInput'>
        <form method='post' onSubmit={onsubmitHandler} className='formGroup'>
          <div className='sourceForm'>
            <label htmlFor='source'>Source</label>
            <select id='source' name='a' className='sourceInput' required>
              <option value=''>Select Source</option>
              {favoriteLocations.map((location, index) => (
                <option key={index} value={location}>{location}★</option>
              ))}
              {locations.filter(location => !favoriteLocations.includes(location)).map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
            {/* <button 
              type='button' 
              onClick={() => toggleFavoriteLocation(document.getElementById('source').value)}
              className='starButton'
            >
              button
            </button> */}
          </div>

          <div className='destinationForm'>
            <label htmlFor='destination'>Destination</label>
            <select id='destination' name='b' className='destinationInput' required>
              <option value=''>Select Destination</option>
              {favoriteLocations.map((location, index) => (
                <option key={index} value={location}>{location} ★</option>
              ))}
              {locations.filter(location => !favoriteLocations.includes(location)).map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className='modeSelect'>
            <label htmlFor='mode'>Mode of Travel</label>
            <select id='mode' value={mode} onChange={(e) => setMode(e.target.value)} required>
              <option value='walk'>Walk</option>
              <option value='cycle'>Cycle</option>
              <option value='bike'>Bike</option>
              <option value='car'>Car</option>
            </select>
          </div>

          <div className='submitForm'>
            <button type='submit' className='submitButton'>Find Path</button>
          </div>
        </form>
      </div>



      {display && data.path && (
        <div className='pathResult'>
          <h2>Shortest Path</h2>
          <p>
            <strong>From:</strong> {data.from} <br />
            <strong>To:</strong> {data.to} <br />
            <strong>Path:</strong> {data.path.join(' -> ')} <br />
            <strong>Total Distance:</strong> {data.totalDis} meters <br />
            <strong>Estimated Time:</strong> {calculateTime(data.totalDis, mode)}
          </p>
        </div>
      )}

      {display && !data.path && (
        <div className='pathResult'>
          <h2>No Path Found</h2>
          <p>There was an issue calculating the path. Please try different locations.</p>
        </div>
      )}
    </div>
  );
};

export default App;

// const App = () => {
//   const [data, setData] = useState([]);
//   const [display, setDisplay] = useState(false);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [favoriteLocations, setFavoriteLocations] = useState([]);
//   const [mode, setMode] = useState('walk');

//   useEffect(() => {
//     const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
//     setRecentSearches(storedSearches);

//     const storedFavorites = JSON.parse(localStorage.getItem('favoriteLocations')) || [];
//     setFavoriteLocations(storedFavorites);
//   }, []);

//   const onsubmitHandler = async (e) => {
//     e.preventDefault();
//     const a = e.target[0].value;
//     const b = e.target[1].value;

//     try {
//       const response = await fetch(`http://localhost:5000/shortd/${a}/${b}`);
//       const jsonData = await response.json();
//       setData({ ...jsonData, mode });
//       addRecentSearch(a, b);
//     } catch (error) {
//       console.error('Error:', error);
//     }

//     setDisplay(true);
//     e.target[0].value = '';
//     e.target[1].value = '';
//   };

//   const addRecentSearch = (source, destination) => {
//     const newSearch = { source, destination };
//     const updatedSearches = [newSearch, ...recentSearches].slice(0, 5);
//     setRecentSearches(updatedSearches);
//     localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
//   };

//   const toggleFavoriteLocation = (location) => {
//     let updatedFavorites;
//     if (favoriteLocations.includes(location)) {
//       updatedFavorites = favoriteLocations.filter(fav => fav !== location);
//     } else {
//       updatedFavorites = [...favoriteLocations, location];
//     }
//     setFavoriteLocations(updatedFavorites);
//     localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
//   };

//   const calculateTime = (distance, mode) => {
//     const speeds = { walk: 5, bike: 15, car: 40, cycle: 10 }; // Speeds in km/h
//     const timeInHours = distance / 1000 / speeds[mode];
//     const timeInMinutes = Math.round(timeInHours * 60);
//     return `${timeInMinutes} minutes`;
//   };

//   return (
//     <div className='mainContainer'>
//       <div className='projectHeader'>IITG PathFinder</div>

//       <div className='Maps'>
//         <div 
//           className='satMap' 
//           onClick={() => window.location.href = 'https://www.iitg.ac.in/campusmap/index.php?hq'}
//         ></div>
//       </div>

//       <div className='recentSearches'>
//         <h3>Recent Searches</h3>
//         <ul>
//           {recentSearches.map((search, index) => (
//             <li key={index} onClick={() => {
//               document.getElementById('source').value = search.source;
//               document.getElementById('destination').value = search.destination;
//             }}>
//               {search.source} to {search.destination}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className='formInput'>
//         <form method='post' onSubmit={onsubmitHandler} className='formGroup'>
//           <div className='sourceForm'>
//             <label htmlFor='source'>Source</label>
//             <select id='source' name='a' className='sourceInput' required>
//               <option value=''>Select Source</option>
//               {favoriteLocations.map((location, index) => (
//                 <option key={index} value={location}>{location}★</option>
//               ))}
//               {locations.filter(location => !favoriteLocations.includes(location)).map((location, index) => (
//                 <option key={index} value={location}>{location}</option>
//               ))}
//             </select>
//             <button 
//               type='button' 
//               onClick={() => toggleFavoriteLocation(document.getElementById('source').value)}
//               className='starButton'
//             >
//               ⭐
//             </button>
//           </div>

//           <div className='destinationForm'>
//             <label htmlFor='destination'>Destination</label>
//             <select id='destination' name='b' className='destinationInput' required>
//               <option value=''>Select Destination</option>
//               {favoriteLocations.map((location, index) => (
//                 <option key={index} value={location}>{location}★</option>
//               ))}
//               {locations.filter(location => !favoriteLocations.includes(location)).map((location, index) => (
//                 <option key={index} value={location}>{location}</option>
//               ))}
//             </select>
//             <button 
//               type='button' 
//               onClick={() => toggleFavoriteLocation(document.getElementById('destination').value)}
//               className='starButton'
//             >
//               ⭐
//             </button>
//           </div>

//           <div className='modeSelect'>
//             <label htmlFor='mode'>Mode of Travel</label>
//             <select id='mode' value={mode} onChange={(e) => setMode(e.target.value)} required>
//               <option value='walk'>Walk</option>
//               <option value='cycle'>Cycle</option>
//               <option value='bike'>Bike</option>
//               <option value='car'>Car</option>
//             </select>
//           </div>

//           <div className='submitForm'>
//             <button type='submit' className='submitButton'>Find Path</button>
//           </div>
//         </form>
//       </div>

//       {display && data.path && (
//         <div className='pathResult'>
//           <h2>Shortest Path</h2>
//           <p>
//             <strong>From:</strong> {data.from} <br />
//             <strong>To:</strong> {data.to} <br />
//             <strong>Path:</strong> {data.path.join(' -> ')} <br />
//             <strong>Total Distance:</strong> {data.totalDis} meters <br />
//             <strong>Estimated Time:</strong> {calculateTime(data.totalDis, mode)}
//           </p>
//         </div>
//       )}

//       {display && !data.path && (
//         <div className='pathResult'>
//           <h2>No Path Found</h2>
//           <p>There was an issue calculating the path. Please try different locations.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;  