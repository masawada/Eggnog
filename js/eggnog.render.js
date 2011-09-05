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
