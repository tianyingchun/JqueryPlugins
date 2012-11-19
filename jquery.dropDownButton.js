(function ($) {
    /**
     * dropDownButton jquery plugin that can simple simulator pop menu 
     * and it always be used to website topheader pop dropdown menu Interactive experience.
     * dependency: jquery.1.4.2 +
     * create by terence tian
     * datatime:2012-11-13
     * issue: IE7 transparent bug: mouseleave/mouseover is triggering in IE7 while the cursor is still over the element
     * quick fix: we must set the background(the element that bind mouseleave/mouseout event) as "white" or having 1x1.gif as background. 
     */
    
    // default configuration options
    var defaults = { activeClass: 'tn-active', timeout: 60 };

    /**
     * DropDownMenu class. eg. $elem=ddButton Object,options={list:$ddButtonList,topNav:$topNav}
     * @param {array} $elems  [jquery object]
     * @param {array} options [jquery selector list matched elems]
     */

    var DropDownButtons = function ($elem, options) {
        var cfg = $.extend({}, defaults, options);
        this.$topNav = cfg.topNav;
        this.$ddButton = $elem;
        this.$ddList = cfg.list;
        this.activeClass = cfg.activeClass;
        this.timeout = cfg.timeout;
        return this;
    };
    DropDownButtons.prototype = {
        init: function () {
            this.timer = 0;
            this.active();
        },
        active: function () {
            var self = this;
            self.$ddButton.bind("mouseenter", function () {
                var $this = $(this);
                if (self.timer) { self.timer = clearTimeout(self.timer); }
                $this.addClass(self.activeClass);
                self.$ddList.css({ 
                    display: 'block', 
                    top:self.$topNav.height(),
                    left: $this.offset().left - self.$topNav.offset().left,
                    width: self.$ddList.width() });
            }).bind("mouseleave", function () { 
                self.timer = setTimeout(function () {
                    self.$ddButton.removeClass(self.activeClass);
                    self.$ddList.css({ display: 'none' });
                }, self.timeout)
            });

            // bind mouseenter,mouseleave event with $ddlist.
            self.$ddList.bind("mouseenter", function () { 
                if (self.timer) { self.timer = clearTimeout(self.timer); }
            }).bind("mouseleave", function () {  
                self.timer = setTimeout(function () {
                    self.$ddButton.removeClass(self.activeClass);
                    self.$ddList.css({ display: 'none' });
                }, self.timeout);
            });
        }
    };
    // extend jquery prototype, add "dropDownButton" plugin.
    $.fn.extend({
        /**
         * dropDownButton plugin that usually used to top header simple dropdown menu interface.
         * 
         * @param  {Object} options is a object like options={listSelector:['#ddbuttonList1','#ddbuttoList2'],topNav:'#topNav'}
         * @return {void}   no return value here.
         */
        dropDownButton: function (options) {
            return this.each(function (index) {
                var $thisBtn = $(this), $thisList = $(options.listSelector[index]), $topNav = $(options.topNav);
                if ($thisList.length) {
                    new DropDownButtons($thisBtn, { list: $thisList, topNav: $topNav }).init();
                }
            });
        }
    });
    // a shortcut of plugin 'dropDownButton'.
    $.dropDownButton = {
        varsion: 1.0,
        author: "terence tian",
        create: function (selector, opts) {
            return $(selector).dropDownButton(opts);
        }
    };
})(jQuery);