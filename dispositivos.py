from datetime import datetime
from flask import jsonify, make_response, abort

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

DISP = {
    "1": {
        "id_disp": "1",
        "full_name": "Disp1",
        "timestamp": get_timestamp(),
    },
    "2": {
        "id_disp": "2",
        "full_name": " Disp2",
        "timestamp": get_timestamp(),
    },
    "3": {
        "id_disp": "3",
        "full_name": "Disp3",
        "timestamp": get_timestamp(),
    },
}

def read_all():
    dict_disp = [DISP[key] for key in sorted(DISP.keys())]
    dispositivos = jsonify(dict_disp)
    qtd = len(dict_disp)
    content_range = "dispositivos 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    dispositivos.headers['Access-Control-Allow-Origin'] = '*'
    dispositivos.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    dispositivos.headers['Content-Range'] = content_range
    return dispositivos
    
def read_one(id_disp):
    if id_disp in DISP:
        disp = DISP.get(id_disp)
    else:
        abort(
            404, "Dispositivo com ID {id_disp} nao encontrado".format(id_disp=id_disp)
        )
    return disp    

def create(disp):
    id_disp = disp.get("id_disp", None)
    full_name   = disp.get("full_name", None)

    if id_disp not in DISP and id_disp is not None:
        DISP[id_disp] = {
            "id_disp": id_disp,
            "full_name": full_name,
            "timestamp": get_timestamp(),
        }
        return make_response(
            "Dispositivo {id_disp} criado com sucesso".format(id_disp=id_disp), 201
        )
    else:
        abort(
            406,
            "Dispositivo com ID {id_disp} ja existe".format(id_disp=id_disp),
        )

def update(id_disp, disp):
    if id_disp in DISP:
        DISP[id_disp]["full_name"] = disp.get("full_name")
        DISP[id_disp]["timestamp"] = get_timestamp()

        return DISP[id_disp]
    else:
        abort(
            404, "Dispositivo com o ID {id_disp} nao encontrado".format(id_disp=id_disp)
        )

def delete(id_disp):
    if id_disp in DISP:
        del DISP[id_disp]
        return make_response(
            "ID {id_disp} deletado com sucesso".format(id_disp=id_disp), 200
        )
    else:
        abort(
            404, "Dispositivo com ID {id_disp} nao encontrado".format(id_disp=id_disp)
        )        