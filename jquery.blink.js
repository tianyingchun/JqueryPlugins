(function ($) {
    var blinkTimers = new Object();

    $.fn.blink = function (options) {
        var defaults = { delay: 500, cssClass: 'ui-state-hover' };
        var options = $.extend(defaults, options);  
        return this.each(function () {
            var obj = $(this);
            if (blinkTimers[obj] == undefined) {
                blinkTimers[obj] = setTimeout(function () {
                    obj.toggleClass(options.cssClass); 
                    blinkTimers[obj] = setTimeout(arguments.callee, options.delay); 
                }, options.delay);
            }
        });
    };
    $.fn.stopBlink = function (options) {
        return this.each(function () {
            var obj = $(this);
            clearTimeout(blinkTimers[obj]);
            delete blinkTimers[obj];
        });
    };
})(jQuery);