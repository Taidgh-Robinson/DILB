import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css';
import { Game } from '../Game/Game'

function App() {

  // new line start
  const [gameData, setGamesData] = useState(null)
  const [isLoading, setLoading] = useState(true);

  function getData() {
    axios({
      method: "GET",
      url: "/games",
    })
      .then((response) => {
        const res = response.data
        setGamesData(({
          res: res
        }))
        setLoading(false);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }
  //end of new line 
  useEffect(() => {
    getData()
  }, [])

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }


  return (
    <html data-bs-theme="dark" >
      <div className="App" >
        <h1>Basketball Summarizer</h1>
        <h3>Yesterdays basketball, today</h3>
        <hr></hr>

        {gameData.res.map(d => (<Game id={d}></Game>))}
      </div>
    </html>
  );
}

export default App;
