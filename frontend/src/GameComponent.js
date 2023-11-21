import React, { useState, useEffect } from 'react';
import axios from "axios";

export function Game(props){
  
  const [profileData, setProfileData] = useState(null)
  const [isLoading, setLoading] = useState(true);

  function getData() {
    axios({
      method: "GET",
      url:"/game",
      params: {id: props.id}
    })
    .then((response) => {
      const res = response.data
      setProfileData(({
        team1Name: res[0].TEAM_NAME,
        team1Points: res[0].TEAM_PTS,
        team2Name: res[1].TEAM_NAME,
        team2Points: res[1].TEAM_PTS}))
      setLoading(false);

    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    
    useEffect(() => {
      getData()
    }, [])

    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
  
    return(
      <div>
      <h2>HOME TEAM: {profileData.team1Name} - {profileData.team1Points}</h2>
      <h2>AWAY TEAM: {profileData.team2Name} - {profileData.team2Points}</h2>
      <hr></hr>
      </div>
    )
}
