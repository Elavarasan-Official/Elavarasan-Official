/*--------- LG-VIDEO.JS ----*/
!function(e,o){"function"==typeof define&&define.amd?define(["jquery"],function(e){return o(e)}):"object"==typeof exports?module.exports=o(require("jquery")):o(jQuery)}(0,function(f){!function(){"use strict";var o={videoMaxWidth:"855px",youtubePlayerParams:!1,vimeoPlayerParams:!1,dailymotionPlayerParams:!1,vkPlayerParams:!1,videojs:!1,videojsOptions:{}},e=function(e){return this.core=f(e).data("lightGallery"),this.$el=f(e),this.core.s=f.extend({},o,this.core.s),this.videoLoaded=!1,this.init(),this};e.prototype.init=function(){var m=this;m.core.$el.on("hasVideo.lg.tm",function(e,o,i,a){if(m.core.$slide.eq(o).find(".lg-video").append(m.loadVideo(i,"lg-object",!0,o,a)),a)if(m.core.s.videojs)try{videojs(m.core.$slide.eq(o).find(".lg-html5").get(0),m.core.s.videojsOptions,function(){m.videoLoaded||this.play()})}catch(e){console.error("Make sure you have included videojs")}else m.videoLoaded||m.core.$slide.eq(o).find(".lg-html5").get(0).play()}),m.core.$el.on("onAferAppendSlide.lg.tm",function(e,o){var i=m.core.$slide.eq(o).find(".lg-video-cont");i.hasClass("lg-has-iframe")||(i.css("max-width",m.core.s.videoMaxWidth),m.videoLoaded=!0)});var o=function(i){if(i.find(".lg-object").hasClass("lg-has-poster")&&i.find(".lg-object").is(":visible"))if(i.hasClass("lg-has-video")){var e=i.find(".lg-youtube").get(0),o=i.find(".lg-vimeo").get(0),a=i.find(".lg-dailymotion").get(0),l=i.find(".lg-html5").get(0);if(e)e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");else if(o)try{$f(o).api("play")}catch(e){console.error("Make sure you have included froogaloop2 js")}else if(a)a.contentWindow.postMessage("play","*");else if(l)if(m.core.s.videojs)try{videojs(l).play()}catch(e){console.error("Make sure you have included videojs")}else l.play();i.addClass("lg-video-playing")}else{i.addClass("lg-video-playing lg-has-video");var r=function(e,o){if(i.find(".lg-video").append(m.loadVideo(e,"",!1,m.core.index,o)),o)if(m.core.s.videojs)try{videojs(m.core.$slide.eq(m.core.index).find(".lg-html5").get(0),m.core.s.videojsOptions,function(){this.play()})}catch(e){console.error("Make sure you have included videojs")}else m.core.$slide.eq(m.core.index).find(".lg-html5").get(0).play()};m.core.s.dynamic?r(m.core.s.dynamicEl[m.core.index].src,m.core.s.dynamicEl[m.core.index].html):r(m.core.$items.eq(m.core.index).attr("href")||m.core.$items.eq(m.core.index).attr("data-src"),m.core.$items.eq(m.core.index).attr("data-html"));var s=i.find(".lg-object");i.find(".lg-video").append(s),i.find(".lg-video-object").hasClass("lg-html5")||(i.removeClass("lg-complete"),i.find(".lg-video-object").on("load.lg error.lg",function(){i.addClass("lg-complete")}))}};m.core.doCss()&&1<m.core.$items.length&&(m.core.s.enableSwipe&&m.core.isTouch||m.core.s.enableDrag&&!m.core.isTouch)?m.core.$el.on("onSlideClick.lg.tm",function(){var e=m.core.$slide.eq(m.core.index);o(e)}):m.core.$slide.on("click.lg",function(){o(f(this))}),m.core.$el.on("onBeforeSlide.lg.tm",function(e,o,i){var a,l=m.core.$slide.eq(o),r=l.find(".lg-youtube").get(0),s=l.find(".lg-vimeo").get(0),t=l.find(".lg-dailymotion").get(0),d=l.find(".lg-vk").get(0),c=l.find(".lg-html5").get(0);if(r)r.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*");else if(s)try{$f(s).api("pause")}catch(e){console.error("Make sure you have included froogaloop2 js")}else if(t)t.contentWindow.postMessage("pause","*");else if(c)if(m.core.s.videojs)try{videojs(c).pause()}catch(e){console.error("Make sure you have included videojs")}else c.pause();d&&f(d).attr("src",f(d).attr("src").replace("&autoplay","&noplay")),a=m.core.s.dynamic?m.core.s.dynamicEl[i].src:m.core.$items.eq(i).attr("href")||m.core.$items.eq(i).attr("data-src");var n=m.core.isVideo(a,i)||{};(n.youtube||n.vimeo||n.dailymotion||n.vk)&&m.core.$outer.addClass("lg-hide-download")}),m.core.$el.on("onAfterSlide.lg.tm",function(e,o){m.core.$slide.eq(o).removeClass("lg-video-playing")})},e.prototype.loadVideo=function(e,o,i,a,l){var r="",s=1,t="",d=this.core.isVideo(e,a)||{};if(i&&(s=this.videoLoaded?0:1),d.youtube)t="?wmode=opaque&autoplay="+s+"&enablejsapi=1",this.core.s.youtubePlayerParams&&(t=t+"&"+f.param(this.core.s.youtubePlayerParams)),r='<iframe class="lg-video-object lg-youtube '+o+'" width="560" height="315" src="//www.youtube.com/embed/'+d.youtube[1]+t+'" frameborder="0" allowfullscreen></iframe>';else if(d.vimeo)t="?autoplay="+s+"&api=1",this.core.s.vimeoPlayerParams&&(t=t+"&"+f.param(this.core.s.vimeoPlayerParams)),r='<iframe class="lg-video-object lg-vimeo '+o+'" width="560" height="315"  src="//player.vimeo.com/video/'+d.vimeo[1]+t+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';else if(d.dailymotion)t="?wmode=opaque&autoplay="+s+"&api=postMessage",this.core.s.dailymotionPlayerParams&&(t=t+"&"+f.param(this.core.s.dailymotionPlayerParams)),r='<iframe class="lg-video-object lg-dailymotion '+o+'" width="560" height="315" src="//www.dailymotion.com/embed/video/'+d.dailymotion[1]+t+'" frameborder="0" allowfullscreen></iframe>';else if(d.html5){var c=l.substring(0,1);"."!==c&&"#"!==c||(l=f(l).html()),r=l}else d.vk&&(t="&autoplay="+s,this.core.s.vkPlayerParams&&(t=t+"&"+f.param(this.core.s.vkPlayerParams)),r='<iframe class="lg-video-object lg-vk '+o+'" width="560" height="315" src="http://vk.com/video_ext.php?'+d.vk[1]+t+'" frameborder="0" allowfullscreen></iframe>');return r},e.prototype.destroy=function(){this.videoLoaded=!1},f.fn.lightGallery.modules.video=e}()});