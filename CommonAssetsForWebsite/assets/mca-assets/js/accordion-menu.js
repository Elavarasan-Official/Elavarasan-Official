/*--------- ACCORDION-MENU.JS ----*/
$(document).ready(function(){$("#cssmenu > ul > li:has(ul)").addClass("has-sub"),$("#cssmenu > ul > li > a").click(function(){var s=$(this).next();return $("#cssmenu li").removeClass("active"),$(this).closest("li").addClass("active"),s.is("ul")&&s.is(":visible")&&($(this).closest("li").removeClass("active"),s.slideUp("normal")),s.is("ul")&&!s.is(":visible")&&($("#cssmenu ul ul:visible").slideUp("normal"),s.slideDown("normal")),!s.is("ul")})});