import MainScript from "./MainScript";

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
export default class BirdScript extends cc.Component {

    @property(cc.AudioClip)
    flyAudio: cc.AudioClip = null;
    @property(cc.AudioClip)
    collisionAudio: cc.AudioClip = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    onCollisionEnter (other:cc.Collider, self:cc.Collider) {
        this.Collision();
    }
    
    onLoad () {
    }

    start () {
    }

    update (dt) {
        
    }

    public Fly(){
        var body=this.getComponent(cc.RigidBody);
        var curV= body.getLinearVelocityFromWorldPoint(body.getWorldCenter(),null);
        
        body.applyLinearImpulse(cc.v2(0,200-curV.y),body.getWorldCenter(),true);
        this.PlayFlyAudio();
    }
    private Collision(){
        var main=cc.find("Canvas").getComponent(MainScript);
        if(main.IsGameOver){
            return;
        }
        this.PlayCollisionAudio();
        this.getComponent(cc.Animation).stop();

        main.GameOver();
    }

    private PlayFlyAudio(){
        var audio=this.getComponent(cc.AudioSource);
        audio.clip=this.flyAudio;
        audio.play();
    }

    private PlayCollisionAudio(){
        var audio=this.getComponent(cc.AudioSource);
        audio.clip=this.collisionAudio;
        audio.play();
    }
}
