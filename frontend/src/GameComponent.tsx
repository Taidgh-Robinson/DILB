import React, { useState, useEffect } from 'react';
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';

type gameProps = {
    id: string
}

interface game {
  teamName: string; 
  teamPoints: string;
}

export function Game(props : gameProps){
  
  const [profileData, setProfileData] = useState<game[] | null>(null)
  const [isLoading, setLoading] = useState(true);

  function getData() {
    axios.get<game[]>('/game', { params: { id: props.id } })
        .then(response => {
            console.log(response.data);
            let arr = response.data.map((val: any): game => ({
              teamName: val.TEAM_NAME,
              teamPoints: val.TEAM_PTS
           }));

            setProfileData(arr);
            setLoading(false);
        });
  }

    
    useEffect(() => {
      getData()
    }, [])

    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
  
    if(!profileData){
      return; 
    }

    return(
      <div>
    <Accordion className="text-center">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="text-center">{profileData[0].teamName} - {profileData[0].teamPoints} @ {profileData[1].teamName} - {profileData[1].teamPoints} </Accordion.Header>
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
