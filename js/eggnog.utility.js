Eggnog.Utility = function(slide, base, width, height){
    var Class = arguments.callee;
    if(!(this instanceof Class)) return new Class(slide, base, width, height);
    
    // property
    this.slide = slide;
    this.base = (typeof base === 'string')? document.getElementById(base) : base;
    this.aspect = this.slide.aspect;
    this.width = this.height = this.fontSize = 0;
    
    // initialize
    this._initialize(width, height);
};

Eggnog.Utility.prototype = (function($){
    var proto = {};
    
    // constructor
    proto._initialize = function(width, height){
        this.setSize(width, height);
        this.setTitle(this.slide.title);
    };
    
    // public
    proto.setSize = function(width, height){
        width = (width === 'window')? $(window).width() : width;
        height = (height === 'window')? $(window).height() : height;
        // validate input
        
        this._calcSize(Number(width), Number(height));
        $(this.base).css({width: this.width+'px', height: this.height+'px'});
        $(document.body).css('fontSize', this.fontSize+'px');
    };
    
    proto.setTitle = function(title){
        document.title = title || 'Untitled';
    };
    
    // private
    proto._calcSize = function(width, height){
        if(height * this.aspect < width){
            width = height * this.aspect;
        }else{
            height = width / this.aspect;
        }
        
        var fontSize = height / 10;
        
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
    };
    
    return proto;
})(jQuery);

