// initial starter file

// Need logic to use jquery on click and ajax for frontend to backend interaction


/*	Page Preloader */

// $(window).on("load", function() {
//   $('#preloader').fadeOut('slow', function() {
//     $(this).remove();
//   });
// });

function makeFavorite(symbol) {

	$.ajax("/api/favorites/addfavorite", {
		method: "POST",
		data: {
			symbol: symbol
		}
	}).done(function () {
		location.reload();
	});
}

function refreshPage() {
	window.location.reload();
}


$(document).ready(function () {
	//$("#generate").on("click", function(event) {
	//event.preventDefault();
	var coinMarketApi = "https://api.coinmarketcap.com/v1/ticker/?limit=0"
	$.ajax({
		url: coinMarketApi,
		method: "GET"
	}).done(function (response) {
		var results = response;
		console.log(results);
		for (var i = 0; i < results.length; i++) {
			var name = results[i].name;
			var symbol = results[i].symbol;
			var rank = results[i].rank;
			var price = results[i].price_usd;
			var market = results[i].market_cap_usd;
			var percent = results[i].percent_change_24h;
			$("#coin-tracker > tbody").append("<tr><td>" + name + "</td><td>" + symbol + "</td><td>" +
				rank + "</td><td>" + price + "</td><td>" + market + "</td><td>" + percent + "</td><td> <button id=" + symbol + " onClick='makeFavorite(this.id);refreshPage()'>Save</button> </td></tr>");
		}
		//});
		$('#coin-tracker').DataTable({
			"paging": true
		});
	});

	$.ajax("/api/favorites", {
		method: "GET"
	}).done(
		function (response) {
			for (var j = 0; j < response.length; j++) {
				var favsymbol = response[j].symbol;
				// alert('favsym 1:' + favsymbol)
				$.ajax({
					url: coinMarketApi,
					async: false,
					method: "GET"
				}).done(function (responses) {
					var result = responses;
					for (var i = 0; i < result.length; i++) {
						if (favsymbol === result[i].symbol) {
							// alert('favsym 2:' + favsymbol)
							$("#favorite-table > tbody").append("<tr><td>" + result[i].name + "</td><td>" + result[i].symbol + "</td><td>" +
								result[i].rank + "</td><td>" + result[i].price_usd + "</td><td>" + result[i].market_cap_usd + "</td><td>" + result[i].percent_change_24h + "</td></tr>");
						}
					}
				});
			}
		});

});
