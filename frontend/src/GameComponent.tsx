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

export function Game(props: gameProps) {

  const [gameData, setGameData] = useState<game[] | null>(null)
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<game[]>('/game', { params: { id: props.id } })
      .then(response => {
        let arr = response.data.map((val: any): game => ({
          teamName: val.TEAM_NAME,
          teamPoints: val.TEAM_PTS
        }));

        setGameData(arr);
        setLoading(false);
      });
  }, [setGameData, setLoading, props.id])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!gameData) {
    return <div>No game data for some reason...</div>;
  }

  return (
    <div>
      <Accordion className="text-center">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="text-center">{gameData[0].teamName} - {gameData[0].teamPoints} @ {gameData[1].teamName} - {gameData[1].teamPoints} </Accordion.Header>
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
