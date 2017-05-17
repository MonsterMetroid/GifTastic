var queryUrl;
var apiKey = "dc6zaTOxFJmzC";
var gifApp={
	buttonDisplay: $("#buttonArea"),
	gifDisplay: $("#gifArea"),
	topicArray : ["Dinosaur", "Sword", "Armor", "Hacking", "Work" ],
	createURL : function(topic){
		queryUrl="http://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key="+ apiKey + "&limit=10";
	},
	addTopic : function(topic){
		gifApp.topicArray.push(topic);
	},
	updateButtons : function(){
		gifApp.buttonDisplay.html(null);
		for (var i = 0; i < gifApp.topicArray.length; i++) {
			var topic = gifApp.topicArray[i];
			gifApp.buttonDisplay.append($("<button type='button' class='btn btn-primary' data=" + topic + ">" + topic + "</button>"));
		}
	}
}
gifApp.updateButtons();
$("#buttonArea").on("click", "button", function(){
	$("#gifArea").val(null);
	gifApp.createURL($(this).attr("data"));
	$.ajax({
	url: queryUrl,
	method: "GET"
}).done(function(response) {
  var results = response.data;
  console.log(response.data);
  for (var i = 0; i < results.length; i++) {
    var gifSpan = $("<span class='item'>");

    var rating = results[i].rating;

    var p = $("<p>").text("Rating: " + rating);

    var image = $("<img>");
    image.attr("src", results[i].images.fixed_width.url);
    
    gifSpan.append(p);
    gifSpan.append(image);
    
    $("#gifArea").append(gifSpan);

  }
});
});
