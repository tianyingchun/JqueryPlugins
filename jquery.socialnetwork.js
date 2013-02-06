 (function($){ 

    var defaults={typeKey:'key',titleKey:'t',summayKey:'s',urlKey:'u',imageKey:'i'};

    /**
     * construct sns site url like "facebook" 'twitter'..so on
     * @param  {string} sType the key of 
     * @param  {string} the source url need to replace parameters.
     * @param  {Object}  thisObj the instance of SNS constructor
     * @return {string} the new urls with parameter holders.
     */
    var constructUrls=function(sType,sourceUrl,thisObj){
        var newUrl=sourceUrl,
            $elem=thisObj.$elem,
            cfg=thisObj.cfg;
        var _title=encodeURIComponent($elem.data(cfg.titleKey)||""),
            _url=encodeURIComponent($elem.data(cfg.urlKey)||""),
            _summary=encodeURIComponent($elem.data(cfg.summayKey)||"");
            _img=encodeURIComponent($elem.data(cfg.imageKey)||"");
        switch(sType){
            // for facebook.
            case "facebook" :
                newUrl=newUrl.replace(/%title%/,_title);
                newUrl=newUrl.replace(/%url%/,_url);
                newUrl=newUrl.replace(/%summary%/,_summary);   
                newUrl=newUrl.replace(/%image%/,_img);
            break;
            // for pinterest
            case "pinterest":
                newUrl=newUrl.replace(/%summary%/,_summary);   
                newUrl=newUrl.replace(/%image%/,_img);
                newUrl=newUrl.replace(/%url%/,_url);
            break;
            // for twitter
            case "twitter":
                newUrl=newUrl.replace(/%title%/,_title);
                newUrl=newUrl.replace(/%url%/,_url);
            break;

            // for Kaboodle
            case "kaboodle":
                newUrl=newUrl.replace(/%url%/,_url);
            break;

        }
        return newUrl;
    };

    function SNS($element,opts){
        this.cfg=$.extend({},defaults,opts);  
        this.$elem=$element;
        this.sns={
            // facebook share button 
            'facebook':'http://www.facebook.com/sharer.php?s=100&p[title]=%title%&p[url]=%url%&p[summary]=%summary%&p[images][0]=%image%',
            //http://business.pinterest.com/widget-builder/#do_pin_it_button
            'pinterest':'http://pinterest.com/pin/create/button/?url=%url%&media=%image%&description=%summary%',
            'twitter':'http://twitthis.com/twit?url=%url%&title=%title%',
            'kaboodle':'http://www.kaboodle.com/za/selectpage?p_pop=false&pa=url&u=%url%'
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
        siteUrl=constructUrls(siteType,siteUrl,this); 
        
        window.open(siteUrl) 
       
    };
    $.fn.extend({
        /**
         * configurations of sns plugins
         * @param {Object} options
         */
        SNS:function(options){
            return this.each(function(idx){
                var $this=$(this); 
                new SNS($this,options).run();
            });
        }
    });
})(jQuery);

        