import React, { useState, useEffect } from 'react';
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';

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
    <Accordion className="text-center">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="text-center">{profileData.team1Name} - {profileData.team1Points} @ {profileData.team2Name} - {profileData.team2Points} </Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
      </div>
    )
}
