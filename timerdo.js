;(function($){
  /**
	 * Depandency javscript :jquery 1.4.2+,dateFormat.js
	 * Description:  The simulate the time clock execute state, allow us custome the callback while the each time tick
	 * always used to the activity of e-commerce site.
	 * Author:terence tian.
	 * Create date:2013-01-21
	 */
	
	 // default configurations.
	 var defaults={start:new Date(),timeout:1000,elapseStep:1};

     var Timer=function($elem,options){
     	var cfg = $.extend({}, defaults, options);
     	this.$elem=$elem;
     	this.startTime=cfg.startTime;
     	this.timeout=cfg.timeout;
     	this.elapseStep=cfg.elapseStep;
     	this.callback=cfg.callback; 
     };
     Timer.prototype.run=function(){
     	var self=this;
     	setTimeout(function(){ 
     		var newDate=new Date(self.startTime);  
     		newDate.setSeconds(newDate.getSeconds() - self.elapseStep);
     		var endDate=new Date(newDate);
     		self.startTime=endDate; 
     		// output formated time
     		self.output(endDate); 
     		// recursive invoke timer.
     		setTimeout(arguments.callee,self.timeout);
     	},self.timeout);
     }; 
     Timer.prototype.output=function(newDate){
     	  
     	 //console.log(this.callback,newDate) 
     	 this.callback(this.$elem,newDate); 
     };
	$.fn.extend({
		/**
		 * The usage of timer do jquery plugin.
		 * @param  {object} options the override configurations of plugin timerDo.
		 * eg. {
		 * 		startTime:['01/21/2013 08:10:00','01/21/2013 05:10:50'],//Note:in IE the date string must match MM/DD/YYYY
		 * 		timeout:1, //second each time interval.
		 * 		elapseStep:1,// the time clock tick steps. 
		 *    },function(newDateString){},//callback fun will invoked while each tick ready.Note: callback is must as last parameters.
		 * @param  {function} callbackFn the timerdo callback function you can specific your output date string.
		 * @return {void}  
		 */
		timerDo:function(options,callbackFn){
			return this.each(function(index){
				var $this=$(this);
				var _startTime=options.startTime[0];
				if(options.startTime.length){
					_startTime=options.startTime[index];
				}
				var _opts=$.extend({},options,{startTime:_startTime,callback:$.isFunction(callbackFn)?callbackFn:function(){}});
				new Timer($this,_opts).run();
			}); 
			new Timer(options).run();
		}
	}); 
})(jQuery);
