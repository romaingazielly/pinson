// 12 images au format .jpg

var g_Visualizer = { 'currentImg': 'image-1', 'allowClick': true };

$(function() {
	$('#'+g_Visualizer.currentImg).css({ 'z-index': 2 });

	$('.visualizer .mini-pics a').click(function(e){
		e.preventDefault();

		if(g_Visualizer.allowClick) {
			g_Visualizer.allowClick = false;
			$this = $(this);

			var minId = $this.attr('id');
			var bigId = $this.attr('id').substr(5);

			if(bigId != g_Visualizer.currentImg) {

				// Ajoute la classe current
				$('.visualizer .mini-pics a').removeClass('current');
				$this.addClass('current');

				$('.visualizer .img-container img#'+bigId).css({ 'z-index': 1, 'display' : 'block' });
				$('#'+g_Visualizer.currentImg).css({ 'z-index': 2 }).fadeOut('slow', function(){
					$('#'+g_Visualizer.currentImg).css({ 'z-index': 1 });
					g_Visualizer.allowClick = true;
				});
			}
			else g_Visualizer.allowClick = true;
			g_Visualizer.currentImg = bigId;
		}
	});

	// Navigation
	$('.visualizer-larrow').click(function(e){
		e.preventDefault();

		if($('.mini-pics div a').length > 9) $('.mini-pics div').animate({ 'margin-left':'-560px'}, 800);
		else $('.mini-pics div').animate({ 'margin-left':'-280px'}, 400);
	});

	$('.visualizer-rarrow').click(function(e){
		e.preventDefault();
		
		if($('.mini-pics div a').length > 9) $('.mini-pics div').animate({ 'margin-left':'0px'}, 800);
		else $('.mini-pics div').animate({ 'margin-left':'0px'}, 400);
	});

	// Zoom
	$('.visualizer .img-container img').click(function(){
		// Récupère l'image
		var imgId = $(this).attr('id');
		$('.popin-visualizer > div > img').attr('src', 'img/visualizer/'+imgId+'.jpg');
		$('.popin-visualizer').css({ 'display': 'block', 'opacity': 0 });
		// Adapte la popin
		centrePopin();

		// Fait apparaitre la popin
		$('.popin-visualizer').animate({ 'opacity': 1 }, 'slow');
	});

	// Fait disparaitre la popin
	$('.popin-visualizer > div > a, .popin-visualizer').click(function(){
		$('.popin-visualizer').animate({ 'opacity': 0}, 'slow', function(){
			$('.popin-visualizer').css({ 'display': 'none' });
		});
	});

	// Adapte la popin à la taille de l'écran
	$(window).resize(function() {
		centrePopin();
	});
});

function centrePopin() {
	var $window = $(window),
		wHeight = $window.height();
	var wWidth = $('body').width();
	var $this = $('.visualizer .img-container img'),
		hImg = $this.height(),
		wImg = $this.width();
	var marginHeightValue  = ((wHeight-hImg)/2);
	var marginWidthValue = ((wWidth-wImg)/2);

	var imgPopin = $('.popin-visualizer > div > img'),
		imgPopinWidth = imgPopin.width();
		imgPopinHeight = imgPopin.height();

	if(marginWidthValue < 0) marginWidthValue = 0;
	if(marginHeightValue < 0) marginHeightValue = 0;

	var marginValue = marginHeightValue+'px '+marginWidthValue+'px';

	$('.popin-visualizer > div').css({ 'margin': marginValue, 'width': imgPopinWidth, 'height': imgPopinHeight });
}