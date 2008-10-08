/**
 * SimpleModal Test
 * http://www.ericmmartin.com/projects/simplemodal/
 * http://code.google.com/p/simplemodal/
 *
 * Copyright (c) 2008 Eric Martin - http://ericmmartin.com
 *
 * Revision: $Id$
 *
 */
var dialog;
$(document).ready(function () {
	// default theme
	$.modal.defaults.theme = 'basic';
	
	$.modal.theme.test = {
		closeCss: {
			background: '#336699',
			borderBottom: '1px solid #003366',
			color: '#fff',
			marginBottom: '8px',
			padding: '4px 0',
			textAlign: 'right',
			width: '100%'
		},
		containerCss: {
			background: '#eee',
			border: '3px solid #003366'
		},
		dataCss: {
			padding: '10px'
		},
		overlayCss: {
			background: '#6699cc'
		}
	};
	
	$('a#test1').click(function (e) {
		e.preventDefault();
		$('#modalContentTest').modal();
	});
	$('a#test2').click(function (e) {
		e.preventDefault();
		$.modal($('#modalContentTest'));
	});
	$('a#test3').click(function (e) {
		e.preventDefault();
		$('<div><h1>New DOM Element</h1></div>').modal();
	});
	$('a#test4').click(function (e) {
		e.preventDefault();
		$.modal(document.getElementById('modalContentTest'));
	});
	$('a#test5').click(function (e) {
		e.preventDefault();
		$.modal("<div class='test'>\
					<h1>Sample Content</h1>\
					<p>This can be complex HTML containing <a href='#'>links</a>,\
					<input type='text' value='input boxes' size='8'/>, etc...</p>\
				</div>");
	});
	$('a#test6').click(function (e) {
		e.preventDefault();
		$.modal("Sample Content - just a plain 'ol string");
	});
	$('a#test7').click(function (e) {
		e.preventDefault();
		$.modal("<div class='test'>\
					<h1>Sample Content</h1>\
					<p>This example uses a custom close.</p>\
					<p><a href='#' class='simplemodal-close'>Close</a></p>\
				</div>", {close:false});
	});
	$('a#test8').click(function (e) {
		e.preventDefault();
		$('#modalContentPersistTest').modal({persist: true});
	});
	$('a#test9').click(function (e) {
		e.preventDefault();
		$('#modalContentTest').modal({onOpen: modalOpen});
	});
	$('a#test10').click(function (e) {
		e.preventDefault();
		$('#modalContentTest').modal({onClose: modalClose});
	});
	$('a#test11').click(function (e) {
		e.preventDefault();
		$('#modalContentTest').modal({onShow: modalShow});
	});
	$('a#test12').click(function (e) {
		e.preventDefault();
		$.modal('<div class="test"><h1>IE SELECT bleed test</h1></div>');
	});
	$('a#test13').click(function (e) {
		e.preventDefault();
		$('#modalContentMultipleTest').modal();
	});
	$('a#test13a').click(function (e) {
		e.preventDefault();
		$('#modalContentTest').modal({
			overlayCss: {opacity: .5, backgroundColor: '#ff0000'}
		});
	});
   $('a#test14').click(function (e) {
   	e.preventDefault();
		$('#modalContentOverflowTest').modal({containerCss: {overflow: 'auto'}});
	});
	$('a#test15').click(function (e) {
		e.preventDefault();
		dialog = $.modal('<iframe src="iframe.html" id="iframeTest" name="iframeTest" height="450" width="830" style="border:0" />', {
			close:false,
			height:500, 
			width:860
		});
	});
   $('a#test16').click(function (e) {
   	e.preventDefault();
		$('#modalContentTest').modal({theme: 'test'});
	});
});

/**
 * When the open event is called, this function will be used to 'open'
 * the overlay, container and content portions of the modal dialog.
 *
 * onOpen callbacks need to handle 'opening' the overlay, container
 * and content.
 */
function modalOpen (dialog) {
	dialog.overlay.fadeIn('slow', function () {
		dialog.container.fadeIn('slow', function () {
			dialog.data.slideDown('slow');
		});
	});
}

/**
 * When the close event is called, this function will be used to 'close'
 * the overlay, container and content portions of the modal dialog.
 *
 * The SimpleModal close function will still perform some actions that
 * don't need to be handled here.
 *
 * onClose callbacks need to handle 'closing' the overlay, container
 * content and iframe.
 */
function modalClose (dialog) {
	dialog.data.fadeOut('slow', function () {
		dialog.container.hide('slow', function () {
			dialog.overlay.slideUp('slow', function () {
				dialog.close();
			});
		});
	});
}

/**
 * After the dialog is show, this callback will bind some effects
 * to the content when the 'button' button is clicked.
 *
 * This callback is completely user based; SimpleModal does not have
 * a matching function.
 */
function modalShow (dialog) {
	dialog.data.find('input.animate').one('click', function () {
		dialog.data.slideUp('slow', function () {
			dialog.data.slideDown('slow');
		});
	});
}