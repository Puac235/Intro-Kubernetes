#!flask/bin/python
from flask import Flask
from flask import request
from flask import jsonify
from flask_socketio import SocketIO, send
from flask_cors import CORS
import boto3
import base64
import json
from pymongo import MongoClient
from bson.objectid import ObjectId 
import os
from datetime import datetime
import requests



app = Flask(__name__)
CORS(app)
socket = SocketIO(app, cors_allowed_origins="*")

#myclient = MongoClient('mongodb://'+ os.environ['MONGODB_HOSTNAME'] +':27017/',username = 'puac', password = '1234' )
myclient = MongoClient('mongodb://10.0.1.42:27017/',username = 'puac', password = '1234' )
mydb = myclient["dbSemi"]



@app.route('/', methods = ['GET'])
def index():
    return "Hello, World!"

@app.route('/reset', methods = ['GET'])
def reset():
    
    conection = mydb["usuarios"]
    conection.drop()

    return "Reset Successfully"

@app.route('/getUsers', methods = ['GET'])
def getUsers():
    conection = mydb["usuarios"]
    data = conection.find()
    salida = {'status':True, 'data':[]}
    for x in data:
        dato = {'id':str(x['_id']),'nombre': x['nombre'], 'user':x['user']}
        salida['data'].append(dato)
    return salida

@app.route('/getUser', methods = ['GET'])
def getUser():
    conection = mydb["usuarios"]
    username = request.args.get('user')
    data = conection.find_one({"user": username})
    salida = {'status':True, 'id':str(data['_id']), 'user': data['user'], 'nombre':data['nombre'], 'pass':data['pass']}
    return salida

@app.route('/login', methods = ['POST'])
def login():
    conection = mydb["usuarios"]
    datos = json.loads(request.data)
    data = conection.find_one(datos)
    salida = {'status':True, 'id':str(data['_id']), 'user': data['user'], 'nombre':data['nombre']}
    return salida

@app.route('/addUser', methods = ['POST'])
def addUser():
    conection = mydb["usuarios"]
    datos = json.loads(request.data)


    x = conection.insert_one(datos)
    return {'status':True, 'id': str(x.inserted_id), 'nombre': datos['nombre'], 'user': datos['user']}

@app.route('/updateUser', methods = ['PUT'])
def updateUser():
    conection = mydb["usuarios"]
    datos = json.loads(request.data)

    myquery = { "_id": ObjectId(datos['id']) }
    newvalues = { "$set": { "nombre": datos['nombre'], 'user': datos['user'] } }

    conection.update_one(myquery, newvalues)

    return {'status':True, 'id': datos['id'], 'nombre': datos['nombre'], 'user': datos['user']}

if __name__ == '__main__':
    socket.run(app, host='0.0.0.0')
