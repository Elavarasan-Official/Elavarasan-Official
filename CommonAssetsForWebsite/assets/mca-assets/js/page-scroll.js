/*--------- PAGE-SCROLL.JS ----*/
$(document).ready(function(){"use strict";function o(o,e){var t=$("body").width();if(t>=1024)i=150;else if(t<1024)var i=70;var r=$("#"+o);if(r.length){var a=r.offset().top-i;$("html,body").animate({scrollTop:a},e)}}var e=$.cookie("scroll");e&&(o(e,1e3),$.removeCookie("scroll")),$("a.hash-link").click(function(e){e.preventDefault();var t=$(this).data("id"),i=$(this).attr("href");"#"===i?o(t,1e3):($.cookie("scroll",t),window.location.href=i)})});