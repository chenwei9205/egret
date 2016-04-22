/**
 *
 * @author 
 *
 */
class Cricle extends egret.Sprite{
	public constructor() {
    	super();
    	this.init();
	}
	private init():void
	{
        this.graphics.beginFill(Math.random() * 0xffffff,0.1 + 0.9 * Math.random());
        this.graphics.drawCircle(0,0,20 + 10 * Math.random());
        this.graphics.endFill();
	}
}
