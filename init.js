$(function(){
    var eggnog = Eggnog.init(slide, 'main', 'window', 'window');
    $('#main').css({marginTop: '-'+eggnog.utl.height/2+'px', marginLeft: '-'+eggnog.utl.width/2+'px'});
    
    $(window).keydown(function(e){
        if(e.keyCode == 37){ // <-
            eggnog.prev();
        }else if(e.keyCode == 39){ // ->
            eggnog.next();
        }
    });
    
    $(window).resize(function(){
        eggnog.setSize('window', 'window');
        $('#main').css({marginTop: '-'+eggnog.utl.height/2+'px', marginLeft: '-'+eggnog.utl.width/2+'px'});
    });
});