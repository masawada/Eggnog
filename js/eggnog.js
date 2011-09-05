//
// eggnog.js
// http://andantesoftware.com/eggnog/
// Distributed under the MIT License
//

var Eggnog = {};

Eggnog.init = function(slide, base, width, height){
    var Class = arguments.callee;
    if(!(this instanceof Class)) return new Class(slide, base, width, height);
    
    // library
    this.slide = Eggnog.Slide(slide);
    this.utl = Eggnog.Utility(this.slide, base, width, height);
    this.render = Eggnog.Render(this.slide, this.utl);
};

Eggnog.init.prototype = (function(){
    var proto = {};
    
    // slide control
    proto.next = function(){
        this.render.next();
    };
    
    proto.prev = function(){
        this.render.prev();
    };
    
    proto.jumpTo = function(page, block){
        this.render.jumpTo(page, block);
    };
    
    proto.setSize = function(width, height){
        this.utl.setSize(width, height);
    };
    
    proto.getNote = function(){
        return this.slide.note;
    };
    
    
    
    return proto;
})();
Eggnog.Slide = function(slide){
    var Class = arguments.callee;
    if(!(this instanceof Class)) return new Class(slide);
    
    // property
    this.slide = slide;
    this.page = this.block = 0;
    this.title = this.slide.title || 'Untitled';
    this.aspect = this.slide.aspect || 4/3;
    
    // initialize
    this._initialize();
};

Eggnog.Slide.prototype = (function(){
    var proto = {};
    
    // constructor
    proto._initialize = function(){
        this._setNote();
    };
    
    // page manager
    proto.next = function(){
        if(this.block + 1 < this.slide.pages[this.page].blocks.length){
            this.block++;
        }else if(this.page + 1 < this.slide.pages.length){
            this.block = 0;
            this.page++;
            this._setNote();
        }
    };
    
    proto.prev = function(){
        if(this.block > 0){
            this.block--;
        }else if(this.page > 0){
            this.page--;
            this.block = this.slide.pages[this.page].blocks.length - 1;
            this._setNote();
        }
    };
    
    proto.setPoint = function(page, block){
        page = parseInt(page);
        block = parseInt(block);
        
        if(
            0 < page &&
            page < this.slide.pages.length &&
            0 < block &&
            block < this.slide.pages[page].blocks.length
        ){
            this.page = page;
            this.block = block;
            this._setNote();
        }
    };
    
    proto.getPage = function(){
        return this.slide.pages[this.page];
    };
    
    proto.getBlock = function(block){
        block = (block === 0 || parseInt(block))? parseInt(block) : this.block;
        return this.slide.pages[this.page].blocks[block];
    };
    
    // private
    proto._setNote = function(){
        this.note = this.slide.pages[this.page].note;
    };
    
    return proto;
})();

Eggnog.Render = function(slide, utl, style){
    var Class = arguments.callee;
    if(!(this instanceof Class)) return new Class(slide, utl);
    
    // library
    this.slide = slide;
    this.utl = utl;
    
    // initialize
    this._initialize();
};

