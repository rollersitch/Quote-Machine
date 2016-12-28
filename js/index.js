
var colors = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
};
var blogURL = "cyberscully.tumblr.com";
var apiKey_tumblr = "nBbORlZmYZ5URYkItZjQQzghE3EVZSFGICV6mrtT4PsKDMprTq";
var request_url = "https://api.tumblr.com/v2/blog/" + blogURL + "/posts/quote?api_key=" + apiKey_tumblr;

var twitter_url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';

function pickColor() {
	var names = Object.keys(colors);
	return names[(Math.floor(Math.random() * names.length))];
}

function pickQuote(quotes) {
	return quotes[Math.floor(Math.random() * quotes.length)];
}

var tumblr_settings = {
	url: request_url,
   data: {
      format: 'json'
   },
   error: function() {
      console.log("Error");
   },
   dataType: 'jsonp',
   success: function(data) {
      
      var myData = data.response.posts.map(function(item) { return { text: item.text, author: item.source_title}; });
     
      var selected = pickQuote(myData);

      $("#quote-text").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#quote-text').html(selected.text);
        });




      
	  $("#quote-author").text(selected.author);
	  var selectedColor = pickColor();
	  	 
	 
	  $("body").animate({ backgroundColor: selectedColor }, "slow");

	  $("#twitter-button").attr('href',tweetLink(selected.text,selected.author)).attr('target', '_blank');

   },
   type: 'GET'
};



function fetchQuote() {
	
	$.ajax(tumblr_settings);


}


function tweetLink(quote_text, quote_author) {
	//'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='
	return twitter_url + encodeURIComponent('"' + quote_text) + encodeURIComponent('" --- by ' + quote_author);
}



$(document).ready(function() {
	$("#new-quote-button").on("click",function(event) {
		event.preventDefault();
		fetchQuote();
		
	});

	var $quote_text = $("#quote-text").text();
	var $quote_author = $("#quote-author").text();
	$("#twitter-button").attr('href',tweetLink($quote_text,$quote_author))
						.attr('target','_blank');
	/*						
	$("#twitter-button").on("click",(function(event) {
		 Act on the event 
		event.preventDefault();
		$quote_text = $("#quote-text").text();
		$quote_author = $("#quote-author").text();
		tweetLink($quote_text, $quote_author);

	}));
	*/
});