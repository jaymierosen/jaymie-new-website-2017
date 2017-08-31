'use strict';

$(function () {
    // particlesJS.load(@dom-id, @path-json, @callback (optional));
    // particlesJS.load('particles-js', 'assets/particles.json', function() {
    //     console.log('callback - particles.js config loaded');
    // });
    // https://codepen.io/shshaw/pen/JyMvxr
    // How many copies of the path to make (more = smoother gradient, but more clones of the path)
    var resolution = 24;
    // Using Array.from to...
    var gradientPaths = Array.from(
    // ...find all .gradient-path elements...
    $('.gradient-path'), // ...and run this function over them:
    function (path) {
        // Get the length of the path
        var length = path.getTotalLength();
        // console.log(length);
        // How big each segment of the gradient should be
        var segmentLength = length / resolution;
        // Create a group for all of the new paths to reside in
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        // console.log(g);
        path.parentNode.insertBefore(g, path.nextSibling);
        // Apply some styles for all the cloned paths on the <g> to be inherited
        g.style.strokeDasharray = segmentLength + ' ' + (length - segmentLength);
        for (var i = 0; i < resolution; i++) {
            // console.log(i);
            // Clone the path
            var c = path.cloneNode();
            // console.log(c);
            // Give it a nice color spanning the entire spectrum
            c.style.stroke = 'rgb(' + i / resolution * 360 + ', 61, 123)';
            // How much the stroke-dash should be offset (`stroke-dashoffset`)
            var offset = length * (i / resolution);
            c.style.strokeDashoffset = offset;
            // Pass along the necessary offset for the CSS animation as a CSS var
            c.style.setProperty('--total-offset', length + offset);
            // Add the cloned path to the group
            g.appendChild(c);
        }
        return path;
    });
    // declare variables
    var $scrollTop;
    var $navLink;
    var $topPos;
    var $logo;
    $logo = $('div.logo');
    $(window).scroll(function () {
        $scrollTop = $('.scrollTop');
        $topPos = $(this).scrollTop();
        // https://stackoverflow.com/questions/4188903/opposite-of-scrolltop-in-jquery
        // how to create a new jquery function
        // $.fn.scrollBottom = function() {
        //     return $(window).height() - $(this).scrollTop() - $(this).height();
        // };
        // var botPos = $(this).scrollBottom();
        // if user scrolls down - show menu
        if ($topPos > 120) {
            $scrollTop.css({
                "opacity": "1",
                "position": "fixed",
                "top": "0",
                "left": "0",
                "width": "100%",
                "background": "#ffffff",
                "border-bottom": "#363E57 1px solid",
                "z-index": "2",
                "padding": "0 0 30px 0"
            });
            $logo.css({
                "width": "80px",
                "margin": "20px auto"
            });
            // if user scrolls down - show menu
        } else {
            $scrollTop.css({
                "opacity": "1",
                "position": "static",
                "width": "100%",
                "background": "transparent",
                "z-index": "0",
                "border-bottom": "none",
                "padding": "0 0 0 0"
            });
            $logo.css({
                "width": "150px"
            });
        }
    }); // scroll END
    // https://www.sitepoint.com/javascript-media-queries/
    var mq = window.matchMedia("(max-width: 800px)");
    $navLink = $("nav.main__nav ul");
    if (mq.matches) {
        $navLink.css({
            "text-align": "center",
            "margin": "0 auto"
        });
        $logo.css({
            "margin": "0 20px"
        });
    }
});