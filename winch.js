
function clickBtn1(){    
    // var weight = document.getElementById("weight").value;
    // var me = document.getElementById("me").value;
    // var wheel = document.getElementById("wheel").value;
    // var v_y = document.getElementById("v_y").value;

    var list = document.getElementsByClassName('input-Box');
    //数値チェック
    var check = 0;
    for(var i = 0; i < list.length; i++)
    {
        var e = list[i].value;
        if(e == 0){
            check = 1;
        }
        else{}
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
