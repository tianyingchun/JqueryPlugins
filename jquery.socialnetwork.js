 (function($){ 

    var defaults={typeKey:'key',titleKey:'t',imagesKey:'images'};

    function SNS($element,opts){
        this.cfg=$.extend({},defaults,opts);  
        this.$elem=$element;
        this.sns={
            // facebook share button 
            'facebook':'http://www.facebook.com/sharer.php?s=100&p[title]=%title%&p[url]=%currentUrl%&p[summary]=%pageSummary%&p[images][0]=%images%'
        }; 
    }
    /**
     * Open SNS site on jBOX
     * @return {void} pop window to show share summary.
     */
    SNS.prototype.run=function(){
        var self=this;
        this.$elem.bind("click",function(evt){
            evt.preventDefault();
            self.showWindow();
        });
    };
    SNS.prototype.showWindow=function(){  
        var siteType=this.$elem.data(this.cfg.typeKey);
        var siteUrl=this.sns[siteType];
        // replace responding parameters.
        

    };
    $.fn.extend({
        /**
         * configurations of sns plugins
         * @param {Object} options
         */
        SNS:function(options){
            return this.each(function(idx){
                var $this=$(this);
                new SNS($this,options)().run();
            });
        });
    });
})(jQuery);

        