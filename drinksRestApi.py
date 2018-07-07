from flask import Flask, jsonify, request
from flask_restful import Api, reqparse
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

# @app.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   return response


isuruDrinks = [{"time": 16, "count": 5}, {"time": 19, "count": 5}]

joseDrinks = []


@app.route('/jose/drinks/', methods=['GET'])
def getJoseDrinks():
    return jsonify(joseDrinks), 200, {'Access-Control-Allow-Origin': '*'}


@app.route('/jose/drinks/', methods=['POST'])
@cross_origin(supports_credentials=True)
def postJoseDrink():
    global joseDrinks
    print("Done")
    time = int(request.data)
    
    for item in joseDrinks:
        if (item["time"] == time):
            item["count"] += 1
            return jsonify(joseDrinks), 201#, {'Access-Control-Allow-Origin': '*'}

    joseDrinks.append({"time": time, "count": 1})
    return jsonify(joseDrinks), 201#, {'Access-Control-Allow-Origin': '*'}




@app.route('/isuru/drinks/', methods=['GET'])
#@cross_origin()
def getIsuruDrinks():
    return jsonify(isuruDrinks), 200, {'Access-Control-Allow-Origin': '*'}


@app.route('/isuru/drinks/', methods=['POST'])
@cross_origin(supports_credentials=True)
def postIsuruDrink():
    global isuruDrinks
    time = int(request.data)

    for item in isuruDrinks:
        if (item["time"] == time):
            item["count"] += 1
            return jsonify(isuruDrinks), 201, {'Access-Control-Allow-Origin': '*'}

    isuruDrinks.append({"time": time, "count": 1})
    return jsonify(isururinks), 201, {'Access-Control-Allow-Origin': '*'}
    

app.run(debug=True, threaded=True)