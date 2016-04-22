/**
 *
 * @author 
 *
 */
class Circle extends egret.Sprite{
	public constructor(lx:number,ly:number,r:number) {
    	super();
    	this.init(lx,ly,r)
	}
	private shape:egret.Shape=new egret.Shape;
	private lx:number;
	private ly:number;
	private r:number;
	private color:number;
    private colorList: number[] = [13408665,16777113,6710937,16750848,16776960,39372,13421721,13382553,
        10079232,16737894,16776960,3381708,13395456,10066329,13421619,16750899,16777164,39219,
        39372,13421772,16737894,16737792,16777062,39270,13395507,16764057,13395456,13369446,39321,16763955];
    private init(lx: number,ly: number,r: number):void
	{
    	  var color:number=this.colorList[Math.round(Math.random()*this.colorList.length)];
    	  this.color=color;
	    this.shape.graphics.beginFill(color,0.8);
	    this.shape.graphics.drawCircle(0,0,r);
	    this.shape.graphics.endFill();
	    this.shape.x=-r;
	    this.shape.y=-r;
	    this.lx=lx;
	    this.ly=ly;
	    this.r=r;
	    this.touchEnabled=true;
	    this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.tap_fun,this,false);
	    this.addChild(this.shape);
	    this.x=lx;
	    this.y=ly;
	}
	private tap_fun(e:egret.TouchEvent):void
	{
    	  var parent=this.parent;
	    this.parent.dispatchEventWith("cricle_click",false,this.color);
	    this.touchEnabled=false;
	    var tween:egret.Tween=egret.Tween.get(this);
	    tween.to({alpha:0.1},200,egret.Ease.sineIn);
	    tween.call(function(){
	    this.visible=false;
	    this.parent.removeChild(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.tap_fun,this,false);
	    },this);
	    var cirList:Circle[]=[];
	    var tweenList:egret.Tween[]=[];
	    var num:number=3;
	    var g:number=0;
	    for(var i:number=0;i<num;i++)
        {  
            for(var j:number=0;j<num;j++)
            {
                cirList[g]=new Circle(this.lx-this.r/num*(2*j),this.ly-this.r/num*(2*i),this.r/num);
                cirList[g].alpha=0.1;
                cirList[g].scaleX=0.5;
                cirList[g].scaleY=0.5;
                parent.addChild(cirList[g]);
                tweenList[g]=egret.Tween.get(cirList[g]);
                tweenList[g].to({alpha:0.8,scaleX:1,scaleY:1},200,egret.Ease.sineOut);
                g++;
            }
        }
	}
}
