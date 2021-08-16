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
	$.ajax({
		url: '/api/coin-market',
		method: "GET",
	}).done(function (response) {
		var results = response;
		console.log(results);
		if($('#sample-transactions')) {
			for (var i = 0; i < results.length; i++) {
				var name = results[i].name;
				var symbol = results[i].symbol;
				var rank = results[i].cmc_rank;
				var price = results[i].quote.USD.price;
				var market = results[i].quote.USD.market_cap;
				var percent = results[i].quote.USD.percent_change_24h;
				$("#sample-transactions #table-body").append("<tr><td>" + name + "</td><td>" + symbol + "</td><td>" +
					rank + "</td><td>" + price + "</td><td>" + market + "</td><td>" + percent + "</td><td> <button class='btn btn-outline-primary' id=" + symbol + " onClick='makeFavorite(this.id);refreshPage();'>Save</button> </td></tr>");
			}
			$('#sample-transactions').DataTable({
				"paging": true
			});
		}
	});


	/* $.ajax("/api/favorites", {
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
		}); */

});
