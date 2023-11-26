import React, { useState, useEffect } from 'react';
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import './GameComponent.css'
import { gameProps, game } from './GameComponentTypes';

export function Game(props: gameProps) {

  const [gameData, setGameData] = useState<game[] | null>(null)
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<game[]>('/game', { params: { id: props.id } })
      .then(response => {
        let arr = response.data.map((val: any): game => ({
          teamName: val.TEAM_NAME,
          teamPoints: val.TEAM_PTS,
          teamVictory: val.TEAM_VIC,
          bestPMName: val.B_PM_NAME,
          bestPMPts: val.B_PM_PTS,
          bestPMReb: val.B_PM_REB,
          bestPMAst: val.B_PM_AST,
          bestPMPm: val.B_PM_PM,
          bestPMMin: val.B_PM_MIN,
          worstPMName: val.W_PM_NAME,
          worstPMPts: val.W_PM_PTS,
          worstPMReb: val.W_PM_REB,
          worstPMAst: val.W_PM_AST,
          worstPMPm: val.W_PM_PM,
          worstPMMin: val.W_PM_MIN,
          bestGSName: val.B_GS_NAME,
          bestGSPts: val.B_GS_PTS,
          bestGSReb: val.B_GS_REB,
          bestGSAst: val.B_GS_AST,
          bestGSGs: val.B_GS_PM,
          bestGSMin: val.B_GS_MIN,
          worstGSNName: val.W_GS_NAME,
          worstGSPts: val.W_GS_PTS,
          worstGSReb: val.W_GS_REB,
          worstGSAST: val.W_GS_AST,
          worstGSGs: val.W_GS_PM,
          worstGSMin: val.W_GS_MIN
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
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="text-center" >{gameData[0].teamName} - {gameData[0].teamPoints} @ {gameData[1].teamName} - {gameData[1].teamPoints} </Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <h3>Best Player by Plus Minus</h3>
              <div className="row">
                <div className="col-sm">
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Rebounds</th>
                        <th>Assists</th>
                        <th>Minutes</th>
                        <th>±</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{gameData[0].bestPMName}</td>
                        <td>{gameData[0].bestPMPts}</td>
                        <td>{gameData[0].bestPMReb}</td>
                        <td>{gameData[0].bestPMAst}</td>
                        <td>{gameData[0].bestPMMin}</td>
                        <td>{gameData[0].bestPMPm}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="col-sm">
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Rebounds</th>
                        <th>Assists</th>
                        <th>Minutes</th>
                        <th>±</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{gameData[1].bestPMName}</td>
                        <td>{gameData[1].bestPMPts}</td>
                        <td>{gameData[1].bestPMReb}</td>
                        <td>{gameData[1].bestPMAst}</td>
                        <td>{gameData[1].bestPMMin}</td>
                        <td>{gameData[1].bestPMPm}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <h3>Best Player by Game Score</h3>
<div className="row">
  <div className="col-sm">
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Points</th>
          <th>Rebounds</th>
          <th>Assists</th>
          <th>Minutes</th>
          <th>Game Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{gameData[0].bestGSName}</td>
          <td>{gameData[0].bestGSPts}</td>
          <td>{gameData[0].bestGSReb}</td>
          <td>{gameData[0].bestGSAst}</td>
          <td>{gameData[0].bestGSMin}</td>
          <td>{gameData[0].bestGSGs}</td>
        </tr>
      </tbody>
    </Table>
  </div>
  <div className="col-sm">
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Points</th>
          <th>Rebounds</th>
          <th>Assists</th>
          <th>Minutes</th>
          <th>Game Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{gameData[1].bestGSName}</td>
          <td>{gameData[1].bestGSPts}</td>
          <td>{gameData[1].bestGSReb}</td>
          <td>{gameData[1].bestGSAst}</td>
          <td>{gameData[1].bestGSMin}</td>
          <td>{gameData[1].bestGSGs}</td>
        </tr>
      </tbody>
    </Table>
  </div>
</div>

            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
