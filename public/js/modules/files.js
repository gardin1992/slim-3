define(function() {

	return {

		getAll: function (callback) {

			$.ajax({

				url: '/api/files',
				type: 'GET',
				success: function (result, status, xhr) {

					if (result.success)
						callback(result.data);
					else 
						callback(result);
				},
				error: function (xhr, status, error) {

					console.log('xhr', xhr);
					console.log('error', error);

				}

			});


		},

		getById: function (id) {

			$.ajax({

				url: '/api/files/' + id,
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