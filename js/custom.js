$(document).ready(function(){
	// Declare global constant
	const NO_RECORDS = 'No records found';
	
	$('#userInput-contents').hide(); // Hides by default
	
	// Hides the search icon and shows the input field when the search icon is clicked
	$('#searchIcon').on('click', function(){
		$(this).hide(1000);
		$('#userInput-contents').show(1000);
	});
	
	
	$(document).delegate('.results', 'mouseenter', function(){
		$(this).addClass('hover');
	});
	
	
	$(document).delegate('.results', 'mouseleave', function(){
		$(this).removeClass('hover');
	});
	
	
	$(document).delegate('.results', 'click', function(e){
		var title = $(this).find('h4').text();
		var url = $(this).find('a').prop('href');
		
		if (title != NO_RECORDS){
			window.open(url);
		} else {
			e.preventDefault();
		}
		
	});
	
	
	// Opens a random wikipedia page in a new tab when button is clicked
	$('#btn_randomWiki').on('click', function(){
		window.open("https://en.wikipedia.org/wiki/Special:Random");
	});
	
	
	// Users MediaWiki API to return wikipedia records based on user input when the go button is clicked
	$('#btn_search').on('click', function(){
		var userInput = $('#userInput').val();
		
		$.ajax( {
			url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + userInput + '&format=json&callback=?',
			dataType: 'json',
			type: 'POST',
			success: function(data) {
				
				$('.results').remove(); // Removes all the divs with this class
				
				if (data[1].length > 0) {
					for (var i = 0; i < data[1].length; i++){
						var title = data[1][i];
						var descr = data[2][i];
						var url = 	data[3][i];
						
						AddRecord(title, descr, url);
					}
				
				} else {
					AddRecord(NO_RECORDS, '', '#');
				}
			}
		});
	});
	
	
	// Appends a div to the container which contains title, description and url to the record passed
	function AddRecord(title, descr, url){
		var record = 	'<div class="results"> ' + 
							'<h4>' + title + '</h4> ' + 
							'<p>' + descr + '</p> ' + 
							'<a href="' + url + '"></a> ' +
						'</div> '
						
		$('.container').append(record);
	};
	
});

