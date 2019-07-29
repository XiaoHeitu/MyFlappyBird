import BirdScript from "./BirdScript";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScript extends cc.Component {

    @property(Number)
    public speed: number = 1;
    
    @property(cc.Sprite)
    bird: cc.Sprite = null;

    @property(cc.Label)
    debugLabel: cc.Label = null;

    @property(cc.Label)
    scoring: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(Boolean)
    public IsGameOver=true;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox=true;
        
        this.node.on('touchstart', this.onTouchStart,this);
    }

    start () {
        this.initBGW= cc.find("Canvas/BG").width;
    }

    initBGW=0;
    update (dt) {
        this.speed+=dt/10;
       var bgW= cc.find("Canvas/BG").width;
       var gw= cc.find("Canvas/Ground").width;
       var pc= cc.find("Canvas/Pipes").childrenCount;

       this.debugLabel.string= "背景宽度："+bgW+"\r\n"+
                    "地面宽度："+gw+"\r\n"+
                    "管道数量："+pc;

        var score=Math.trunc( (bgW-this.initBGW)/100);
        if(score.toString()!=this.scoring.string){
            this.changeScore(score.toString());
        }
    }

    changeScore(newScore:string){
        this.scoring.string=newScore;
        this.scoring.getComponent(cc.AudioSource).play();
    }

    onTouchStart(event:cc.Event.EventTouch){
        if(this.IsGameOver)
        {
            return;
        }
        var script=this.bird.getComponent(BirdScript);       
        script.Fly();
    }

    public GameOver(){
        this.IsGameOver=true;
        var animation=cc.find("Canvas/Main Camera").getComponent(cc.Animation);
        animation.play(null,null);
        cc.find("Canvas/Reset").active=true;
    }

    onReset(){
        cc.find("Canvas/Reset").active=false; 
        cc.find("Canvas/Pipes").removeAllChildren();
        this.initBGW= cc.find("Canvas/BG").width;
        this.speed=1;
        this.scoring.string="0";
        this.bird.node.position=cc.v2(0,0);
        this.IsGameOver=false;
        var body=this.bird.getComponent(cc.RigidBody);
        var velocity=body.getLinearVelocityFromWorldPoint(body.getWorldCenter(),null);
        body.applyLinearImpulse(cc.v2(0,0-velocity.y),body.getWorldCenter(),true);
        this.bird.getComponent(cc.Animation).play();
    }
}
