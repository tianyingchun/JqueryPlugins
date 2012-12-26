/// <reference path="jquery-1.6.4.min.js" />
/**---------------------------------------------
author:terence tian
update date:20111021
introduction:for jerseys site slideshow and tabs.
usage:

//1. tab slide show 1.
$("#key-visual").advancedTabs({ isAutoRotate: true, containerSelector: "#kv-container div.kv-item", tabSelector: "#kv-tab > a" });
            
//2. slide down tab slide show 1.
$("#service-channel").advancedTabs({ amimate: "show", tabBehavior: "mouseenter", isAutoRotate: false, tabSelector: "#service-channel-tabgroup div.channel-tab", containerSelector: "#service-channel-container  li.channel-container-item", containerRejectItemSelector: "a.close", onPreInit: function ($pTabContainer, $tabItems)
{
var $close = $('<a href="javascript:void(0);" class="close" id="service-channel-close">CLOSE</a>');
$close.bind("click", function ()
{
$tabItems.filter(".current").removeClass("current");
$pTabContainer.slideUp('slow');
});
$pTabContainer.prepend($close);
}
});

---------------------------------------------**/
(function ($)
{
    function Tab(element, options)
    {
        var options = $.extend(true, {
            isAutoRotate: true,
            onPreInit: '', // 与初始化事件
            rotateDelay: 2000,
            effect: "fade",
            containerSelector: "#kv-container div.kv-item",
            tabSelector: "kv-tab > a",
            activeIndex: 0,
            containerRejectItemSelector: "a.close", // 包含在containerSelector的Items 元素，忽略掉对此元素的操作
            tabBehavior: "click", // tab item 默认事件，Click 还是鼠标移动上去 mouseenter
            amimate: "fadeIn" //默认tabcontainer 显示出来的效果
        }, options);
        var $Element = element // jquery Tab binding node.
         , $this = this // current Tab instance
         , $tabItems // tab items (jquery)
         , $tabContainers //tab container (jquery)
         , $ptabContainer // tab parent of containers
         , lenTabs // tab items counts
         , timeoutid
         , _isAutoRotate = options.isAutoRotate
         , _activeIndex //current active index
         , _oActiveContainer //当前激活containerItem 对象
         , _defaultBehavior = $.unique($.merge(['click', 'mouseenter', 'mouseleave'], [options.tabBehavior]));
        var showContainer = function ()
        {
            _oActiveContainer = $tabContainers.eq(_activeIndex);
            $tabItems.eq(_activeIndex).addClass("current").siblings().removeClass("current");
            if ($ptabContainer.is(":visible"))
            {
                if (options.amimate == "show")// 如果传入amnimate 为show则表示不带特效直接显示出来。
                {
                    _oActiveContainer.stop(true, true)[options.amimate]().siblings(":not(" + options.containerRejectItemSelector + ")").hide();
                }
                else
                {
                    _oActiveContainer.stop(true, true)[options.amimate]("slow").siblings(":not(" + options.containerRejectItemSelector + ")").hide();
                }
            }
            else
            {
                $ptabContainer.show(); //make sure the tabcontainer main is visible.
                _oActiveContainer.stop(true, true).slideDown("slow").siblings(":not(" + options.containerRejectItemSelector + ")").hide();
            }
        }
        var bindEvents = function ()
        {
            $tabItems.bind(_defaultBehavior.join(" "), function (evt)
            {
                if (timeoutid) clearTimeout(timeoutid);
                _isAutoRotate = false;
                if (evt.type == "click") //始终会有CLICK 点击tab item事件
                {
                    _activeIndex = $tabItems.index($(this));
                    showContainer();
                }
                // 必须是已经显示出了tabcontainer 内容，然后才可能具有mouseenter 的事件。
                else if ($ptabContainer.is(":visible") && options.tabBehavior == "mouseenter" && evt.type == "mouseenter")
                {
                    _activeIndex = $tabItems.index($(this));

                    clearTabItemsHoverId($tabItems); // mouse move so fast bug.
                    $tabItems.data("tabHoverTimeId", setTimeout(function ()
                    {
                        showContainer();
                        clearTabItemsHoverId($tabItems); // mouse move so fast bug.
                    }, 500));
                }
                else if (evt.type == "mouseleave")
                {
                    clearTabItemsHoverId($tabItems);
                    _isAutoRotate = true;
                    start();
                }
            });
            var clearTabItemsHoverId = function ($tabItems)
            {
                var _tabHoverTimeId = $tabItems.data("tabHoverTimeId");
                if (_tabHoverTimeId)
                {
                    clearTimeout(_tabHoverTimeId);
                    $tabItems.data("tabHoverTimeId", 0);
                }
            }
            $tabContainers.bind("mouseover mouseout", function (evt)
            {
                if (evt.type == "mouseover")
                {
                    _isAutoRotate = false;
                    clearTimeout(timeoutid);
                }
                else if (evt.type == "mouseout")
                {
                    _isAutoRotate = true;
                    start();
                }
            });
        };
        var setActiveIndex = function (activeIndex)
        {

            if (activeIndex >= lenTabs)
            {
                _activeIndex = activeIndex - lenTabs;
            }
        };
        var start = function () //启动auto rotation
        {
            if (_isAutoRotate && options.isAutoRotate)
            {
                timeoutid = setTimeout(function ()
                {
                    setActiveIndex(++_activeIndex);
                    showContainer();
                    start();
                }, options.rotateDelay);
            }
        };
        this.setAutoRotated = function (isAutoRotated)
        {
            _isAutoRotate = isAutoRotated;
        };
        var init = function ()
        {
            $tabItems = $Element.find(options.tabSelector);
            $tabContainers = $Element.find(options.containerSelector);
            $ptabContainer = $tabContainers.parent(); //当前container item 列表的父亲容器。
            _activeIndex = options.activeIndex;
            lenTabs = $tabItems.length;
            if ($.isFunction(options.onPreInit))//执行预初始化代码.
            {
                options.onPreInit($ptabContainer, $tabItems);
            };
            // binding event bahavior.
            bindEvents();
            start();
        } ();
    }
    $.fn.extend({
        advancedTabs: function (options)
        {
            return this.each(function ()
            {
                var advancedTab = new Tab($(this), options);
                //  $(this).data('tabslideshow', advancedTab);
            });
        }
    });
    $.advancedTabs = {
        varsion: 1.0,
        author: "terence tian",
        create: function (selector, opts)
        {
            //return $(selector).advancedTabs(opts).data("tabslideshow");
            return $(selector).advancedTabs(opts);
        }
    };
})(jQuery);
