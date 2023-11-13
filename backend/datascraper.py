from nba_api.stats.endpoints import scoreboard, boxscoretraditionalv2
import os
import pandas as pd
from datetime import date
from datetime import timedelta

def get_game_ids():
    yesteday = date.today() - timedelta(days = 1)
    y = str(yesteday).split('-')
    y = str(y[1])+'/'+str(y[2])+'/'+str(y[0])
    s = scoreboard.Scoreboard(game_date=y)
    games = None
    for r in s.get_dict()['resultSets']:
        if r['name'] == 'LineScore':
            games = r
    df = pd.DataFrame(games['rowSet'], columns = games['headers']) 
    return set(df['GAME_ID'])

def save_boxscore(game_id):
    game = boxscoretraditionalv2.BoxScoreTraditionalV2(game_id=game_id).get_dict()['resultSets'][0]
    df = pd.DataFrame(game['rowSet'], columns = game['headers']) 
    if(os.path.isfile('data/api-fetch/'+str(game_id)+'.csv')):
        df = pd.read_csv('data/api-fetch/'+str(game_id)+'.csv')
    else:
        game = boxscoretraditionalv2.BoxScoreTraditionalV2(game_id=game_id).get_dict()['resultSets'][0]
        df = pd.DataFrame(game['rowSet'], columns = game['headers']) 
        os.makedirs('data/api-fetch', exist_ok=True)  
        df.to_csv('data/api-fetch'+str(game_id)+'.csv', index=False)  

    return df

def calculate_game_score(row):
    try:
        #Game Score = PTS + 0.4 * FG - 0.7 * FGA - 0.4*(FTA - FT) + 0.7 * ORB + 0.3 * DRB + STL + 0.7 * AST + 0.7 * BLK - 0.4 * PF - TOV
        gs = int(row['PTS']) + (0.4*int(row['FGM'])) - (0.7 * int(row['FGA'])) - (0.4 * (int(row['FTA'])-int(row['FTM']))) + (0.7*int(row['OREB'])) + (0.3*int(row['DREB'])) + int(row['STL']) + (0.7*int(row['AST'])) + (0.7*int(row['BLK'])) - (0.4*int(row['PF'])) - int(row['TO'])
        gs = round(gs, 2)
    except:
        #Player didnt play case
        gs = 0.0

    return gs

def generate_api_dataframe(df):
    teams = set(df['TEAM_ABBREVIATION'])
    team_1_name = teams.pop()
    team_2_name = teams.pop()
    team_1 = df[df['TEAM_ABBREVIATION'] == team_1_name]
    team_2 = df[df['TEAM_ABBREVIATION'] == team_2_name]
    team_1_pts = int(team_1['PTS'].sum())
    team_2_pts = int(team_2['PTS'].sum())
    team_1_victory = True if team_1_pts > team_2_pts else False
    team_2_victory = not team_1_victory

    best_pm_team_1 = get_max(team_1, 'PLUS_MINUS')
    best_pm_team_2 = get_max(team_2, 'PLUS_MINUS')
    worst_pm_team_1 = get_min(team_1,'PLUS_MINUS')
    worst_pm_team_2 = get_min(team_2,'PLUS_MINUS')

    best_gs_team_1 = get_max(team_1, 'GAME_SCORE')
    best_gs_team_2 = get_max(team_2, 'GAME_SCORE')
    worst_gs_team_1 = get_min(team_1, 'GAME_SCORE')
    worst_gs_team_2 = get_min(team_2, 'GAME_SCORE')

    team_1_row = build_row(team_1_name, team_1_pts, team_1_victory, best_pm_team_1, worst_pm_team_1, best_gs_team_1, worst_gs_team_1)
    team_2_row = build_row(team_2_name, team_2_pts, team_2_victory, best_pm_team_2, worst_pm_team_2, best_gs_team_2, worst_gs_team_2)

    COLUMNS=['TEAM_NAME', "TEAM_PTS", "TEAM_VIC", 
    "B_PM_NAME", "B_PM_PTS", "B_PM_REB", "B_PM_AST", "B_PM_PM", "B_PM_MIN", 
    "W_PM_NAME", "W_PM_PTS", "W_PM_REB", "W_PM_AST", "W_PM_PM", "W_PM_MIN",
    "B_GS_NAME", "B_GS_PTS", "B_GS_REB", "B_GS_AST", "B_GS_PM", "B_GS_MIN", 
    "W_GS_NAME", "W_GS_PTS", "W_GS_REB", "W_GS_AST", "W_GS_PM", "W_GS_MIN"]

    new_dataframe = pd.DataFrame([team_1_row, team_2_row], 
    columns=COLUMNS)
    os.makedirs('data/api-resp', exist_ok=True)  
    new_dataframe.to_csv("data/api-resp/" + str(df.iloc[0]['GAME_ID']) +".csv", index=False)


def cast_minutes(row):
    string = row['MIN']
    try:
        mins = string.split(':')[0]
    except:
        mins = 0.0
    return float(mins)
    
def get_max(df, column):
    return df.loc[df[column].idxmax()]

def get_min(df, column):
    return df.loc[df[column].idxmin()]

def build_row(team_name, team_pts, team_victory, best_pm, worst_pm, best_gs, worst_gs):
    return [team_name, team_pts, team_victory,
    best_pm['PLAYER_NAME'], best_pm['PTS'], best_pm['REB'], best_pm['AST'], best_pm['PLUS_MINUS'], best_pm['MIN'],
    worst_pm['PLAYER_NAME'], worst_pm['PTS'], worst_pm['REB'], worst_pm['AST'], worst_pm['PLUS_MINUS'], worst_pm['MIN'],
    best_gs['PLAYER_NAME'], best_gs['PTS'], best_gs['REB'], best_gs['AST'], best_gs['PLUS_MINUS'], best_gs['MIN'],
    worst_gs['PLAYER_NAME'], worst_gs['PTS'], worst_gs['REB'], worst_gs['AST'], worst_gs['PLUS_MINUS'], worst_gs['MIN']]

for game_id in get_game_ids():
    df = save_boxscore(game_id)
    #Add game score
    df['GAME_SCORE'] = df.apply(calculate_game_score, axis = 1)
    df['MIN'] = df.apply(cast_minutes, axis = 1)

    #Filter out players who havent played enough (well say 10 minutes for now but this may change)
    df = df[df['MIN'] > 10]

    generate_api_dataframe(df)
