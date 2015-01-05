/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-01-05 17:08:36
 * @version $Id$
 */
 var baozou = {
    init: function(opts) {
        var me = this;
        me.params = opts;
        me.lineParams = {};
        me.box = $("#lineBox");
        me.hasCreateLine = false;
        me.bindEvent();
        lineControl.init();
    },
    initCanvas: function(data) {
        var me = this;
        me.canvas = document.getElementById("bzCanvas");
        me.ctx = me.canvas.getContext("2d");
        me.canvas.width = me.lineParams.width;
        me.canvas.height = me.lineParams.height;
        me.ctx.lineWidth = me.params.lineWidth;
        me.ctx.strokeStyle = me.params.strokeStyle;
        me.ctx.font=  me.params.font;

    },
    bindEvent: function() {
        var me = this;

        me.box.on("createLineBox.bz",function(e,data){
            me.lineParams = data;
            me.hasCreateLine = true;
        });

        $("#add").on("click",function(){
            lineControl.addLine();
        })

        $("#reduce").on("click",function(){
            lineControl.reduceLine();
        })

        $("#show").on("click",function(){
            lineControl.showAllLine();
        })

        $("#hide").on("click",function(){
            lineControl.hideAllLine();
        })

        $("#create").on("click",function(){
            if(me.hasCreateLine){
                me.createCanvas();
            }
        })
    },
    createCanvas: function() {
        var me = this;
        me.initCanvas();
        var list = me.lineParams.lineList;
        var length = list.length;
        var i = 0;
        for(;i < length;i++){
            var obj = list[i];
            if(!obj.hide){
                me.ctx.beginPath();
                if(obj.fx === "v"){
                    me.ctx.moveTo(obj.left,obj.top);
                    me.ctx.lineTo(obj.left,obj.top + me.lineParams.modHeight);
                }else{
                    me.ctx.moveTo(obj.left,obj.top);
                    me.ctx.lineTo(obj.left + me.lineParams.modWidth,obj.top);
                }
                me.ctx.stroke();
            }
        }
        me.canvas.style.display  = "block";
    }
 }
 baozou.init({
    lineWidth:2,
    strokeStyle:"#000",
    font:"12px Arial"

 });

