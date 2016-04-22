/**
 *
 * @author
 *
 */
var Cricle = (function (_super) {
    __extends(Cricle, _super);
    function Cricle() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=Cricle,p=c.prototype;
    p.init = function () {
        this.graphics.beginFill(Math.random() * 0xffffff, 0.1 + 0.9 * Math.random());
        this.graphics.drawCircle(0, 0, 20 + 10 * Math.random());
        this.graphics.endFill();
    };
    return Cricle;
})(egret.Sprite);
egret.registerClass(Cricle,'Cricle');
