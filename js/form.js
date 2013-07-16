var errorList = [];
var g_currentStep = 1;

$(function() {

	$('.nextStep').click(function(e){
		e.preventDefault();
		var currentStep = parseInt($(this).attr('id').substr(11));
		var nextStep = currentStep + 1;

		// Vérification des champs
		$('#form-rachat-'+currentStep+' input').each(function(){
			if($(this).attr('required')){
				if($(this).attr('pattern') && !(new RegExp($(this).attr('pattern'))).test($(this).val())){
	                errorList.push($(this).attr('rel'));
	            }
	            else if($(this).val() === ''){
	                errorList.push($(this).attr('rel'));
	            }
			}
		});

    	if(errorList == '') {
    		$('#ajax-container').fadeOut('slow', function(){
				
				// Actualise le breadcrumb et change le titre du formulaire
				if(nextStep == 2) {
					$('.breadcrumb-form').css({ 'background-position': '0 -42px' });
					$('#title-form').html('à propos de votre véhicule');
				}
				else if(nextStep == 3) {
					$('#title-form').html('Nouveau véhicule');
					$('.breadcrumb-form').css({ 'background-position': '0 -84px' });
				}

				// Change le formulaire
				$('#form-rachat-'+currentStep).hide(function(){
					$('#form-rachat-'+nextStep).show(function(){
						$('#ajax-container').fadeIn('slow');
						g_currentStep++;
					});
				});
			});
			$('#form-rachat-'+currentStep+' form p.errorForm').html('');
    	}
    	else {
    		$('#form-rachat-'+currentStep+' form p.errorForm').html('Veuillez remplir les champs suivants : ' + errorList.join(', ')+'.');
    		errorList = [];
    	}
	});


	$('.breadcrumb-form a').click(function(e){
		e.preventDefault();

		if(g_currentStep > 1) {
			var page = parseInt($(this).attr('id').substr(10));
			
			if(page != 3) {
				if(page == 1 && g_currentStep != 1) {
					$('#ajax-container').fadeOut('slow', function(){
						$('.breadcrumb-form').css({ 'background-position': '0 0' });
						$('#title-form').html('à propos de vous');
						$('#form-rachat-'+g_currentStep).hide(function(){
							$('#form-rachat-'+page).show(function(){
								$('#ajax-container').fadeIn('slow');
								g_currentStep = 1;
							});
						});
					});
				}
				else if(page == 2 && g_currentStep != 2) {
					$('#ajax-container').fadeOut('slow', function(){
						$('.breadcrumb-form').css({ 'background-position': '0 -42px' });
						$('#title-form').html('à propos de votre véhicule');
						$('#form-rachat-'+g_currentStep).hide(function(){
							$('#form-rachat-'+page).show(function(){
								$('#ajax-container').fadeIn('slow');
								g_currentStep = 2;
							});
						});
					});
				}
			}
		}
	});
});