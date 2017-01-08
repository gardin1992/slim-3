define(['helpers', 'files', 'player'], function (Helper, Files, Player) {

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

                console.log('data', data);
                console.log('textStatus', textStatus);
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

        _listFiles      = $('#listFiles');
        Files.getAll(_getFiles);

    }

    function _initialize() {

        _createPlayer();
        _createFormFiles();
        _createList();

    }

    function _getFiles(files) {

        if (files.length) {

            for (x = 0; x < files.length; x++) {

                (function (file) {

                    var li = $('<li>')
                    .addClass('')
                    .on('click', function (e) {

                        e.preventDefault();

                        _changeFile(this.file);

                    })
                    .appendTo(_listFiles);

                    li.get(0).file = file;

                    $('<a>')
                        .html(file.name + ' <small>Type: ' + file.type+ '</small>')
                        .appendTo(li);

                })(files[x]);

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

});
