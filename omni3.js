const PI = Math.PI; //円周率定義

function color_AllGreen(){
    //カラーオールグリーン
    document.getElementById("wheel_name").style.color = "aquamarine";
    document.getElementById("v_x_name").style.color = "aquamarine";
    document.getElementById("v_y_name").style.color = "aquamarine";
    document.getElementById("v_t_name").style.color = "aquamarine";
    document.getElementById("widthL_name").style.color = "aquamarine";
}

function v_t_change(){      //旋回速度が0以外のとき、車体幅を入力できるようにする。
    var v_t = document.getElementById("v_t").value;
    var width_area_ly = document.getElementsByClassName("width");

    if(v_t != 0){
        for(var i=0; i<width_area_ly.length; i++){
            width_area_ly[i].style.display = "block";
        }
    }
    else{
        for(var i=0; i<width_area_ly.length; i++){
            width_area_ly[i].style.display = "none";
        }
    }
}


function calculateBtn(){
    color_AllGreen();
    //---データ取得---//
    var weight = document.getElementById("weight").value;   //0　ok
    var run_res = document.getElementById("run_res").value;
    var me = document.getElementById("me").value;
    var slope = document.getElementById("slope").value; //0 ok
    var wheel = document.getElementById("wheel").value;
    var v_x = document.getElementById("v_x").value;// 0 ok
    var v_y = document.getElementById("v_y").value;// 0 ok
    var v_t = document.getElementById("v_t").value;// 0 ok  単位「°/s」
    var widthL = document.getElementById("widthL").value;

    //---単位取得---//
    var wei_unit = document.getElementById("wei_unit").value;
    var whe_unit = document.getElementById("whe_unit").value;
    var v_x_unit = document.getElementById("v_x_unit").value;
    var v_y_unit = document.getElementById("v_y_unit").value;
    var widthL_unit = document.getElementById("widthL_unit").value;
    var tor_unit = document.getElementById("tor_unit").value;

    //数値に単位組み込み
    weight *= wei_unit;
    run_res *= 0.01;
    me *= 0.01;
    slope *= PI/180;
    wheel *= whe_unit;
    v_x *= v_x_unit;
    v_y *= v_y_unit;
    v_t *= PI/180;  // [°/s] → [rad/s]変換
    widthL *= widthL_unit;

    //各ホイールの周速度を算出
    var v_1 = -(v_x)+widthL*v_t;  
    var v_2 = v_x*Math.cos(PI/3)-v_y*Math.sin(PI/3)+widthL*v_t;
    var v_3 = v_x*Math.cos(PI/3)+v_y*Math.sin(PI/3)+widthL*v_t;
    //各ホイールの回転数(rpm)
    var rpm1 = 60*v_1/(PI*wheel);
    var rpm2 = 60*v_2/(PI*wheel);
    var rpm3 = 60*v_3/(PI*wheel);
    var rpm_total = Math.abs(rpm1)+Math.abs(rpm2)+Math.abs(rpm3);
    //各ホイールの出力(回転数に応じて)
    var power_total = Math.abs((9.81*weight*(Math.sin(slope)+run_res*Math.cos(slope))*(Math.sqrt(v_x**2+v_y**2)))/me);
    var power1 = Math.abs(power_total*(rpm1/rpm_total)); 
    var power2 = Math.abs(power_total*(rpm2/rpm_total));
    var power3 = Math.abs(power_total*(rpm3/rpm_total));
    //各ホイールの負荷トルク(各ホイールの出力に応じて)
    if(v_1==0)
    {
        var tor1=0;
    }
    else
    {
        var tor1 = (power1*wheel*0.5*tor_unit)/v_1;
    }
    if(v_2==0)
    {
        var tor2=0;
    }
    else
    {
        var tor2 = (power2*wheel*0.5*tor_unit)/v_2;
    }
    if(v_3==0)
    {
        var tor3=0;
    }
    else
    {
        var tor3 = (power3*wheel*0.5*tor_unit)/v_3;
    }

    //最大回転数算出
    var MAX_rpm = Math.max.apply(null, [Math.abs(rpm1), Math.abs(rpm2), Math.abs(rpm3)]);
    //最大出力算出
    var MAX_power = Math.max.apply(null, [power1, power2, power3]);
    //最大トルク算出
    var MAX_tor = Math.max.apply(null, [tor1, tor2, tor3]);

    //値チェック
    if(weight==0)
        {
            document.getElementById("weight_name").style.color = "yellow";
        }
    else
        {
            document.getElementById("weight_name").style.color = "aquamarine";
        }   
    
    if(isFinite(MAX_rpm) == false || isFinite(MAX_power) == false || isFinite(MAX_tor) == false)    //エラーメッセージ
    {
        document.getElementById("error_sound").play();

        if(wheel == 0)
        {
            document.getElementById("wheel_name").style.color = "red";
        }

        if(v_x == 0 && v_y == 0)
        {
            document.getElementById("v_x_name").style.color = "red"
            document.getElementById("v_y_name").style.color = "red"
        }
        
        if(v_t != 0 )
        {
            if(widthL == 0){
                document.getElementById("widthL_name").style.color = "red";
            }
        }

        document.getElementById("power").innerHTML = "ERROR";
        document.getElementById("rpm").innerHTML = "ERROR";
        document.getElementById("tor").innerHTML = "ERROR";

        document.getElementById("wheel1_p").innerHTML = "ERROR";
        document.getElementById("wheel2_p").innerHTML = "ERROR";
        document.getElementById("wheel3_p").innerHTML = "ERROR";

        document.getElementById("wheel1_r").innerHTML = "ERROR";
        document.getElementById("wheel2_r").innerHTML = "ERROR";
        document.getElementById("wheel3_r").innerHTML = "ERROR";

        document.getElementById("wheel1_t").innerHTML = "ERROR";
        document.getElementById("wheel2_t").innerHTML = "ERROR";
        document.getElementById("wheel3_t").innerHTML = "ERROR";
    }
    else
    {
        document.getElementById("success_sound").play();    //成功効果音
        color_AllGreen();

        //計算結果表示
        document.getElementById("power").innerHTML = MAX_power.toFixed(4);
        document.getElementById("rpm").innerHTML = MAX_rpm.toFixed(4);
        document.getElementById("tor").innerHTML = MAX_tor.toFixed(4);

        //詳細情報掲示用
        document.getElementById("wheel1_p").innerHTML = power1.toFixed(4);
        document.getElementById("wheel2_p").innerHTML = power2.toFixed(4);
        document.getElementById("wheel3_p").innerHTML = power3.toFixed(4);

        document.getElementById("wheel1_r").innerHTML = rpm1.toFixed(4);
        document.getElementById("wheel2_r").innerHTML = rpm2.toFixed(4);
        document.getElementById("wheel3_r").innerHTML = rpm3.toFixed(4);

        document.getElementById("wheel1_t").innerHTML = tor1.toFixed(4);
        document.getElementById("wheel2_t").innerHTML = tor2.toFixed(4);
        document.getElementById("wheel3_t").innerHTML = tor3.toFixed(4);
    }
}

