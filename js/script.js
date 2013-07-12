var $window = $(window),
	$height = $window.height(),
	$width = $window.width(),
	currentPage = 'home';
	nbProjet = 4;
	stopClick =  stopClick2 = false;

$(function() {

	$('#wrapper_about').css({ 'margin-left': $width});
	$('#wrapper_contact').css({ 'margin-left': $width});

	// Au clic sur une page
	$('#menu ul li a, .lien-a').on('click', function() {
		// Récupère la page de destination
		$this = $(this);
		$href = $this.attr('href');
		nextPage = $href.substr(1);
		
		// Va à la page de destination si elle est différente de la page actuelle
		if(currentPage != nextPage) {
			// Change l'état current du menu
			$('#menu ul li a').removeAttr('class');
			$('#nav-'+nextPage).addClass('menu_selected');

			$('#wrapper_'+currentPage).css({ 'margin-left':0 }).animate({'margin-left': $width}, function(){
				$(this).css({ 'display': 'none' });
				$('#wrapper_'+nextPage).css({ 'display':'block' }).animate({'margin-left':0}, function(){
					currentPage = nextPage;
				});
			});
		}
	});

	$('.works').on('click', function(e) {
		e.preventDefault();
		$this = $(this);
		projet = $this.attr('id').substr(7);

		$('#wrapper_projets').show();
		$('#projet'+projet).show().animate({ 'opacity':1 });
		projetHeightId = ('#projet'+projet);
		projetHeight = $(projetHeightId).height();

		if(projetHeight < ($height - 130)) {
			$(projetHeightId).css({ 'height': $height - 130 });
			console.log(projetHeight);
		}
		currentProjet = parseInt(projet);
	});

	// Je ferme un projet
	$('#projet-close, #menu ul li a').on('click', function(){
		$('.projet').animate({'opacity': 0}, function(){
			$(this).hide();
			$('#wrapper_projets').hide();
		});
	});

	// Next
	$('#projet-next').on('click', function(){
		if(currentProjet >= 1 && currentProjet < nbProjet) {
			if(!stopClick) {
				stopClick = true;
				$('#projet'+currentProjet).animate({'opacity': 0}, function(){
					$(this).hide();
					currentProjet += 1;
					projetHeightId = $('#projet'+currentProjet);
					projetHeight = $(projetHeightId).height();

					if(projetHeight < ($height - 130)) {
						$(projetHeightId).css({ 'height': $height - 130 });
					}

					$('#projet'+currentProjet).show().animate({'opacity': 1}, function(){
						stopClick = false;
					});
				});
			}
		}
	});

	// Prev
	$('#projet-prev').on('click', function(){
		if(currentProjet > 1 && currentProjet <= nbProjet) {
			console.log(stopClick2);
			if(!stopClick2) {
				stopClick2 = true;
				$('#projet'+currentProjet).animate({'opacity': 0}, function(){
					$(this).hide();
					currentProjet -= 1;
					projetHeightId = $('#projet'+currentProjet);
					projetHeight = $(projetHeightId).height();

					if(projetHeight < ($height - 130)) {
						$(projetHeightId).css({ 'height': $height - 130 });
					}
					
					$('#projet'+currentProjet).show().animate({'opacity': 1}, function(){
						stopClick2 = false;
					});
				});
			}
		}
	});
});

// Partie Ajax du formulaire
$('#contactme').submit(function(){
	$.ajax({
		 	url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function(html) {
				$('#message').css({display:'block'});
			}
	});
	return false;
});