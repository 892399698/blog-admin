export default Ember.Component.extend({
	tagNmae:"",
	didInsertElement:function(){
		// Menu Toggle
	   jQuery('.toggle-btn').click(function(){
	       $(".left-side").getNiceScroll().hide();
	       
	       if ($('body').hasClass('left-side-collapsed')) {
	           $(".left-side").getNiceScroll().hide();
	       }
	      var body = jQuery('body');
	      var bodyposition = body.css('position');

	      if(bodyposition != 'relative') {

	         if(!body.hasClass('left-side-collapsed')) {
	            body.addClass('left-side-collapsed');
	            jQuery('.custom-nav ul').attr('style','');

	            jQuery(this).addClass('menu-collapsed');

	         } else {
	            body.removeClass('left-side-collapsed chat-view');
	            jQuery('.custom-nav li.active ul').css({display: 'block'});

	            jQuery(this).removeClass('menu-collapsed');

	         }
	      } else {

	         if(body.hasClass('left-side-show'))
	            body.removeClass('left-side-show');
	         else
	            body.addClass('left-side-show');

	         mainContentHeightAdjust();
	      }

	   });
	   

	   searchform_reposition();

	   jQuery(window).resize(function(){

	      if(jQuery('body').css('position') == 'relative') {

	         jQuery('body').removeClass('left-side-collapsed');

	      } else {

	         jQuery('body').css({left: '', marginRight: ''});
	      }

	      searchform_reposition();

	   });

	   function searchform_reposition() {
	      if(jQuery('.searchform').css('position') == 'relative') {
	         jQuery('.searchform').insertBefore('.left-side-inner .logged-user');
	      } else {
	         jQuery('.searchform').insertBefore('.menu-right');
	      }
	   }

	}
})