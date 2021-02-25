function adjustContent(){
	/*$( "#login-button" ).toggleClass("logged-out logged-in")*/;

	if( $("#login-button").hasClass("logged-in")){
		// user is logged in
		$(".welcome .welcome-card").show();
		$(".meetings-list").show();

	} else {
		// user is logged out
		$(".welcome .welcome-card").hide();
		$(".meetings-list").hide();
		
		// add customer options
		if($(".products-service").length){
			// customer options were already loaded
			$("#customer-options").show();
		} else {
			$('#products').load("https://www.binastar.de/produkte/videokonferenzen .products-service" , function() {	   
				// insert "read more"-links
				if($(".more-link").length == 0){
					$(".ult_price_features").each(function() {
						$("<div class='more-link closed'>mehr Infos</div>").insertAfter(this);
					});		   
				}  
				$(".more-link").on("click", function() { moreLinkToggle(this) });

			});
			
		}	
	}	
};
	
function moreLinkToggle(el){
	$( el ).toggleClass("opened closed");

	if( $(el).hasClass("closed")){
		$(el).text("mehr Infos");
		$(el).prev().css("animation-name", "close");

	} else {
		$(el).text("weniger Infos");
		$(el).prev().css("animation-name", "open");
	}
};
$(document).ready(function() { 
	adjustContent(); 
	$(".more-link").on("click", function() { moreLinkToggle() });
	$("#login-button").on("click", function() { adjustContent() });
});