export type gameProps = {
    id: string
}

export type game = {
    teamName: string;
    teamPoints: string;
    teamVictory: string;
    bestPMName: string;
    bestPMPts: string;
    bestPMReb: string;
    bestPMAst: string;
    bestPMPm: string;
    bestPMMin: string;
    worstPMName: string;
    worstPMPts: string;
    worstPMReb: string;
    worstPMAst: string;
    worstPMPm: string;
    worstPMMin: string;
    bestGSName: string;
    bestGSPts: string;
    bestGSReb: string;
    bestGSAst: string;
    bestGSGs: string;
    bestGSMin: string;
    worstGSName: string;
    worstGSPts: string;
    worstGSReb: string;
    worstGSAst: string;
    worstGSGs: string;
    worstGSMin: string;
}

export function mapCodeToName(code: string) {
    if (code === "ATL") { return "Atlanta Hawks"; }
    if (code === "BOS") { return "Boston Celtics"; }
    if (code === "BKN") { return "Brooklyn Nets"; }
    if (code === "CHA") { return "Charlotte Hornets"; }
    if (code === "CHI") { return "Chicago Bulls"; }
    if (code === "CLE") { return "Cleveland Cavaliers"; }
    if (code === "DAL") { return "Dallas Mavericks"; }
    if (code === "DEN") { return "Denver Nuggets"; }
    if (code === "DET") { return "Detroit Pistons"; }
    if (code === "GSW") { return "Golden State Warriors"; }
    if (code === "HOU") { return "Houston Rockets"; }
    if (code === "IND") { return "Indiana Pacers"; }
    if (code === "LAC") { return "Los Angeles Clippers"; }
    if (code === "LAL") { return "Los Angeles Lakers"; }
    if (code === "MEM") { return "Memphis Grizzlies"; }
    if (code === "MIA") { return "Miami Heat"; }
    if (code === "MIL") { return "Milwaukee Bucks"; }
    if (code === "MIN") { return "Minnesota Timberwolves"; }
    if (code === "NOP") { return "New Orleans Pelicans"; }
    if (code === "NYK") { return "New York Knicks"; }
    if (code === "OKC") { return "Oklahoma City Thunder"; }
    if (code === "ORL") { return "Orlando Magic"; }
    if (code === "PHI") { return "Philadelphia 76ers"; }
    if (code === "PHX") { return "Phoenix Suns"; }
    if (code === "POR") { return "Portland Trail Blazers"; }
    if (code === "SAC") { return "Sacramento Kings"; }
    if (code === "SAS") { return "San Antonio Spurs"; }
    if (code === "TOR") { return "Toronto Raptors"; }
    if (code === "UTA") { return "Utah Jazz"; }
    if (code === "WAS") { return "Washington Wizards"; }
}

export function mapCodeToLogo(code: string) {
    if (code === "ATL") { return "logos/ATL.svg"; }
    if (code === "BOS") { return "logos/BOS.png"; }
    if (code === "BKN") { return "logos/BKN.png"; }
    if (code === "CHA") { return "logos/CHA.png"; }
    if (code === "CHI") { return "logos/CHI.png"; }
    if (code === "CLE") { return "logos/CLE.png"; }
    if (code === "DAL") { return "logos/DAL.svg"; }
    if (code === "DEN") { return "logos/DEN.svg"; }
    if (code === "DET") { return "logos/DET.png"; }
    if (code === "GSW") { return "logos/GSW.png"; }
    if (code === "HOU") { return "logos/HOU.png"; }
    if (code === "IND") { return "logos/IND.png"; }
    if (code === "LAC") { return "logos/LAC.png"; }
    if (code === "LAL") { return "logos/LAL.svg"; }
    if (code === "MEM") { return "logos/MEM.png"; }
    if (code === "MIA") { return "logos/MIA.png"; }
    if (code === "MIL") { return "logos/MIL.png"; }
    if (code === "MIN") { return "logos/MIN.png"; }
    if (code === "NOP") { return "logos/NOP.png"; }
    if (code === "NYK") { return "logos/NYK.png"; }
    if (code === "OKC") { return "logos/OKC.png"; }
    if (code === "ORL") { return "logos/ORL.png"; }
    if (code === "PHI") { return "logos/PHI.png"; }
    if (code === "PHX") { return "logos/PHX.svg"; }
    if (code === "POR") { return "logos/POR.png"; }
    if (code === "SAC") { return "logos/SAC.png"; }
    if (code === "SAS") { return "logos/SAS.png"; }
    if (code === "TOR") { return "logos/TOR.png"; }
    if (code === "UTA") { return "logos/UTA.png"; }
    if (code === "WAS") { return "logos/WAS.png"; }
}