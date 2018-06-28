from flask import Flask, jsonify, request
from flask_restful import Api, reqparse

app = Flask(__name__)
api = Api(app)

isuruDrinks = []

joseDrinks = []



@app.route('/jose/drinks/', methods=['GET'])
def getJoseDrinks():
    return jsonify(joseDrinks), 200


@app.route('/jose/drinks/', methods=['POST'])
def postJoseDrink():
    global joseDrinks
    time = int(request.args.get("time"))

    for item in joseDrinks:
        if (item["time"] == time):
            item["count"] += 1
            return jsonify(joseDrinks), 201

    joseDrinks.append({"time": time, "count": 1})
    return jsonify(joseDrinks), 201




@app.route('/isuru/drinks/', methods=['GET'])
def getIsuruDrinks():
    return jsonify(isuruDrinks), 200


@app.route('/isuru/drinks/', methods=['POST'])
def postIsuruDrink():
    global isuruDrinks
    time = int(request.args.get("time"))

    for item in isuruDrinks:
        if (item["time"] == time):
            item["count"] += 1
            return jsonify(isuruDrinks), 201

    isuruDrinks.append({"time": time, "count": 1})
    return jsonify(isururinks), 201
    

app.run(debug=True)