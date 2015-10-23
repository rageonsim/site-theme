var pInfScrLoading = false;
var pInfScrDelay = 250;
function pInfScrExecute() {
	pInfScrNode = $('.more').last();	
	pInfScrURL = $('.more a').last().attr("href");
	if(pInfScrNode.length > 0 && pInfScrNode.css('display') != 'none') {
		$.ajax({
			type: 'GET',
			url: pInfScrURL,
			beforeSend: function() {
			  pInfScrLoading = true;
			  pInfScrNode.clone().empty().insertAfter(pInfScrNode).append('<img src=\"http://cdn.shopify.com/s/files/1/0068/2162/assets/loading.gif?105791\" />');
			  pInfScrNode.hide();
			},
			success: function(data) {
				// remove loading feedback
				pInfScrNode.next().remove();
				pInfScrNode.remove();
				var filteredData = $(data).find(".collection-matrix");
				filteredData.insertBefore( $("#product-list-foot") );					
				pInfScrLoading = false;
				//$('li.singleproduct').setAllToMaxHeight();
				attachClickEvent();
			},
			dataType: "html"
		});

	}
}

function attachClickEvent(){
	$('li.more a').click(function(event){
		pInfScrExecute();
		event.stopPropagation();
		return false;
	});
  $('li.top a').click(function(event){
    	event.preventDefault();
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	});
  
}