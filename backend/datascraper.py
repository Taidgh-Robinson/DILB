from nba_api.stats.endpoints import scoreboard
import pandas as pd



def get_game_ids():
    s = scoreboard.Scoreboard(game_date='10/31/2023')
    games = None
    for r in s.get_dict()['resultSets']:
        if r['name'] == 'LineScore':
            games = r
    df = pd.DataFrame(games['rowSet'], columns = games['headers']) 
    return set(df['GAME_ID'])

print(get_game_ids())