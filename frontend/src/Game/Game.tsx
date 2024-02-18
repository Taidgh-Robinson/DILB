import React, { useState, useEffect } from 'react';
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import './Game.css'
import { gameProps, game, mapCodeToName, mapCodeToLogo } from './GameTypes';
import { Datatable } from '../Datatable/Datatable';

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
          bestGSGs: val.B_GS_GS,
          bestGSMin: val.B_GS_MIN,
          worstGSName: val.W_GS_NAME,
          worstGSPts: val.W_GS_PTS,
          worstGSReb: val.W_GS_REB,
          worstGSAst: val.W_GS_AST,
          worstGSGs: val.W_GS_GS,
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

  if (gameData.length === 0) {
    return <div>There were no games yesterday!</div>;
  }

  return (
    <div style={{ textAlign: "center" }} className="Game" >

      <h2><img className="team-logo" src={mapCodeToLogo(gameData[0].teamName)}></img>{mapCodeToName(gameData[0].teamName)} - {gameData[0].teamPoints} @ {mapCodeToName(gameData[1].teamName)} - {gameData[1].teamPoints} <img className="team-logo" src={mapCodeToLogo(gameData[1].teamName)}></img></h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>See Details (players who player 10+ minutes)</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <div className="row">
                <h3>Best Player by Plus Minus</h3>
                <div className="col-sm">
                  <Datatable headers={["Name", "Points", "Rebounds", "Assists", "Minutes", "±"]}
                    values={[gameData[0].bestPMName, gameData[0].bestPMPts, gameData[0].bestPMReb, gameData[0].bestPMAst, gameData[0].bestPMMin, gameData[0].bestPMPm]}></Datatable>
                </div>
                <div className="col-sm">
                  <Datatable headers={["Name", "Points", "Rebounds", "Assists", "Minutes", "±"]}
                    values={[gameData[1].bestPMName, gameData[1].bestPMPts, gameData[1].bestPMReb, gameData[1].bestPMAst, gameData[1].bestPMMin, gameData[1].bestPMPm]}></Datatable>
                </div>
              </div>
              <div className="row">
                <h3>Best Player by Game Score</h3>
                <div className="col-sm">
                  <Datatable headers={["Name", "Points", "Rebounds", "Assists", "Minutes", "Game Score"]}
                    values={[gameData[0].bestGSName, gameData[0].bestGSPts, gameData[0].bestGSReb, gameData[0].bestGSAst, gameData[0].bestGSMin, gameData[0].bestGSGs]}></Datatable>
                </div>
                <div className="col-sm">
                  <Datatable headers={["Name", "Points", "Rebounds", "Assists", "Minutes", "Game Score"]}
                    values={[gameData[1].bestGSName, gameData[1].bestGSPts, gameData[1].bestGSReb, gameData[1].bestGSAst, gameData[1].bestGSMin, gameData[1].bestGSGs]}></Datatable>
                </div>
              </div>
              <div className="row">
                <h3>Worst Player by Plus Minus</h3>
                <div className="col-sm">
                  <Datatable headers={["Name", "Points", "Rebounds", "Assists", "Minutes", "±"]}
                    values={[gameData[0].worstPMName, gameData[0].worstPMPts, gameData[0].worstPMReb, gameData[0].worstPMAst, gameData[0].worstPMMin, gameData[0].worstPMPm]}></Datatable>
                </div>
                <div className="col-sm">
                  <Datatable headers={["Name", "Points", "Rebounds", "Assists", "Minutes", "±"]}
                    values={[gameData[1].worstPMName, gameData[1].worstPMPts, gameData[1].worstPMReb, gameData[1].worstPMAst, gameData[1].worstPMMin, gameData[1].worstPMPm]}></Datatable>
                </div>
              </div>
              <div className="row">
                <h3>Worst Player by Game Score</h3>
                <div className="col-sm">
                  <Datatable headers={["Name", "Points", "Rebounds", "Assists", "Minutes", "GameScore"]}
                    values={[gameData[0].worstGSName, gameData[0].worstGSPts, gameData[0].worstGSReb, gameData[0].worstGSAst, gameData[0].worstGSMin, gameData[0].worstGSGs]}></Datatable>
                </div>
                <div className="col-sm">
                  <Datatable headers={["Name", "Points", "Rebounds", "Assists", "Minutes", "GameScore"]}
                    values={[gameData[1].worstGSName, gameData[1].worstGSPts, gameData[1].worstGSReb, gameData[1].worstGSAst, gameData[1].worstGSMin, gameData[1].worstGSGs]}></Datatable>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </ div >
  )
}
