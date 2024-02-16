from flask import Flask, Response, request
from helperfunctions import load_all_games, load_all_game_ids, load_game_by_id, delete_previous_response_data
from datascraper import generate_api_dataframes

app = Flask(__name__)
@app.route('/games')
def get_games():
    return load_all_game_ids()

@app.route('/game', methods=['GET'])
def get_game():
    args = request.args
    id = args.get('id')
    df = load_game_by_id(id)
    return Response(df.to_json(orient="records"), mimetype='application/json')

@app.route('/clear')
def clear_games():
    delete_previous_response_data()
    return "SUCCESFULLY DELETED GAME DATA"

@app.route('/fetch')
def fetch_games():
    generate_api_dataframes()
    return "SUCCESFULLY FETCHED GAME DATA"

if __name__ == '__main__':
    app.run(host='0.0.0.0')