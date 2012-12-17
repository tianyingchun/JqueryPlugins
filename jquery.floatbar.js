(function ($) {
    /*
        Jquery float bar plugins. dependancy: jquery.1.4.2 +
        author:tercen tian
        create date:2012-11-12s
        userage: 
            $(function () {
                $("#floatbar").floatBar({ close: ".close", toTopBtn: '.goTop' });
            });
    */
    $.fn.floatBar = function (options) { 
        var cfg = {
            // the minimum value of window.scrollTop that indicates floatbar is hidden or display,
            minScrollTop:0,
            play: 1,
            display: 0,
            offsetTop: 100,
            close: 'span',
            toTopBtn:'.top'
        };
        cfg = $.extend(cfg, options);
        // A private function for deal with scroll event.
        var scrollHandler = function ($this) {
            $(window).scroll(function () {
                var _scroll = $(this).scrollTop();
                if (!cfg.display && _scroll >= cfg.minScrollTop) { cfg.display = 1; $this.css('display', 'block'); }
                if (cfg.play && cfg.display) { 
                    $this.stop().animate({ 'top': _scroll+cfg.offsetTop}, 'slow');
                }
            });
        };
        // A private function for deal with cloes float bar.
        var bindCloseEvent = function ($this) {
            var $close = $this.find(cfg.close);
            $close.bind("click", function () {
                $this.css('display', 'none');
                cfg.play = 0;
            });
        };
        // A private function for deal with the goto top button.
        var bindGotoTopEvent=function($this){
            var $top=$this.find(cfg.toTopBtn);
            $top.bind("click",function(){
                $(window.opera ? 'html' : 'html, body').animate({scrollTop: 0}, 'slow',function(){
                    //cfg.display = 0;
                    //$this.hide();
                });
            });
        };
        // A private function that initalize float bar plugin
        var init=function($this){
            if(cfg.display && cfg.display==1){
                $this.css('display', 'block').animate({ 'top': cfg.offsetTop }, 'slow');
            }
        };
        return this.each(function () {
            var $this = $(this);
            bindCloseEvent($this);
            bindGotoTopEvent($this);
            scrollHandler($this);
            // init plugin.
            init($this);
        });
    };
})(jQuery);