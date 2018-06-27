from flask import Flask, jsonify, request
from flask_restful import Api, reqparse

app = Flask(__name__)
api = Api(app)

messages = [
    {"user": "Patrick", "content": "Hello world message", "date": "6/27/2018", "id": 0}, 
    {"user": "John", "content": "Johns message", "date": "6/28/2018",  "id": 1}
]

latestId = 1


@app.route('/messages/<int:messageId>', methods=['GET'])
def getMessage(messageId):
    for message in messages:
            if message["id"] == messageId:
                return jsonify(message), 200
    return "Message not found", 404


@app.route('/messages/', methods=['GET'])
def getMessages():
    return jsonify(messages), 200

@app.route('/messages', methods=['POST'])
def postMessage():
    global latestId, messages
    latestId += 1
    newMessage = {"user": request.args.get("user"), "content": request.args.get("content"), "id": latestId}
    messages.append(newMessage)
    return jsonify(latestId), 201
    

app.run(debug=True)