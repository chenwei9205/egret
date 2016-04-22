/**
 *
 * @author Chenwei
 *
 */
var DrawRect = (function (_super) {
    __extends(DrawRect, _super);
    function DrawRect() {
        _super.call(this);
        this.drawRect();
    }
    var d = __define,c=DrawRect,p=c.prototype;
    p.drawRect = function () {
        this.graphics.beginFill(0xff0000, 0.7);
        this.graphics.drawRect(500, 500, 50, 50);
        this.graphics.endFill();
        this.graphics.beginFill(0x00ff00, 0.7);
        this.graphics.drawRect(550, 500, 50, 50);
        this.graphics.endFill();
        this.graphics.beginFill(0x00ff00, 0.7);
        this.graphics.drawRect(500, 550, 50, 50);
        this.graphics.endFill();
        this.graphics.beginFill(0xff0000, 0.7);
        this.graphics.drawRect(550, 550, 50, 50);
        this.graphics.endFill();
    };
    return DrawRect;
})(egret.Sprite);
egret.registerClass(DrawRect,'DrawRect');
