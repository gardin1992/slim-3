define(['files'], function (Files) {

    var _listFiles,
        _formFiles,
        _contentPlayer,
        _player,
        _source;

    function _initialize() {

        _listFiles      = $('#listFiles');
        _formFiles      = $('#formFiles');
        _contentPlayer  = $('#Player');
        _player         = _contentPlayer.find('video').get('0');
        _source         = $('<source>');

        _source.appendTo(_player);

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

        var blob = b64toBlob(files.file, files.type);
        var blobUrl = URL.createObjectURL(blob);

        console.log(blob, blobUrl);

        _source.attr('src', blobUrl);
            _player.load();

        return;

        _contentPlayer.empty();

        if (files.type == 'image/jpeg')
            $('<img>')
            .attr('src', blobUrl)
            .appendTo(_contentPlayer);

        else {

            var video =  $('<video>')
                .appendTo(_contentPlayer);

            $('<source>')
                .attr('type', files.type)
                .attr('src', blobUrl)
                //.appendTo(video);            

            _player.src =  blobUrl; //= video.get(0);
            _player.load();

        } 

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
