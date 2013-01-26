/**
 * The simple jquery tabs plugin, file dependency jquery.1.4.2+
 * Authored by terence tian 
 * Created date:2013-01-26
 * Useage:
 *  Html:
 *<div id="tab-wrapper">
    <div class="tab-header">
        <ul>
                <li class="tab-h-item first selected active" data-id="tabkey-0">商品详情</li>
                <li class="tab-h-item" data-id="tab-review">评价详情(加载中...)</li>
                <li class="tab-h-item" data-id="tabkey-2">保修条例</li>
                <li class="tab-h-item" data-id="tabkey-3">产品FAQ</li>
        </ul>
    </div>
    <div class="tab-content">
            <div class="tab-c-item selected active" id="tabkey-0" style="display: block;"><div>商品详情</div></div>
            <div class="tab-c-item" id="tab-review" style="display: none;">评论加载中...</div>
            <div class="tab-c-item" id="tabkey-2" style="display: none;"><div>保修条例</div></div>
            <div class="tab-c-item" id="tabkey-3" style="display: none;"><div>产品FAQ</div></div>
    </div>
</div>
 JS:
 *  $("#tab-wrapper").tabs({
            tabbar: 'li.tab-h-item',
            tabcontent: 'div.tab-c-item',
            activeClass: 'active',
            hoverClass: 'hover',
            onTabChanged: function ($tabHItem, opts) {
                console.log($tabHItem, opts);
            }
        });

 */
(function ($) {
    var cfg = {
        tabbar: '.tab-h-item',
        tabcontent: '.tab-c-item',
        activeClass: 'active',
        hoverClass: 'hover',
        onTabChangedBefore: function ($curTab, options) { },
        onTabChanged: function ($curTab, options) { }
    };
    $.fn.tabs = function (options) {
        cfg = $.extend(cfg, options);
        var $this = $(this);
        var $tabBars = $this.find(cfg.tabbar);
        var $tabContents = $this.find(cfg.tabcontent);

        // A private function used to change tab content by tabindex.
        var changeTabContent = function ($curTabHeaderItem, tabIndex) {
            var $currTabContent = $tabContents.eq(tabIndex);
            if ($currTabContent && $currTabContent.length) {
                $currTabContent.addClass(cfg.activeClass).show().siblings().removeClass(cfg.activeClass).hide();
                cfg.onTabChanged($curTabHeaderItem, tabIndex);
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
                        cfg.onTabChangedBefore($this, { curIndex: tabIndex });
                        changeTabContent($this, tabIndex);
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
            bindTabBarEvent($tabBars);
        });

    };
})(jQuery);
