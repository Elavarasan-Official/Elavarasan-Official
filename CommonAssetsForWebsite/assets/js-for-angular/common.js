$(document).ready(function () {
	'use strict';
    var $window = $(window);
	$('.form-control').on('focus blur', function (e) {
		$(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
	}).trigger('blur');
	// $('[data-countdown]').each(function () {
            // var $this = $(this), finalDate = $(this).data('countdown');
            // $this.countdown(finalDate, function (event) {
                // //$this.html(event.strftime('%D days %H:%M:%S'));
                // $this.html("<div class='col-md-3'><div class='red border-radius'>Days <br/>" + event.strftime('%D') + "</div></div><div class='col-md-3'><div class='red border-radius'>Hours<br/>" + event.strftime('%H') + "</div></div><div class='col-md-3'><div class='red border-radius'>Mins<br/>" + event.strftime('%M') + "</div></div><div class='col-md-3'><div class='red border-radius'>Sec<br/>" + event.strftime('%S') + "</div></div>");
            // });
			// });
});