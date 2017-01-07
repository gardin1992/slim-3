define(["uploadFile"], function ( uploadFile ) {

    function sendFile(e) {

        e.stopPropagation(); // Stop stuff happening
        e.preventDefault(); // Totally stop stuff happening

        uploadFile.sendFiles({
            url     : '/upload',
            files   : _files,
            form    : this,
            callback : function () {

                console.log('callback');

            }
        });

    }

    $(function () {

        var _files;

        var _formUpload = $('#formUpload')
            .on('submit', function (e) {

                e.preventDefault();
                $(this).ajaxSubmit();

            });

        var _upMultiple = _formUpload.find('input[type="file"]')
            .on('change', function (e) {

                _files = this.files[0];

            });

    });

});
