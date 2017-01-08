define(['files'], function (Files) {

    var _listFiles,
        _formFiles,
        _contentPlayer,
        _player;

    function _initialize() {

        _listFiles      = $('#listFiles');
        _formFiles      = $('#formFiles');
        _contentPlayer  = $('#Player');
        _player         = _contentPlayer.find('video').get('0');

        _formFiles.on('submit', function (e) {

            e.preventDefault();

            _formFiles.ajaxSubmit({
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
 
            });

        });

        _contentPlayer.css({
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

        Files.getAll(_getFiles);

    }

    function _getFiles(files) {

        return;

        console.log(files);

        _contentPlayer.empty();

        $('<img>')
            .attr('src', 'data:image/jpeg;base64,' + files)
            .appendTo(_contentPlayer);

        return ;

        if (!files.length) {
            return false;
        }

        var source = $('<source>')
            .attr('src', '')
            .appendTo(_player);

        var items = [];

        for(var x = 0; x < files.length; x++) {

            (function (file) {
                var item = _createBlobFile(file);

                console.log(item);

                if (x == 0) {
                    source.attr('src', item.url);
                }
                items.push[item];

            })(files[x]);

        }

        _player.load();

    }

    function _createBlobFile(file) {

        var blob = b64toBlob([file.file], file.type);
        var blobUrl = URL.createObjectURL(blob);

        return {
            blob    : blob,
            url     : blobUrl
        };

    }

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        
        }

        var blob = new Blob(byteArrays, {type: contentType});

        return blob;
    }

    _initialize();

});
