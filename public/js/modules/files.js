define(function() {

	var _url = '/upload';

	return {

		remove: function (id) {

			$.ajax({
				url: _url + '/' + id,
				type: 'DELETE',
				success: function (result, status, xhr) {},
				error: function (xhr, status, error) {}
			});

		},

		getAll: function (callback) {

			$.ajax({

				url: _url,
				type: 'GET',
				success: function (result, status, xhr) {

					console.log(result);

					if (result.success)
						callback(result.data);
				},
				error: function (xhr, status, error) {

					console.log('xhr', xhr);
					console.log('error', error);

				}

			});

		},

		getById: function (id) {

			$.ajax({

				url: _url + '/' + id,
				type: 'GET',
				success: function (result, status, xhr) {

					console.log('result');

					if (result.success)
						callback(result.data);

				},
				error: function (xhr, status, error) {

					console.log('xhr', xhr);
					console.log('error', error);

				}

			});

		},

	};

});