(function(){
 	/**
 	 *  Declare Global Object "Z" that provider some basic methods used to organize js modules files.
     *  Imortant Methods: 'Z.extend(subClass,supperClass)', 'Z.define(ns,function)'
     *  Finnaly, we need compile all modules into live/all.js with specific orders.
     *  libs/lib.js contains jQuery.js,underscore.js,backbone.js
 	 */
 	var global = this,
        enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
                       'toLocaleString', 'toString', 'constructor'];
    if (typeof Z === 'undefined') {
        global.Z = {};
    }
    Z.apply = function (object, config, defaults) {
        if (defaults) {
            Z.apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }

            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    if (config.hasOwnProperty(k)) {
                        object[k] = config[k];
                    }
                }
            }
        }
        return object;
    };
    /**
     * Extends Z utities methods. 
     */
    Z.apply(Z, {
     	applyIf: function (object, config) {
            var property;
            if (object) {
                for (property in config) {
                    if (object[property] === undefined) {
                        object[property] = config[property];
                    }
                }
            }
            return object;
        },
        /**
         * the function used to create namespace, and return new objects.
         * @param  {string} str the namespace string. eg. "Z.Util.Manager"
         * @return {Object}  return namespace object.eg. Z.Util.Manager
         */
        ns: function (str) { 
            str = str.replace(/^\s+|\s+$/ig, "");
            if (str) {
                var arr = str.split("."), o = Z;
                for (i = (arr[0] == "Z") ? 1 : 0; i < arr.length; i++) {
                    o[arr[i]] = o[arr[i]] || {};
                    o = o[arr[i]];
                }
                return o;
            }
            return Z;
        },
        /**
         * serialize http url to an object
         * @param  http url eg.http://my.com/home.aspx?name=terence&categoryid=10
         * @return {Object} return serialize result. eg.{'name':'terence','categoryid':'10'}
         */
		serialize: function (url) {
            var params = {};
            var regex = new RegExp("\\b(\\w+)=([^&#]+)", "ig");
            var match;
            // this indicates current url such as "http://my.com/home.aspx?name=terence&categoryid=10"
            while ((match = regex.exec(url))) {
                params[match[1].toLowerCase()] = match[2];
            }
            return params;
        },
        /**
         * Format function, such as string.format() in c#
         * @param  {string} str  eg. "the output string is {1}","xxx"
         * @return {string} new string eg.the output string is xxx
         */
        format: function (str) {
            // use this string as the format,Note {x},x start from 1,2,3
            // walk through each argument passed in
            for (var fmt = str, ndx = 1; ndx < arguments.length; ++ndx) {
                // replace {1} with argument[1], {2} with argument[2], etc.
                fmt = fmt.replace(new RegExp('\\{' + ndx + '\\}', "g"), arguments[ndx]);
            }
            // return the formatted string
            return fmt;
        },
        /**
		 * The Extend function
		 * @param  {function} subClass  
		 * @param  {function} supperClass
		 * @return {function} subClass
		 */
		extend:function (subClass,supperClass){
			var F=function(){};
			F.prototype=supperClass.prototype;
			subClass.prototype=new F();
			subClass.prototype.constructor=subClass; 
			subClass.supperClass=supperClass.prototype; 
			if(supperClass.prototype.constructor==Object.prototype.constructor){
				supperClass.prototype.constructor=supperClass;
			}
			return subClass;
		},
		/**
		 * Define fucntion used to define contructor class within specific namespace.
		 * @param  {string} ns  namespace string. eg. Z.Model.Login
		 * @param  {function} function, need to return function constructor 
		 * @return {function} the function attached to Z.Model.Login
		 */
		define: function (ns, func) {
            if (!func) throw new Error("Miss func parameter for Z.define");
            var arr = ns.split(".");
            if (arr.length == 1 && arr[0] == "Z") {
                throw new Error("namespace string length must > 1 or first Ns don't ='Z'");
            }
            else {
                var _fName = arr.splice(arr.length - 1, 1)[0];
                var _ns = arr.join(".");  
                var newFunc= Z.ns(_ns)[_fName]= (typeof func == 'function') ? func :function(){};
                return newFunc;
            }
        }
    });
	
	/**
	 * Create Util Namespace.
	 */
	Z.ns("Util");
	Z.apply(Z.Util, {
		cookie: function (name, value, options) {
            if (typeof value != 'undefined') { // name and value given, set cookie
                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                }
                if (typeof value == 'object' && jQuery.toJSON) {
                    value = jQuery.toJSON(value);
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    }
                    else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                }
                // CAUTION: Needed to parenthesize options.path and options.domain
                // in the following expressions, otherwise they evaluate to undefined
                // in the packed version for some reason...
                var path = options.path ? '; path=' + (options.path) : '';
                var domain = options.domain ? '; domain=' + (options.domain) : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            }
            else { // only name given, get cookie
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                if (jQuery.evalJSON && cookieValue && cookieValue.match(/^\s*\{/)) {
                    try {
                        cookieValue = jQuery.evalJSON(cookieValue);
                    }
                    catch (e) {
                    }
                }
                return cookieValue;
            }
        }
	});
})();

