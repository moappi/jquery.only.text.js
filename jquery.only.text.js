//Copyright (c) 2014 Crystalline Technologies
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'),
//  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
//  and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
//  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function($){	

	//Main method
	$.fn.only = function(_config){	
        
        if(!_config) return(this);
        
        if($.type(_config)==='string') _config = {"allowed":_config};

        config = {
            "allowed":"",
            "max":undefined
        };
        
        if(_config) $.extend(config, _config);

		return this.each(function(){ 

            var $obj = $(this);

            // set data and methods
            if($obj.prop("tagName").toLowerCase() === "input") return($obj.data('config',config).keypress($.fn.only.keypress));
		});
	};
	
	//Keypress Event
	$.fn.only.keypress = function(e) {
    
        // get the key that was pressed
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        
        // allow enter/return key (only when in an input box)
        if(key === 13) return true;
        
        // allow Ctrl+A
        if((e.ctrlKey && key === 97 /* firefox */) || (e.ctrlKey && key == 65) /* opera */) return true;
        // allow Ctrl+X (cut)
        if((e.ctrlKey && key === 120 /* firefox */) || (e.ctrlKey && key == 88) /* opera */) return true;
        // allow Ctrl+C (copy)
        if((e.ctrlKey && key === 99 /* firefox */) || (e.ctrlKey && key == 67) /* opera */) return true;
        // allow Ctrl+Z (undo)
        if((e.ctrlKey && key === 122 /* firefox */) || (e.ctrlKey && key == 90) /* opera */) return true;
        // allow or deny Ctrl+V (paste), Shift+Ins
        if((e.ctrlKey && key === 118 /* firefox */) || (e.ctrlKey && key == 86) /* opera */
        || (e.shiftKey && key === 45)) return true;
        
        //Verify that we are allowed to enter this charater
        var char = String.fromCharCode(key);
        
        //Get the number of charaters in this input
        var size = $(this).val().length;
        
        var config = $(this).data('config');
        
        //Check the size
        if(config.max)
            if(size >= config.max) return(false);
            
        return(config.allowed.indexOf(char) >= 0);
    };
})(jQuery);
