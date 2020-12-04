
function clickBtn1(){    
    var weight = document.getElementById("weight").value;
    var me = document.getElementById("me").value;
    var wheel = document.getElementById("wheel").value;
    var v_y = document.getElementById("v_y").value;

    //---数値チェック---//
    var list = document.getElementsByClassName('input-Box');    //戻り値はhtmlコレクション(配列)
    var check = 0;
    for(var i = 0; i < list.length; i++)
    {
        var e = list[i].value;
        if(e == 0){
            check = 1;
        }
        else{}
    }
    //---エラー表示---//
    if(check != 0)
    {
        document.getElementById("power").innerHTML = "-ERROR-";
        document.getElementById("rpm").innerHTML = "-ERROR-";
        document.getElementById("tor").innerHTML = "-ERROR-";
    }
    else{
        var power = 9.8*weight*v_y/me;
        var rpm = 60*v_y/(3.141*wheel);
        var tor = 100*power/(rpm*1.027);
        document.getElementById("power").innerHTML = power.toFixed(4);
        document.getElementById("rpm").innerHTML = rpm.toFixed(4);
        document.getElementById("tor").innerHTML = tor.toFixed(4);
    }
    
}

function clickBtn2(){
    document.getElementById("weight").value = 0;
    document.getElementById("me").value = 80;
    document.getElementById("wheel").value = 0;
    document.getElementById("v_y").value = 0;
    document.getElementById("power").innerHTML = 0;
    document.getElementById("rpm").innerHTML = 0;
    document.getElementById("tor").innerHTML = 0;
    
}
