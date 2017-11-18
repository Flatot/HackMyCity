function main() {

(function () {
   'use strict'
    //Script
    //-----------------------------------
    jQuery(document).ready(function($){
        var index_slider;
        var size_slider = $("#rst-owl-blog img").size() - 1;
        
        // Custom map Google
        if ( $('#cd-google-map').length != 0 )
        {
            // set google maps parameters
            var latitude = 45.9017616,
                longitude = 4.841923599999973,
                map_zoom = 15;  
            var marker_url = 'images/icon/location.png' ;

            //we define here the style of the map
            var style= [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}];
                
            //set google map options
            var map_options = {
                center: new google.maps.LatLng(latitude, longitude - 0.01),
                zoom: map_zoom,
                panControl: true,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style,
            }
            //inizialize the map
            var map = new google.maps.Map(document.getElementById('google-container'), map_options);
            //add a custom marker to the map                
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: map,
                visible: true,
                icon: marker_url,
            });
        }
        
        
        //Check validate send mail
        if( $("#contactForm").length ) {
            $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
                preventSubmit: true,
                submitError: function($form, event, errors) {
                    // additional error messages or events
                },
                submitSuccess: function($form, event) {
                    event.preventDefault(); // prevent default submit behaviour
                    // get values from FORM
                    var name = $("input#name").val();
                    var subname = $("input#subname").val();
                    var subject = $("input#subject").val();
                    var message = $("textarea#message").val();
                    var firstName = name; // For Success/Failure Message
                    // Check for white space in name for Success/Fail message
                    if (firstName.indexOf(' ') >= 0) {
                        firstName = name.split(' ').slice(0, -1).join(' ');
                    }
                    $.ajax({
                        url: "././submit.php",
                        type: "POST",
                        data: {
                            name: name,
                            subname: subname,
                            subject: subject,
                            message: message
                        },
                        cache: false,
                        success: function() {
                            // Success message
                            $('#success').html("<div class='alert alert-success'>");
                            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-success')
                                .append("<strong>Your message has been sent. </strong>");
                            $('#success > .alert-success')
                                .append('</div>');

                            //clear all fields
                            $('#contactForm').trigger("reset");
                        },
                        error: function() {
                            // Fail message
                            $('#success').html("<div class='alert alert-danger'>");
                            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                            $('#success > .alert-danger').append('</div>');
                            //clear all fields
                            $('#contactForm').trigger("reset");
                        },
                    })
                },
                filter: function() {
                    return $(this).is(":visible");
                }
            });
        }
        
    });
    
    jQuery(window).scroll(function(){
        
    });
    
    jQuery(window).load(function() {
    
    });
    
    jQuery(window).resize(function() {
        // Change placeholder
        if( $(window).width() < 768 )
        {
            $('.rst-sp-search input[type="text"]').attr('placeholder','Enter your question...');
            $('#rst-searchdomain .rst-searchdomain .rst-page-input').attr('placeholder','Enter domain name');
            $('#rst-searchdomain .rst-searchdomain input[type="submit"]').attr('value','');
        }
        else
        {
            $('#rst-searchdomain .rst-searchdomain input[type="submit"]').attr('value','SEARCH');
        }
    });
    
}());

}
main();