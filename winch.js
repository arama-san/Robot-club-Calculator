
function clickBtn1(){    
    var weight = document.getElementById("weight").value;
    var me = document.getElementById("me").value;
    var wheel = document.getElementById("wheel").value;
    var v_y = document.getElementById("v_y").value;

    //---数値チェック---//
    var list = document.getElementsByClassName('input-Box');    //戻り値はhtmlコレクション(数値ではない配列)
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
    //---数値計算---//
    else{
        var wei_unit = document.getElementById("wei_unit").value;
        var whe_unit = document.getElementById("whe_unit").value;
        var v_y_unit = document.getElementById("v_y_unit").value;
        var tor_unit = document.getElementById("tor_unit").value;

        var power = 9.8*(weight*wei_unit)*(v_y*v_y_unit)/(me*0.001);
        var rpm = 60*(v_y*v_y_unit)/(3.141*wheel*whe_unit);
        var tor = (100*power/(rpm*1.027))*tor_unit;
        document.getElementById("power").innerHTML = power.toFixed(4);
        document.getElementById("rpm").innerHTML = rpm.toFixed(4);
        document.getElementById("tor").innerHTML = tor.toFixed(4);
    }
    
}
//---リセットボタン---//
function clickBtn2(){
    document.getElementById("weight").value = 0;
    document.getElementById("me").value = 80;
    document.getElementById("wheel").value = 0;
    document.getElementById("v_y").value = 0;
    document.getElementById("power").innerHTML = 0;
    document.getElementById("rpm").innerHTML = 0;
    document.getElementById("tor").innerHTML = 0;
    
}
