/**
 * Note for IE8 users: if you include MidiBridge.js in your html, the method addEventListener will be added to the window object.
 * In fact this method is just a wrapper around the attachEvent method.
 */

//a very basic example that shows how to embed an use the midibridge
$(function() {
	var $contentDiv = $('#content');

	var $waitingElement = null;
	var mappings = {};
	
	$contentDiv[0].innerHTML = "Loading midi bridge";
	midiBridge.init({
		ready: function(){
			$contentDiv[0].innerHTML = "midi bridge loaded";
		},data: function(midiEvent){
			console.log('received midi event');
			$contentDiv[0].innerHTML = midiEvent;
			var channel = midiEvent.data1,
				value = parseInt(midiEvent.data2),
				width = (500 * value / 127).toString();
			if (null !== $waitingElement) {
				if ($waitingElement.data('channel')) {
					mappings[$waitingElement.data('channel')] = null;
				}
				mappings[channel] = { element: $waitingElement };
				$waitingElement.data('channel', channel);
				$waitingElement = null;
			}
			if (mappings[channel]) {
				mappings[channel].element.width(width).text(value);
			}
		}
	});
	
	$(document).on('click', '.bar', function(e) {
		$waitingElement = $(e.target);
		$waitingElement.text('Waiting for controller signal');
	});
});
    

    