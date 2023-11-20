from flask import Flask, Response, request
from helperfunctions import load_all_games, load_all_game_ids, load_game_by_id
api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@api.route('/games')
def get_games():
    return load_all_game_ids()

@api.route('/game', methods=['GET'])
def get_game():
    args = request.args
    id = args.get('id')
    df = load_game_by_id(id)
    return Response(df.to_json(orient="records"), mimetype='application/json')