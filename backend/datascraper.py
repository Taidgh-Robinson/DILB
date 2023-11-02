from nba_api.stats.endpoints import scoreboard, boxscoretraditionalv2
import os
import pandas as pd

def get_game_ids():
    s = scoreboard.Scoreboard(game_date='10/31/2023')
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
        #Game Score = Points Scored + (0.4 x Field Goals) – (0.7 x Field Goal Attempts) – (0.4 x (Free Throw Attempts – Free Throws)) + (0.7 x Offensive Rebounds) + (0.3 x Defensive Rebounds) + Steals + (0.7 x Assists) + (0.7 x Blocks) – (0.4 x Personal Fouls) – Turnovers
        gs = row['PTS'] + (0.4*row['FGM']) - (0.7 * row['FGA']) - (0.4*(row['FTA']-row['FTM'])) + (0.7*row['OREB']) + (0.3*row['DREB']) + row['STL'] + (0.7*row['AST']) + (0.7*row['BLK']) - (0.4*row['PF']) - row['TO']
        print(row['PLAYER_NAME'] + " HAD A GAME SCORE OF: " +str(gs))



for game_id in get_game_ids():
    df = save_boxscore(game_id)
    calculate_game_score(df)