define(function() {

	function _sendFiles(attr){

		var files 	= attr.files,
			form  	= attr.form,
			url		= attr.url, 
			callback	= attr.callback;

	    // Create a formdata object and add the files
	    var data = new FormData();
		$.each(files, function(i, file) {

		    data.append('file[]', file);

		});

	    $.ajax({
	        url: url,
	        type: 'POST',
	        data: data,
	        cache: false,
	        processData: false, // Don't process the files
	        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	        success: function(data, textStatus, jqXHR)
	        {
	            if(typeof data.error === 'undefined')
	            {
	                // Success so call function to process the form
	                //submitForm(event, data);
	                console.log('success');
	            }
	            else
	            {
	                // Handle errors here
	                console.log('ERRORS: ' + data.error);
	            }
	        },
	        error: function(jqXHR, textStatus, errorThrown)
	        {
	            // Handle errors here
	            console.log('ERRORS: ' + textStatus);
	            // STOP LOADING SPINNER
	        }
	    });
	}

	return {

		sendFiles: _sendFiles

	};

});