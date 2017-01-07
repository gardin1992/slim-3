    // Ou podemos declarar o nome explicitamente...
    // define('myModule', function () {
    define(function () {
        return {
            sum: function (a, b) {
                return (+a) + (+b);
            }
        }
    });