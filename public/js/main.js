define([], function () {

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
