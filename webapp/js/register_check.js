function _checkAccount(){
    if($("#account").val().length <2 || $("#account").val().length >6){
        $('.alert').eq(0).html("用户名不得小于两位且大于六位！");
        $('.alert').eq(0).css('display','block');
        return false;
    }
    else{
        $('.alert').eq(0).html("");
        $('.alert').eq(0).css('display','none');
        return true;
    }
}  
function _checkPass(){
    if($("#password").val().length <6){
        $('.alert').eq(1).html("密码不得小于六位！");
        $('.alert').eq(1).css('display','block');
        return false;
    }else{
        $('.alert').eq(1).html("");
        $('.alert').eq(1).css('display','none');
        return true;
    }
}
function _checkRePass(){
    if($("#password").val().length != $("#repassword").val().length){
        $('.alert').eq(2).html("两次密码输入不一致");
        $('.alert').eq(2).css('display','block');
        return false;
    }else{
        $('.alert').eq(2).html("");
        $('.alert').eq(2).css('display','none');
        return true;
    }
}
