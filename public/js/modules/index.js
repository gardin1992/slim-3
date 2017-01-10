define(['helpers', 'files', 'player'], function (Helper, Files, Player) {

	return function () {

		var _listFiles,
        _formFiles,
        _contentPlayer,
        _player,
        _source;

    function _createPlayer() {

        _contentPlayer  = Player({
            target: $('#Player'),
            type: 'video',
            config: {
                controls: true
            }
        });

        _player = _contentPlayer.getPlayer();

        _contentPlayer.getTarget().css({
            width: '100%',
            height: '500px'
        });

        $(_player)
            .removeAttr('controls')
            .css({
                width: '100%',
                height: '100%',
                background: '#000'
            });

    }

    function _createFormFiles() {

        var options = {
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {

                console.log('textStatus', textStatus);

                if (data.success) 
                    console.log('data', data);

                console.log('jqXHR', jqXHR);

            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log('textStatus', textStatus);
                console.log('errorThrown', errorThrown)

            }
        };

        _formFiles = $('#formFiles')
            .on('submit', function (e) {

                e.preventDefault();

                $(this).ajaxSubmit(options);

            });

    }

    function _createList() {

        _listFiles = $('#listFiles');
        Files.getAll(_getFiles);

    }

    function _initialize() {

        _createPlayer();
        _createFormFiles();
        _createList();

    }

    function _createItemList(file) {

        var group = $('<div>')
            .addClass('list-group-item')
            .appendTo(_listFiles);

        group.get(0).file = file;

        var link = $('<a>')
            .addClass('btn btn-link btn-sm')
            .html(file.name + ' <small>Type: ' + file.type+ '</small>')
            .on('click', function (e) {

                e.preventDefault();
                _changeFile(this.file);

            })
            .appendTo(group);

        $('<i>')
            .addClass('fa fa-pencil')
            .appendTo(link);

        $('<i>')
            .addClass('fa fa-eraser')
            .on('click', function () {

                Files.remove(file.id);
                group.remove();

            })
            .appendTo(link);

    }

    function _getFiles(files) {

        if (files.length) {

            for (x = 0; x < files.length; x++) {

                _createItemList(files[x]);

            }

            _changeFile(files[0]);

            return ;

        }

        _changeFile(files);

    }

    function _changeFile(item) {

        var blob = Helper.b64toBlob(item.file, item.type);
        var blobUrl = URL.createObjectURL(blob);

        _contentPlayer.setFile({
            blob: blob,
            blobUrl: blobUrl
        });

    }

    _initialize();

	};

});