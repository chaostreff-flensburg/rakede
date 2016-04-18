import { Template } from 'meteor/templating';

(function($){
  $(function(){

    // Initialize collapse button
    // http://stackoverflow.com/questions/32439042/materialize-css-side-nav-not-working
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
