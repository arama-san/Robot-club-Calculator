const PI = Math.PI; //円周率定義

function color_AllGreen(){
    //カラーオールグリーン
    document.getElementById("wheel_name").style.color = "aquamarine";
    document.getElementById("v_name").style.color = "aquamarine";
}

function clickBtn1(){
    //---データ取得---//
    var weight = document.getElementById("weight").value;
    var run_res = document.getElementById("run_res").value;
    var me = document.getElementById("me").value;
    var slope = document.getElementById("slope").value; //0 ok
    var wheel = document.getElementById("wheel").value;
    var Num_wheel = document.getElementById("Num_wheel").value;
    var v = document.getElementById("v").value;

    //---単位取得---//
    var wei_unit = document.getElementById("wei_unit").value;
    var whe_unit = document.getElementById("whe_unit").value;
    var v_unit = document.getElementById("v_unit").value;
    var tor_unit = document.getElementById("tor_unit").value;

    //数値に単位組み込み
    weight *= wei_unit;
    run_res *= 0.01;
    me *= 0.01;
    slope *= PI/180;
    wheel *= whe_unit;
    v *= v_unit;

  

    //各ホイールの出力(回転数に応じて)
    var power = Math.abs((9.81*weight*(Math.sin(slope)+run_res*Math.cos(slope))*v)/(me*Num_wheel));

    var rpm = 60*v/(PI*wheel);

    var tor = (power*wheel*0.5*tor_unit)/v;


    if(weight == 0)
    {
        document.getElementById("weight_name").style.color = "yellow";
    }
    else
    {
        document.getElementById("weight_name").style.color = "aquamarine";
    }
    
    //値チェック
    if(isFinite(rpm) == false || isFinite(power) == false || isFinite(tor) == false)    //エラーメッセージ
    {
        document.getElementById("error_sound").play();

        document.getElementById("power").innerHTML = "ERROR";
        document.getElementById("rpm").innerHTML = "ERROR";
        document.getElementById("tor").innerHTML = "ERROR";

        if(wheel==0)
        {
            document.getElementById("wheel_name").style.color = "red";
        }
        if(v==0)
        {
            document.getElementById("v_name").style.color = "red";
        }
    }
    else    //正常
    {
        document.getElementById("success_sound").play();
        color_AllGreen();


        //計算結果表示
        document.getElementById("power").innerHTML = power.toFixed(4);
        document.getElementById("rpm").innerHTML = rpm.toFixed(4);
        document.getElementById("tor").innerHTML = tor.toFixed(4);
    }
}

//---リセットボタン---//
function clickBtn2(){
    document.getElementById("btnsound").play(); //効果音
    color_AllGreen();
    document.getElementById("weight_name").style.color = "aquamarine";

    document.getElementById("weight").value = 0;
    document.getElementById("me").value = 80;
    document.getElementById("wheel").value = 0;
    document.getElementById("Num_wheel").value = 1;
    document.getElementById("v").value = 0;

    document.getElementById("power").innerHTML = 0;
    document.getElementById("rpm").innerHTML = 0;
    document.getElementById("tor").innerHTML = 0;
    
}