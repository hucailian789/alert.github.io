/**
 * Created by Administrator on 2016/10/25.
 */
/**
 * ��ñ�ǩ��������ֵ�ĺ���
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle(obj,attr){
    // �������  ��ν��������⣬Ҳ���ǿ�������Ƿ�֧�ִ˶�������Ի��Ƿ���
    if(obj.currentStyle){
        return  obj.currentStyle[attr];
    }else {
        return  getComputedStyle(obj,null)[attr];
    }
}

//��װ��������animate����
function animate1(obj,json,fn){
    clearInterval(obj.timeId);
    obj.timeId = setInterval(function(){
        var flag = true;
         for (var key in json){                             //�ڼ�ʱ�����棬Ҫ�����е����Զ�ȡ������Ȼ�������Ƕ�����Ŀ��λ��
             if (key == "opacity"){
                 var current = (getStyle(obj,key))*100;
                 var step = (json[key]*100 - current)/5;
                 step = step > 0 ? Math.ceil(step): Math.floor(step);
                 current +=step;
                 obj.style[key] = current/100;
                 if ( current/100 != json[key]){
                     flag = false;
                 }
             }else if(key =="zIndex"){
                 var current = parseInt(getStyle(obj,key));
                 obj.style[key] = json[key];
                 if ( current != json[key]){
                     flag = false;
                 }
             }else{
                 var current = parseInt(getStyle(obj,key));
                 var step = (json[key] - current)/5;
                 step = step > 0 ? Math.ceil(step): Math.floor(step);
                 current +=step;
                 obj.style[key] = current +"px";
                 if ( current != json[key]){
                     flag = false;
                 }
             }
         }
        if (flag){
            clearInterval(obj.timeId);
            if (typeof fn == "function"){
                fn();
            }
        }
    console.log(step+":"+ current);

    },15)
}