//---単位切り替え---//
function unit_change(){
    var tor_unit = document.getElementById("tor_unit").selectedIndex;
    calculateBtn();
    switch(tor_unit){
        case 0:
            document.getElementById("t_unit").innerHTML = "[N・m]";
            break;
        case 1:
            document.getElementById("t_unit").innerHTML = "[kg・m]";
            break;
        case 2:
            document.getElementById("t_unit").innerHTML = "[kg・cm]";
            break;
        case 3:
            document.getElementById("t_unit").innerHTML = "[g・cm]";
            break;
    };
}

//---リセットボタン---//
function ResetBtn(){
    document.getElementById("btnsound").play(); //効果音
    color_AllGreen();
    document.getElementById("weight_name").style.color = "aquamarine";

    //数値リセット
    document.getElementById("weight").value = 0;
    document.getElementById("run_res").value = 3;
    document.getElementById("me").value = 80;
    document.getElementById("wheel").value = 0;
    document.getElementById("v_x").value = 0;
    document.getElementById("v_y").value = 0;
    document.getElementById("v_t").value = 0;

    document.getElementById("power").innerHTML = 0;
    document.getElementById("rpm").innerHTML = 0;
    document.getElementById("tor").innerHTML = 0;

    document.getElementById("wheel1_p").innerHTML = 0;
    document.getElementById("wheel2_p").innerHTML = 0;
    document.getElementById("wheel3_p").innerHTML = 0;

    document.getElementById("wheel1_r").innerHTML = 0;
    document.getElementById("wheel2_r").innerHTML = 0;
    document.getElementById("wheel3_r").innerHTML = 0;

    document.getElementById("wheel1_t").innerHTML = 0;
    document.getElementById("wheel2_t").innerHTML = 0;
    document.getElementById("wheel3_t").innerHTML = 0;
    
}