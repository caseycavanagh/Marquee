!function(t){t.fn.fitText=function(n,e){var i=n||1,o=t.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},e);return this.each(function(){var n=t(this),e=function(){n.css("font-size",Math.max(Math.min(n.width()/(10*i),parseFloat(o.maxFontSize)),parseFloat(o.minFontSize)))};e(),t(window).on("resize.fittext orientationchange.fittext",e)})}}(jQuery),jQuery(document).ready(function(){jQuery("h1").fitText()});