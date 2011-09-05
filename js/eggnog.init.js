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
