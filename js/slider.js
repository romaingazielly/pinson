var g_Slider = {"currentImg":1,"allowClick":true};
var allowClick = true;

$(function() {

	// Au clic sur les mini
	$('.pinson-slider nav li').click(function(){

		if(g_Slider.allowClick) {
			$this = $(this);
			g_Slider.allowClick = false;

			// Change le current des mini
			$('.pinson-slider nav li').removeClass();
			$this.addClass('current');

			var idImgSlider = $this.attr('id').substr(5); // slider-x
			var numImgSlider = parseInt($this.attr('id').substr(12)); // x
			var idInfosSlider = 'car-'+$this.attr('id').substr(5); // car-slider-x

			if($('img#'+idImgSlider).hasClass('current')) {
				g_Slider.allowClick = true;
			}
			else {
				// Slide
				if(numImgSlider > g_Slider.currentImg) {
					$('#'+idImgSlider).css({ 'left': '650px' }).animate({ 'left': '0px' });
					$('.car-photo div img.current').animate({ 'left': '-650px' }, function(){
						$('.car-photo div img').removeClass('current');
						$('#'+idImgSlider).addClass('current');
					});
				}
				else{
					$('#'+idImgSlider).css({ 'left': '-650px' }).animate({ 'left': '0px' });
					$('.car-photo div img.current').animate({ 'left': '650px' }, function(){
						$('.car-photo div img').removeClass('current');
						$('#'+idImgSlider).addClass('current');
					});
				}
				g_Slider.currentImg = numImgSlider;

				// Change les infos en Fade
				$('.car-infos-details').fadeOut('slow');
				setTimeout(function() { $('#'+idInfosSlider).fadeIn('slow'); g_Slider.allowClick = true; }, 400);
				$('.car-more a').attr('href', '#'+idInfosSlider);
			}
		}
	});
});