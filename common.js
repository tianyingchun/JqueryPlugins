/// <summary>Command Util tools function.</summary>
(function () {
    String.prototype.cookie = function (value, expiryDays, domain, path, secure) {
        var builder = [this, "=", value];
        if (expiryDays) {
            var date = new Date();
            date.setTime(date.getTime() + (expiryDays * 86400000)); // 86400000 == 24*60*60*1000 (ms/day)
            builder.push(";expires=");
            builder.push(date.toUTCString());
        }

        if (domain) { builder.push(";domain="); builder.push(domain); }
        if (path) { builder.push(";path="); builder.push(path); }
        if (secure) { builder.push(";secure"); }
        document.cookie = builder.join("");

    };
    String.prototype.delCookie = function () {
        // Expires date format is supposed to be in GMT.
        document.cookie = this + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
    }
    String.prototype.getCookie = function () {
        var re = new RegExp('\\b' + this + '\\s*=\\s*([^;]*)', 'i');
        var match = re.exec(document.cookie);
        return (match && match.length > 1 ? match[1] : '');
    };
    /// <summary>string formation helper</summary>
    String.prototype.format = function () {
        // use this string as the format
        // walk through each argument passed in
        for (var fmt = this, ndx = 0; ndx < arguments.length; ++ndx) {
            // replace {0} with argument[0], {1} with argument[1], etc.
            fmt = fmt.replace(new RegExp('\\{' + ndx + '\\}', "g"), arguments[ndx]);
        }
        // return the formatted string
        return fmt;
    };
    String.prototype.getParam = function () {
        ///    <summary>
        ///     This function is used to extract the query parameters from a string.
        ///     The typical usage of the string is a url or the query portion of a url
        ///    </summary>
        ///    <returns type="object">
        // This params variable refers to the object which will contain all query parameters
        var params = {};
        var regex = new RegExp("\\b(\\w+)=([^&#]+)", "ig");
        // This variable will hold the result of regular expression execution
        // The result will be a query parameter each time regular expression is executed

        var match;
        // this indicates current url such as "http://my.com/home.aspx?name=terence&categoryid=10"
        while ((match = regex.exec(this))) {
            params[match[1].toLowerCase()] = match[2];
        }
        return params;
    };
    String.prototype.BuildUrlParameters = function (oNewParams) {
        /// <summary>
        ///   This function is used to re-construct current url's parameters.
        ///   you can set your costomized url parameters
        ///   usage : window.location.href.BuildUrlParameters([{wd:"widget"},{rsv_bp:"rsv_new"},{t:"terence"}]);
        ///   and return new url querystring. "wd=widget&rsv_bp=rsv_new&t=terence"
        ///   Note:a correct url is required such as window.location.href;
        ///</summary>
        /// <param name="oNewParams" type="Object|Array">New parameter object, such as [{wd:"widget"},{rsv_bp:"rsv_new"},{t:"terence"}]</param>
        //  Get current url querystring paramters object.
        var oParam = this.getParam();
        for (var i = 0; i < oNewParams.length; i++) {
            var oCur = oNewParams[i];
            for (var p in oCur) {
                oParam[p] = oCur[p];
            }
        }
        var newUrlParamStr = "";
        for (var i in oParam) {
            newUrlParamStr += i + "=" + oParam[i] + "&";
        }
        return this.split("?")[0] + "?" + newUrlParamStr.substring(0, newUrlParamStr.length - 1);
    };
})();
// Migrate from public.js.
function getE(name) {
    if (document.getElementById)
        var elem = document.getElementById(name);
    else if (document.all)
        var elem = document.all[name];
    else if (document.layers)
        var elem = document.layers[name];
    return elem;
}

function OpenWindow(query, w, h, scroll) {
    var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 2;

    winprops = 'resizable=0, height=' + h + ',width=' + w + ',top=' + t + ',left=' + l + 'w';
    if (scroll) winprops += ',scrollbars=1';
    var f = window.open(query, "_blank", winprops);
}

function getRootUrl(url) {
    if(!url){
        url=window.location.href;
    }
  return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
}

function setLocation(url) {
    window.location.href = url;
}

