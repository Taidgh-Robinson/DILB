import { useState, useEffect } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import {Game} from './GameComponent'

function App() {

   // new line start
  const [profileData, setProfileData] = useState(null)
  const [isLoading, setLoading] = useState(true);

  function getData() {
    axios({
      method: "GET",
      url:"/games",
    })
    .then((response) => {
      const res = response.data
      setProfileData(({
        res: res}))
        setLoading(false);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    //end of new line 
  useEffect(() => {
      getData()
    }, [])

  if (isLoading) {
      return <div className="App">Loading...</div>;
  }

  
  return (
    <div className="App">
        {profileData.res.map(d => (<Game id={d}></Game>))} 
    </div>
  );
}

export default App;
