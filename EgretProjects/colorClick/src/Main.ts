//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
    private timer: egret.Timer;
    private time_txt: egret.TextField=new egret.TextField;
    private count_txt: egret.TextField=new egret.TextField;
    private count: number = 0;
    private color: number = 0;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        this.createGameScene();
    }

    private createGameScene():void {
        var sw: number = this.stage.stageWidth;
        var sh: number = this.stage.stageHeight;
        var bg: egret.Shape = new egret.Shape();
        this.addChild(bg);
        bg.graphics.beginFill(0x221122);
        bg.graphics.drawRect(0,0,sw,sh);
        bg.graphics.endFill();
        var radius:number=160;
        for(var i:number=0;i<3;i++)
        {
            for(var j:number=0;j<5;j++)
            {
                var circle:Circle=new Circle(radius*(2*j+2)+50,radius*(2*i+2)+50,radius);
                this.addChild(circle);
            }
        }
        this.timer = new egret.Timer(1000,300);
        
        this.addChild(this.time_txt);
        this.time_txt.text = "点击一个喜欢的颜色开始游戏";
        this.time_txt.x=550;
        this.time_txt.y=20;
        this.addChild(this.count_txt);
        this.count_txt.text="得分：0";
        this.count_txt.x=550;
        this.count_txt.y=this.stage.stageHeight-40;
        this.addEventListener("cricle_click",this.onCircleClick,this,false);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this,false);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onEnd,this,false);
    }
    private onTimer(e:egret.TimerEvent):void
    {
        this.time_txt.text="倒计时："+(this.timer.repeatCount-this.timer.currentCount);
    }
    private onEnd(e:egret.TimerEvent):void
    {
        this.time_txt.text="刷新页面，再来一次";
        this.removeEventListener("cricle_click",this.onCircleClick,this,false);
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this,false);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onEnd,this,false);
        this.touchChildren=false;
    }
    private onCircleClick(e:any):void
    {
        if(this.count==0)
        {
            this.color=e.data;
            this.count++;
            this.timer.start();
        }
        else if(e.data==this.color)
        {
            this.count++;
        }
        this.count_txt.text="得分:"+this.count;
    }
}


