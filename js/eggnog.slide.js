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
            0 <= page &&
            page < this.slide.pages.length &&
            0 <= block &&
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

