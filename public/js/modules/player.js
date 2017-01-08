define(function () {

	var _target,
		_player;

	var _contentControls;

	function _createContentControls() {

		_contentControls = $('<div>')
			.addClass('content-controls')
			.appendTo(_target);

		$('<button>')
			.addClass('btn btn-link')
			.html('<i class="fa fa-play"></i>')
			.on('click', function () {

				var that = this;

				if (_player.paused) {

					_player.play();
					$(that).html('<i class="fa fa-pause"></i>');

				}
				else {

					_player.pause();
					$(that).html('<i class="fa fa-play"></i>');

				}

			})
			.appendTo(_contentControls);
				
	}

	function _prepareConfig(config) {

		if (config.controls)
			_createContentControls();

	}

	return function (attr) {

		_target = attr.target;
		_player = _target.find(attr.type).get(0);
		$(_player).attr('controls', 'controls');
		
		_source = $('<source>');

        _source.appendTo(_player);

        if (attr.config)
        	_prepareConfig(attr.config);


		return {

			getTarget: function () {

				return _target;

			},
			getPlayer: function () {

				return _player

			},
			setFile: function(attr) {

				_source.attr('src', attr.blobUrl);
            	_player.load();

			}

		};

	}

});