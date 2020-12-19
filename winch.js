
function clickBtn1(){    
    var weight = document.getElementById("weight").value;
    var me = document.getElementById("me").value;
    var wheel = document.getElementById("wheel").value;
    var v_y = document.getElementById("v_y").value;
    
    //---単位組み込み---//
    var wei_unit = document.getElementById("wei_unit").value;
    var whe_unit = document.getElementById("whe_unit").value;
    var v_y_unit = document.getElementById("v_y_unit").value;
    var tor_unit = document.getElementById("tor_unit").value;

    //---計算---//
    var power = 9.8*(weight*wei_unit)*(v_y*v_y_unit)/(me*0.001);
    var rpm = 60*(v_y*v_y_unit)/(3.141*wheel*whe_unit);
    var tor = (100*power/(rpm*1.027))*tor_unit;

    //---エラー表示---//
    if(isFinite(power) == false || isFinite(rpm) == false || isFinite(tor) == false)
    {
        document.getElementById("error_sound").play();
        document.getElementById("yuyu").style.color = "red";

        document.getElementById("power").innerHTML = "ERROR";
        document.getElementById("rpm").innerHTML = "ERROR";
        document.getElementById("tor").innerHTML = "ERROR";
    }
    //---計算結果表示---//
    else
    {
        document.getElementById("success_sound").play();
        document.getElementById("power").innerHTML = power.toFixed(4);
        document.getElementById("rpm").innerHTML = rpm.toFixed(4);
        document.getElementById("tor").innerHTML = tor.toFixed(4);
    }
    
}
//---リセットボタン---//
function clickBtn2(){
    document.getElementById("btnsound").play();
    document.getElementById("yuyu").style.color = "aquamarine";

    document.getElementById("weight").value = 0;
    document.getElementById("me").value = 80;
    document.getElementById("wheel").value = 0;
    document.getElementById("v_y").value = 0;
    document.getElementById("power").innerHTML = 0;
    document.getElementById("rpm").innerHTML = 0;
    document.getElementById("tor").innerHTML = 0;
}
