/**
 * The simple jquery tabs plugin, file dependency jquery.1.4.2+
 * Authored by terence tian 
 * Created date:2013-01-26
 * 
 */
(function ($) {
    var cfg = {
        tabbar: '.tab-h-item',
        tabcontent: '.tab-c-item',
        activeClass: 'active',
        hoverClass: 'hover'
    };
    $.fn.tabs = function (options) {
        cfg = $.extend(cfg, options);
        var $this = $(this);
        var $tabBar = $this.find(cfg.tabbar);
        var $tabContents = $this.find(cfg.tabcontent);

        // A private function used to change tab content by tabindex.
        var changeTabContent = function (tabIndex) {
            var $currTabContent = $tabContents.eq(tabIndex);
            if ($currTabContent && $currTabContent.length) {
                $currTabContent.addClass(cfg.activeClass).fadeIn().siblings().removeClass(cfg.activeClass).fadeOut();
            }
        };
        // A private function used to bind tab bar items events(click,mouseover)
        var bindTabBarEvent = function ($tabbarItems) {
            $tabbarItems.bind("click mouseover mouseout", function (evt) {
                var $this = $(this);
                switch (evt.type) {
                    case "click":
                        var tabIndex = $tabbarItems.index($this);
                        $this.addClass(cfg.activeClass).siblings().removeClass(cfg.activeClass);
                        changeTabContent(tabIndex);
                        break;
                    case "mouseover":
                        $this.addClass(cfg.hoverClass);
                        break;
                    case "mouseout":
                        $this.removeClass(cfg.hoverClass);
                        break;
                    default:
                }
            });
        };
        return this.each(function () {
            // bind tab bar event.
            bindTabBarEvent($tabBar.children());
        });

    };
})(jQuery);
