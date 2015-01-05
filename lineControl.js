/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-01-05 15:17:14
 * @version $Id$
 */
var lineControl = {
    opts:{
        obj:$("#lineBox"),
        showLine:true,
        LineCount:1,
        maxLineCount:10,
        minLineCount:1,
        lineWidth:2,
        modHeight:100,
        modWidth:400,
        lineColor:"#000"
    },
    init:function( opt ) { 
        var me = this;
        var opts = $.extend(me.opts,opt);
        if(opts.LineCount <= 0){
            throw "LineCount 必须大于0";
            return;
        }
        me.lineList = [];
        me.obj = me.opts.obj;
        me.vLinecount = me.hLinecount = 0;
        me.initLine();
        me.createLineBox();
    },
    //奇数的横线 偶数是竖线
    initLine:function(){
        var me = this;
        var length = me.opts.LineCount;
        for(var i = 1;i <= length;i++){
            var obj = {};
            if(me.odd(i)){
                obj = me.initHLine();
            }else{
                obj = me.initVLine();
            }
            me.addLineByObj(obj);
        }
    },
    initVLine:function(){
        var me = this;
        var obj = {};
        me.vLinecount++;
        obj.top = me.opts.modHeight*(me.vLinecount - 1);
        obj.left = me.opts.modWidth/2;
        obj.w = me.opts.lineWidth;
        obj.h = me.opts.modHeight;
        obj.fx = "v";
        obj.hide = false;
        if(me.allHide){
            obj.hide = true;
        }
        obj.background = me.opts.lineColor;
        return obj;
    },
    initHLine:function(){
        var me = this;
        var obj = {};
        me.hLinecount++;
        obj.top = me.opts.modHeight*(me.hLinecount - 1);
        obj.left = 0;
        obj.w = me.opts.modWidth;
        obj.h = me.opts.lineWidth;
        obj.fx = "h";
        obj.hide = false;
        obj.background = me.opts.lineColor;
        if(me.hLinecount === 1 || me.allHide){
            obj.hide = true;
        }
        return obj;
    },
    addLineByObj:function(obj){
        var me = this;
        me.lineList.push(obj);
    },
    createLineBox:function(){
        var me = this;
        var length = me.lineList.length;
        me.obj.empty("").hide();
        for(var i = 0;i < length;i++){
            var obj = me.lineList[i];
            if(!obj.hide){
                var lineHTML = $("<div></div>");
                lineHTML.css({
                    "top":obj.top + "px",
                    "left":obj.left + "px",
                    "width":obj.w,
                    "height":obj.h,
                    "background":obj.background,
                    "position":"absolute"
                });
                me.obj.append(lineHTML);
            }
        }
        //垂直的块数
        var modCount = me.odd(length)?(length + 1)/2:length/2;

        me.obj.width(me.opts.modWidth)
               .height(modCount * me.opts.modHeight)
               .css("position","relative")
               .show();

        me.obj.trigger('createLineBox',{
            lineList:me.lineList,
            height:modCount * me.opts.modHeight,
            width:me.opts.modWidth,
            lineWidth:me.opts.lineWidth,
            strokeStyle:me.opts.lineColor,
            modHeight:me.opts.modHeight,
            modWidth:me.opts.modWidth
        });

    },
    odd:function(count){
        return count%2 === 1;
    },
    addLine:function(){
        var me = this;
        var count = me.lineList.length;
        if(me.odd(count)){
            obj = me.initVLine();
        }else{
            obj = me.initHLine();
        }
        me.addLineByObj(obj);
        me.createLineBox();
    },
    reduceLine:function(){
        var me = this;
        var length = me.lineList.length
        if(length <= me.opts.minLineCount){
            return;
        }

        var line = me.lineList.pop();
        if(line.fx === "v"){
            me.vLinecount--;
        }else{
            me.hLinecount--;
        }
        me.createLineBox();
    },
    showAllLine:function(){
        var me = this;
        $.each(me.lineList,function(i,v){
            if(i!= 0){
                v.hide = false;
            }
        })
        me.allHide = false;
        me.createLineBox();
    },
    hideAllLine:function(){
        var me = this;
        $.each(me.lineList,function(i,v){
            if(i!= 0){
                v.hide = true;
            }
        })
        me.allHide = true;
        me.createLineBox();
    }
}
