/**
 *
 * @author Chenwei
 *
 */
class DrawRect extends egret.Sprite{
	public constructor() {
    	super();
    	this.drawRect();
	}
	private drawRect():void
	{
        this.graphics.beginFill(0xff0000,0.7);
        this.graphics.drawRect(500,500,50,50);
        this.graphics.endFill();
        this.graphics.beginFill(0x00ff00,0.7);
        this.graphics.drawRect(550,500,50,50);
        this.graphics.endFill();
        this.graphics.beginFill(0x00ff00,0.7);
        this.graphics.drawRect(500,550,50,50);
        this.graphics.endFill();
        this.graphics.beginFill(0xff0000,0.7);
        this.graphics.drawRect(550,550,50,50);
        this.graphics.endFill();
	}
}
