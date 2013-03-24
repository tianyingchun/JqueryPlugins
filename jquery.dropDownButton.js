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

    // The default configurations.
    var defaults = { activeClass: "tn-active", timeout: 60, direction: "right" };

    /**
     * DropDownMenu class. eg. $elem=ddButton Object,options={list:$ddButtonList,topNav:$topNav}
     * @param {array} $elems  [jquery object]
     * @param {array} options [jquery selector list matched elems]
     */

    var DropdownButton = function ($elem, options) {
        var cfg = $.extend({}, defaults, options);
        this.activeClass = cfg.activeClass;
        this.timeout = cfg.timeout;
        // Top Nav Selector
        this.$topNav = cfg.topNav;
        this.$ddButton = $elem;
        // Pop List Selector
        this.$ddList = cfg.list;
        // indicate the ddList container left justify of ddButton. 
        this.direction = cfg.direction;
        // give offset value used to adjust the positon of ddList when direction='left'. eg. 10 | -10
        this.offset = cfg.offset;
        // the callback function should be invoked while the dropdownbutton actived.
        this.callback = cfg.callback;

        return this;
    };
    DropdownButton.prototype = {
        init: function () {
            // init timer of current Dropdownbutton instance.
            this.timer = 0;
            // active
            this.active();
        },
        active: function () {
            var self = this;
            self.$ddButton.bind("mouseenter", function () {

                var $this = $(this), thisWidth = $this.width();

                if (self.timer) self.timer = clearTimeout(self.timer);
                // Add mouseenter active class on ddbutton.
                $this.addClass(self.activeClass);
                self.$ddList.css({ display: 'block', top: self.$topNav.height() + self.offset.y });

                // Diff with of ddButtom and ddList
                var ddListWidth = self.$ddList.width(), diffWidth = (ddListWidth > thisWidth) ? (ddListWidth - thisWidth) : 0;
                // Make sure that the with of $ddList > with of $ddbutton 
                self.$ddList.css({ width: (thisWidth > ddListWidth) ? thisWidth : ddListWidth });

                if (self.direction == "right") {
                    self.$ddList.addClass("d-right");
                    self.$ddList.css({ left: $this.offset().left - self.$topNav.offset().left + self.offset.x });
                }
                else {
                    self.$ddList.addClass("d-left");
                    self.$ddList.css({ left: $this.offset().left - self.$topNav.offset().left - diffWidth + self.offset.x });
                }
                // invoke callback function.
                if ($.isFunction(self.callback)) self.callback(self.$ddList);

            }).bind("mouseleave", function () {
                self.timer = setTimeout(function () {
                    self.$ddButton.removeClass(self.activeClass);
                    self.$ddList.css({ display: 'none' });
                }, self.timeout)
            });
            // bind mouseenter,mouseleave event with $ddlist.
            self.$ddList.bind("mouseenter", function () {
                if (self.timer) self.timer = clearTimeout(self.timer);
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
        * Export an interface method,Please Note:the DOM structure between #tnCommunity and '#tnCommunityList' can't have Nested relations
        * The error structure is "<li id='tnCommunity'><div id='tnCommunityList'></div></li>"
        * The right structure is "<li id='tnCommunity'></li><div id='tnCommunityList'></div>"
        * Because of the mouseleave event invoke issue.
        * @param  {jquery object} $elems all jq object that  you want to trigger dropdown menu list.eg. $("#tnCommunity,#tnHelp");
        * @param  {object} options An object that can hold configuration 
        *         eg.$("#quick-menu").dropDownButton({  
                        ddButtons: [
                            { topNav: '#header-top', btnSelector: "#quick-menu .currency a.arrow", listSelector: '#quick-menu .currency .sub', direction: 'right', offset: { x: 0, y: -11 } },
                            { topNav: '#header-top', btnSelector: "#quick-menu .help a.arrow", listSelector: '#quick-menu .help .sub', direction: 'right', offset: { x: 0, y: -11 } },
                            { topNav: '#header-top', btnSelector: "#quick-menu .shoppingcart a.arrow", listSelector: '#quick-menu .shoppingcart .sub', direction: 'right', offset: { x: 0, y: -11 } }
                        ],
                        config: {
                            activeClass: 'hover',
                            timeout: '60'
                        }
                   });
        * @param  {function} the callback function that should be invoked while the pop panel has just shown.

        * @return {void} 
        */
        dropDownButton: function (options, callbackFn) {

            for (var i = 0; i < options.ddButtons.length; i++) {
                // var curButton = options.ddButton[i];
                var ddButton = options.ddButtons[i];

                var $this = $(ddButton.btnSelector),
                    $thisList = $(ddButton.listSelector),
                    _direction = ddButton.direction,
                    _offset = ddButton.offset,
                    $topNav = $(ddButton.topNav);
                var newOpts = $.extend({}, options.config, { list: $thisList, topNav: $topNav, direction: _direction, offset: _offset });
                new DropdownButton($this, newOpts).init();
            }

        }
    });
    // a shortcut of plugin 'dropDownButton'.
    $.dropDownButton = {
        varsion: 1.0,
        author: "terence tian",
        create: function (selector, opts, callbackFn) {
            return $(selector).dropDownButton(opts, callbackFn);
        }
    };
})(jQuery);
