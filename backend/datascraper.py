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
    os.makedirs('data', exist_ok=True)  
    df.to_csv('data/'+str(game_id)+'.csv', index=False)  

    return df

def calculate_game_score(df):
    for index, row in df.iterrows():
        pts = row['PTS']
        try:
            #Game Score = PTS + 0.4 * FG - 0.7 * FGA - 0.4*(FTA - FT) + 0.7 * ORB + 0.3 * DRB + STL + 0.7 * AST + 0.7 * BLK - 0.4 * PF - TOV
            gs = int(row['PTS']) + (0.4*int(row['FGM'])) - (0.7 * int(row['FGA'])) - (0.4 * (int(row['FTA'])-int(row['FTM']))) + (0.7*int(row['OREB'])) + (0.3*int(row['DREB'])) + int(row['STL']) + (0.7*int(row['AST'])) + (0.7*int(row['BLK'])) - (0.4*int(row['PF'])) - int(row['TO'])
        except:
            print(row['PLAYER_NAME'] + " DID NOT PLAY")

        print(row['PLAYER_NAME'] + " HAD A GAME SCORE OF: " +str(gs))

def get_max_pm(df):
    teams = set(df['TEAM_ABBREVIATION'])
    team_1 = df[df['TEAM_ABBREVIATION'] == teams.pop()]
    team_2 = df[df['TEAM_ABBREVIATION'] == teams.pop()]
    return(team_2)


for game_id in get_game_ids():
    df = save_boxscore(game_id)
    print(get_max_pm(df))