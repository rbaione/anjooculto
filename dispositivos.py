from datetime import datetime
from flask import jsonify, make_response, abort

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/") # Local
db = client.dispositivos

def get_dict_from_mongodb():
    itens_db = db.dispositivos.find()
    DISP = {}
    for i in itens_db:
            i.pop('_id') # retira id: criado automaticamente 
            item = dict(i)
            DISP[item["id_disp"]] = (i)
    return DISP

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def read_all():
    DISP = get_dict_from_mongodb()
    dict_dispositivos = [DISP[key] for key in sorted(DISP.keys())]
    dispositivos = jsonify(dict_dispositivos)
    qtd = len(dict_dispositivos)
    content_range = "dispositivos 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    dispositivos.headers['Access-Control-Allow-Origin'] = '*'
    dispositivos.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    dispositivos.headers['Content-Range'] = content_range
    return dispositivos


def read_one(id_disp):
    DISP = get_dict_from_mongodb()
    if id_disp in DISP:
        disp = DISP.get(id_disp)
    else:
        abort(
            404, "Dispositivo com o {id_disp} nao encontrado".format(id_disp=id_disp)
        )
    return disp


def create(disp):
    id_disp = disp.get("id_disp", None)
    full_name = disp.get("full_name", None)
    DISP = get_dict_from_mongodb()
    if id_disp not in DISP and id_disp is not None:
        item = {
            "id_disp": id_disp,
            "full_name": full_name,
            "timestamp": get_timestamp(),
        }
        db.dispositivos.insert_one(item)
        return make_response(
            "ID {id_disp} do dispositivo criado com sucesso".format(id_disp=id_disp), 201
        )
    else:
        abort(
            406,
            "Dispositivo com o {id_disp} ja existe".format(id_disp=id_disp),
        )


def update(id_disp, disp):
    query = { "id_disp": id_disp }
    update = { "$set": {
            "id_disp": id_disp,
            "full_name": disp.get("full_name"),
            "timestamp": get_timestamp(), } 
        }
    DISP = get_dict_from_mongodb()

    if id_disp in DISP:
        db.dispositivos.update_one(query, update)
        DISP = get_dict_from_mongodb()
        return DISP[id_disp]
    else:
        abort(
            404, "Dispositivo com o {id_disp} nao encontrado".format(id_disp=id_disp)
        )

def delete(id_disp):
    query = { "id_disp": id_disp }
    DISP = get_dict_from_mongodb()
    if id_disp in DISP:
        db.dispositivos.delete_one(query)
        return make_response(
            "ID {id_disp} deletado com sucesso".format(id_disp=id_disp), 200
        )
    else:
        abort(
            404, "Dispositivo com o ID {id_disp} nao encontrada".format(id_disp=id_disp)
        )