Eggnog.Render.prototype = (function(){
    var proto = {};
    // constructor
    proto._initialize = function(){
        var s_node = $('<div></div>').addClass('en_Slide').css('display', 'none');
            
        var block = this.slide.getBlock();
        var page = this.slide.getPage();
        this._showBlock(this._appendBlock(s_node, block), block);
        this._showSlide(s_node, page);
        
        this.page = this.slide.page;
        this.block = this.slide.block;
    };
    
    // public
    proto.next = function(){
        this.slide.next();
        if(this.page !== this.slide.page){
            var s_node = $('<div></div>').addClass('en_Slide').css('display', 'none');
            
            var block = this.slide.getBlock();
            var page = this.slide.getPage();
            this._showBlock(this._appendBlock(s_node, block), block);
            this._showSlide(s_node, page);
            
            this.page = this.slide.page;
            this.block = this.slide.block;
        }else if(this.block !== this.slide.block){
            var block = this.slide.getBlock();
            this._showBlock(this._appendBlock(this.current, block), block);
            
            this.block = this.slide.block;
        }
    };
    
    proto.prev = function(){
        this.slide.prev();
        if(this.page !== this.slide.page){
            var s_node = $('<div></div>').addClass('en_Slide').css('display', 'none');
            
            for(var i = 0; i <= this.slide.block; i++){
                var block = this.slide.getBlock(i);
                this._showBlock(this._appendBlock(s_node, block), block);
            }
            
            this._showSlide(s_node, this.slide.page);
            
            this.page = this.slide.page;
            this.block = this.slide.block;
        }else if(this.block !== this.slide.block){
            $('.en_Block:last-child').remove();
            this.block = this.slide.block;
        }
    };
    
    proto.jumpTo = function(page, block){
        this.slide.setPoint(page, block);
        if(this.page !== this.slide.page || this.block !== this.slide.block){
            var s_node = $('<div></div>').addClass('en_Slide').css('display', 'none');
            
            for(var i = 0; i <= this.slide.block; i++){
                var block = this.slide.getBlock(i);
                this._showBlock(this._appendBlock(s_node, block), block);
            }
            
            this._showSlide(s_node, this.slide.page);
            
            this.page = this.slide.page;
            this.block = this.slide.block;
        }
    };
    
    // private
    proto._appendBlock = function(s_node, block){
        var b_node = $('<div></div>').addClass('en_Block').css('display', 'none');
        var elements = block.elements;
        for(var i = 0; i < elements.length; i++){
            this._appendElement(b_node, elements[i]);
        }
        s_node.append(b_node);
        return b_node;
    };
    
    proto._appendElement = function(b_node, element){
        if(element.type === 'title'){
            b_node.append($('<h1></h1>').addClass('en_Title').text(this._escVal(element.value)).css(element.style));
        }else if(element.type === 'text'){
            b_node.append($('<p></p>').addClass('en_Text').text(this._escVal(element.value)).css(element.style));
        }else if(element.type === 'link'){
            b_node.append($('<p></p>').addClass('en_Link').css(element.style).append($('<a></a>').attr('href',element.href).text(this._escVal(element.value))));
        }else if(element.type === 'image'){
            b_node.append($('<img>').addClass('en_Image').css(element.style).attr('src', element.src));
        }else if(element.type === 'tag'){
            b_node.append($('<div></div>').addClass('en_tag').append($(element.tag)));
        }
    };
    
    proto._showBlock = function(b_node, block){
        b_node.css('display', 'block');
        if(typeof block.script === 'function') block.script();
    };
    
    proto._showSlide = function(s_node, page){
        $(this.utl.base).append(s_node);
        s_node.css('display', 'block');
        if(this.current) this.current.remove();
        if(typeof page.script === 'function') page.script();
        
        this.current = s_node;
    };
    
    proto._escVal = function(q){
        return q;
    };
    
    return proto;
})();
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
        width = (width === 'window')? this.windowWidth() : width;
        height = (height === 'window')? this.windowHeight() : height;
        // validate input
        
        this._calcSize(Number(width), Number(height));
        $(this.base).css({width: this.width+'px', height: this.height+'px'});
        $(document.body).css('fontSize', this.fontSize+'px');
    };
    
    proto.setTitle = function(title){
        document.title = title || 'Untitled';
    };
    
    proto.windowWidth = function(){
        if(window.innerWidth){return window.innerWidth;} 
        else if(document.documentElement && document.documentElement.clientWidth != 0){return document.documentElement.clientWidth;} 
        else if(document.body){return document.body.clientWidth;} 
        return 0;
    };
    
    proto.windowHeight = function(){
        if(window.innerHeight){return window.innerHeight;} 
        else if(document.documentElement && document.documentElement.clientHeight != 0){return document.documentElement.clientHeight;} 
        else if(document.body){return document.body.clientHeight;} 
        return 0;
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
