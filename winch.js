
function clickBtn1(){    
    var weight = document.getElementById("weight").value;
    var me = document.getElementById("me").value;
    var wheel = document.getElementById("wheel").value;
    var v_y = document.getElementById("v_y").value;

    var list = new Array(4);
    list[0] = weight;
    list[1] = me;
    list[2] = wheel;
    list[3] = v_y;
    //数値チェック
    var check = 0;
    for(var i; i < list.length; i++)
    {
        if(list[i]>0) check += 0;
        else check += 1;
    }
    if(check != 0)
    {
        alert('エラー');
    }
    
}

function clickBtn2(){
    document.getElementById("weight").value = 0;
    document.getElementById("me").value = 80;
    document.getElementById("wheel").value = 0;
    document.getElementById("v_y").value = 0;
    document.getElementById("power").innerHTML = 0;
    document.getElementById("rev").innerHTML = 0;
    document.getElementById("tor").innerHTML = 0;
    
}