var description = "";
var title = window.document.title;
var currentUrl = window.location.href;
// The title,description is designed to push some share button such as "facebook","twitter"
function loadPage(site, pageTitle, pageDescription, currentURL) {
    /// <summary>
    /// This util function will used to go to new Social Network Service such as "facebook","twitter","google+"
    /// </summary>
    /// <param name="site">the siteUrl</param>
    /// <param name="pageTitle">the page title of our current page.</param>
    /// <param name="currentURL">current page url.</param>
    /// <param name="pageDescription">the page description of our current page.</param>
    var currentURL = encodeURIComponent(currentURL);
    var title = encodeURIComponent(pageTitle);
    var bodytext = encodeURIComponent(pageDescription);
    var newURL;
    var go = true;
    switch (site) {
        case "del.icio.us":
            newURL = "http://del.icio" + ".us/post?v=4" + ";url=" + currentURL + ";title=" + title;
            break;
        case "digg":
            newURL = "http://digg" + ".com/submit?phase=2&" + "url=" + currentURL + "&title=" + title + "&bodytext=" + bodytext + "&topic=tech_deals";
            break;
        case "reddit":
            newURL = "http://reddit" + ".com/submit?" + "url=" + currentURL + "&title=" + title;
            break;
        case "furl":
            newURL = "http://www.furl" + ".net/savedialog.jsp?" + "t=" + title + "&u=" + currentURL;
            break;
        case "rawsugar":
            newURL = "http://www.rawsugar" + ".com/home/extensiontagit/?turl=" + currentURL + "&tttl=" + title;
            break;
        case "stumbleupon":
            newURL = "http://www.stumbleupon" + ".com/submit?url=" + currentURL + "&title=" + title;
            break;
        case "blogmarks":
            break;
        case "facebook":
            newURL = "http://www.facebook" + ".com/share.php?src=bm&v=4" + "&u=" + currentURL + "&t=" + title;
            break;
        case "technorati":
            newURL = "http://technorati" + ".com/faves?sub=favthis&add=" + currentURL;
            break;
        case "spurl":
            newURL = "http://www.spurl" + ".net/spurl.php?v=3" + "&title=" + title + "&url=" + currentURL;
            break;
        case "simpy":
            newURL = "http://www.simpy" + ".com/simpy/LinkAdd.do?title=" + title + "&href=" + currentURL;
            break;
        case "ask":
            break;
        case "google":
            newURL = "http://www.google" + ".com/bookmarks/mark?op=edit&output=popup" + "&bkmk=" + currentURL + "&title=" + title;
            break;
        case "netscape":
            newURL = "http://www.netscape" + ".com/submit/?U=" + currentURL + "&T=" + title + "&C=" + bodytext;
            break;
        case "slashdot":
            newURL = "http://slashdot" + ".org/bookmark.pl?url=" + rawURL + "&title=" + title;
            break;
        case "backflip":
            newURL = "http://www.backflip.com/add_page_pop.ihtml?" + "title=" + title + "&url=" + currentURL;
            break;
        case "bluedot":
            newURL = "http://bluedot" + ".us/Authoring.aspx?" + "u=" + currentURL + "&t=" + title;
            break;
        case "kaboodle":
            newURL = "http://www.kaboodle" + ".com/za/selectpage?p_pop=false&pa=url" + "&u=" + currentURL;
            break;
        case "squidoo":
            newURL = "http://www.squidoo" + ".com/lensmaster/bookmark?" + currentURL;
            break;
        case "twitter":
            newURL = "http://twitthis" + ".com/twit?url=" + currentURL + "&title=" + title;
            break;
        case "bluedot":
            newURL = "http://blinkbits" + ".com/bookmarklets/save.php?" + "v=1&source_url=" + currentURL + "&title=" + title;
            break;
        case "blinkList":
            newURL = "http://blinkbits" + ".com/bookmarklets/save.php?" + "v=1&source_url=" + currentURL + "&title=" + title;
            break;
        case "browser":
            bookmarksite(pageTitle, rawURL);
            go = false;
            break
    }
    if (go == true) {
        window.open(newURL, "bookmarkWindow")
    }
}