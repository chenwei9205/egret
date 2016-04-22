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

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;
    private rect:egret.Shape;
    private angel:number=0;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var cricle:egret.Shape=new egret.Shape();
        var g:egret.Graphics=cricle.graphics;
        g.lineStyle(0,0xffffff);
        g.beginFill(0x00ff00,0.7);
        g.drawCircle(this.stage.stageWidth/2,this.stage.stageHeight/2,100);
        g.endFill();
        this.addChild(cricle);
        this.rect=new egret.Shape;
        this.rect.graphics.beginFill(0,0x440066);
        this.rect.graphics.drawRect(0,0,30,30);
        this.rect.graphics.endFill();
        this.addChild(this.rect);
        this.addEventListener(egret.Event.ENTER_FRAME,this.onLoop,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        this.learnGraphics();
        var rect:DrawRect=new DrawRect();
        this.addChild(rect);
        rect.x=rect.y=300;
        var bmp:egret.Bitmap=new egret.Bitmap();
        bmp.texture=RES.getRes("catPic");
        bmp.width=800;
        bmp.height=500;
        this.addChild(bmp);
        bmp.x=50;bmp.y=400;
        var mask:egret.Rectangle=new egret.Rectangle(50,50,700,400);
        bmp.mask=mask;
        var bgBmp:egret.Bitmap=new egret.Bitmap();
        bgBmp.texture=RES.getRes("bg");
        this.addChild(bgBmp);
        bgBmp.x = this.stage.stageWidth - 300;
        bgBmp.y=60;
        var birdBmp:egret.Bitmap=new egret.Bitmap();
        birdBmp.texture = RES.getRes("egretIcon");
        this.addChild(birdBmp);
        birdBmp.x=this.stage.stageWidth-300;
        birdBmp.y=60;
        birdBmp.blendMode=egret.BlendMode.ERASE;
    }
    private onTap(e:egret.TouchEvent):void
    {
        console.log("!!!!")
        var cricle:Cricle=new Cricle();
        this.addChild(cricle);
        cricle.x=e.stageX;
        cricle.y=e.stageY;
    }
    private onLoop(e:egret.Event):void
    {
        this.rect.x = 100 * Math.sin(Math.PI / 180 * this.angel)+this.stage.stageWidth/2;
        this.rect.y = 100 * Math.cos(Math.PI / 180 * this.angel)+this.stage.stageHeight/2;
        this.angel++;
    }
    private learnGraphics():void
    {
        var sp:egret.Shape=new egret.Shape();
        sp.graphics.lineStyle(2,0xffcc88);
        sp.graphics.moveTo(100,100);
        sp.graphics.curveTo(120,120,200,50);
        sp.$graphics.endFill();
        this.addChild(sp);
        var sp2:egret.Shape=new egret.Shape();
        sp2.graphics.lineStyle(2,0x00cc11);
        sp2.graphics.beginFill(0xffffff);
        sp2.graphics.drawArc(300,300,50,0,Math.PI,true);
        sp2.graphics.endFill();
        this.addChild(sp2);
        sp.graphics.beginFill(0xff0000,0.7);
        sp.graphics.drawRect(500,500,50,50);
        sp.graphics.endFill();
        sp.graphics.beginFill(0x00ff00,0.7);
        sp.graphics.drawRect(550,500,50,50);
        sp.graphics.endFill();
        sp.graphics.beginFill(0x00ff00,0.7);
        sp.graphics.drawRect(500,550,50,50);
        sp.graphics.endFill();
        sp.graphics.beginFill(0xff0000,0.7);
        sp.graphics.drawRect(550,550,50,50);
        sp.graphics.endFill();
    }
   
}


