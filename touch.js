let touch = (target, parameter) => {
    let item = document.querySelectorAll (target);
    parameter = typeof  parameter === "object" ? parameter : undefined;
    let start,
        cancel,
        move,
        end,
        clicked;
    if (parameter !== undefined) {
        start = typeof  parameter.start !== undefined ? parameter.start : undefined;
        cancel = typeof  parameter.cancel !== undefined ? parameter.cancel : undefined;
        move = typeof  parameter.move !== undefined ? parameter.move : undefined;
        leave = typeof  parameter.leave !== undefined ? parameter.leave : undefined;
        end = typeof  parameter.end !== undefined ? parameter.end : undefined;
    }
    Array.prototype.forEach.call (item, function (trigger) {
        let helper = {
            trigger:trigger,clicked : null,
            start: {x: null, y: null}, change: {x: null, y: null}, finish: {x: null, y: null},old: {x: null, y: null},direction:{x:null,y:null}
        }, touchStarter = (e) => {
            helper.start.x = e.pageX || e.changedTouches[ 0 ].pageX;
            helper.start.y = e.pageY || e.changedTouches[ 0 ].pageY;
        }, touchs = (e) => {
            helper.finish.x = e.pageX || e.changedTouches[ 0 ].pageX;
            helper.finish.y = e.pageY || e.changedTouches[ 0 ].pageY;
            helper.change.x = helper.finish.x - helper.start.x;
            helper.change.y = helper.finish.y - helper.start.y;
             if (helper.old.x < helper.finish.x){
                helper.direction.x = "right";
            }else{
                helper.direction.x = "left";
            }
            if (helper.old.y - helper.finish.y < helper.change.y){
                helper.direction.y = "bottom";
            }else{
                helper.direction.y = "top";
            }
            helper.old.x = e.pageX || e.changedTouches[ 0 ].pageX;
            helper.old.y = e.pageY || e.changedTouches[ 0 ].pageY;
        }, touchStart = (e) => {
            touchStarter (e);
            clicked = true;
            helper.clicked = clicked;
            return typeof start === "function" ? start (e, helper) : false;
        }, touchMove = (e) => {
         if (clicked){
             touchs (e);
             return typeof move === "function" ? move (e, helper) : false;
         }
        }, touchCancel = (e) => {
            touchs (e);
            clicked =false;
            return typeof cancel === "function" ? cancel (e, helper) : false;
        }, touchEnd = (e) => {
            clicked =false;
            return typeof end === "function" ? end (e, helper) : false;
        },touchLeave = (e)=>{
            clicked =false;
            return typeof leave === "function" ? leave (e, helper) : false;
        };

        //touch event
        trigger.addEventListener ("touchstart", touchStart, false);
        trigger.addEventListener ("touchend", touchEnd, false);
        trigger.addEventListener ("touchcancel", touchLeave, false);
        trigger.addEventListener ("touchLeave", touchCancel, false);
        trigger.addEventListener ("touchmove", touchMove, false);

        //mouseEvent
        trigger.addEventListener ("mousedown", touchStart, false);
        trigger.addEventListener ("mouseup", touchEnd, false);
        trigger.addEventListener ("mouseleave", touchLeave, false);
        trigger.addEventListener ("mousemove", touchMove, false);
    });
};
// touch("#eventItem",{
//     start:function (event,helper) {
//         //Başlarken yapmak istediğiniz komutlar
//     },
//     cancel:function (event,helper) {
//         //İptal durumunda yapmak istediğiniz komutlar
//     },
//     move:function (event,helper) {
//         //Sürükleme durumunda yapmak istediğiniz komutlar
//     },
//     end:function (event,helper) {
//         //Sürükleme işlemi sonunda yapmak istediğiniz komutlar
//     },
//     leave:function (event,helper) {
//         //Ayrılma durumunda yapmak istediğiniz komutlar
//     },
// });
