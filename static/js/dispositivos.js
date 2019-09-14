// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function() {
    'use strict';

    let $event_pump = $('body');

    // Return the API
    return {
        'read': function() {
            let ajax_options = {
                type: 'GET',
                url: 'api/dispositivos',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_read_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        create: function(id_disp, full_name) {
            let ajax_options = {
                type: 'POST',
                url: 'api/dispositivos',
                accepts: 'application/json',
                contentType: 'application/json',
                //dataType: 'json',
                data: JSON.stringify({
                    'id_disp': id_disp,
                    'full_name': full_name
                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_create_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        update: function(id_disp, full_name) {
            let ajax_options = {
                type: 'PUT',
                url: 'api/dispositivos/' + id_disp,
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    'id_disp': id_disp,
                    'full_name': full_name
                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_update_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        'delete': function(full_name) {
            let ajax_options = {
                type: 'DELETE',
                url: 'api/dispositivos/' + full_name,
                accepts: 'application/json',
                contentType: 'plain/text'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_delete_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        }
    };
}());

// Create the view instance
ns.view = (function() {
    'use strict';

    let $id_disp = $('#id_disp'),
        $full_name = $('#full_name');

    // return the API
    return {
        reset: function() {
            $full_name.val('');
            $id_disp.val('').focus();
        },
        update_editor: function(id_disp, full_name) {
            $full_name.val(full_name);
            $id_disp.val(id_disp).focus();
        },
        build_table: function(disp) {
            let rows = ''

            // clear the table
            $('.conteudo table > tbody').empty();

            // did we get a disp array?
            if (disp) {
                for (let i=0, l=disp.length; i < l; i++) {
                    rows += `<tr><td class="id_disp">${disp[i].id_disp}</td><td class="full_name">${disp[i].full_name}</td><td>${disp[i].timestamp}</td></tr>`;
                }
                $('table > tbody').append(rows);
            }
        },
        error: function(error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function() {
                $('.error').css('visibility', 'hidden');
            }, 3000)
        }
    };
}());

// Create the controller
ns.controller = (function(m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $id_disp = $('#id_disp'),
        $full_name = $('#full_name');

    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100)

    // Validate input
    function validate(id_disp, full_name) {
        return id_disp !== "" && full_name !== "";
    }

    // Create our event handlers
    $('#create').click(function(e) {
        let id_disp = $id_disp.val(),
            full_name = $full_name.val();

        e.preventDefault();

        if (validate(id_disp, full_name)) {
            model.create(id_disp, full_name)
        } else {
            alert('Problema com os parâmetros: ID e nome do dispositivo');
        }
    });

    $('#update').click(function(e) {
        let id_disp = $id_disp.val(),
            full_name = $full_name.val();

        e.preventDefault();

        if (validate(id_disp, full_name)) {
            model.update(id_disp, full_name)            
        } else {
            alert('Problema com os parâmetros: ID e nome do dispositivo');
        }
        e.preventDefault();
    });

    $('#delete').click(function(e) {
        let id_disp = $id_disp.val();

        e.preventDefault();

        if (validate('placeholder', id_disp)) {
            model.delete(id_disp)
        } else {
            alert('Problema com os parâmetros: ID e nome do dispositivo');
        }
        e.preventDefault();
    });

    $('#reset').click(function() {
        //location.reload();
        //model.read();
        window.location.reload();
        view.reset();
    })

    $('table > tbody').on('dblclick', 'tr', function(e) {
        let $target = $(e.target),
            id_disp,
            full_name;

        id_disp = $target
            .parent()
            .find('td.id_disp')
            .text();

        full_name = $target
            .parent()
            .find('td.full_name')
            .text();

        view.update_editor(id_disp, full_name);
    });

    // Handle the model events
    $event_pump.on('model_read_success', function(e, data) {
        view.build_table(data);
        view.reset();
    });

    $event_pump.on('model_create_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_update_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_delete_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = "Msg de Erro:" + textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));