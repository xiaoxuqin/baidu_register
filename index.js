var $username = $('#username'),
    $tel = $('#tel'),
    $pwd = $('#pwd'),
    $getcode = $('#getcode'),
    $code = $('#code'),
    $tel_message = $('#tel-validation-message'),
    $regist = $('#regist'),
    $tip1 = $('#tip1'),
    $tip2 = $('#tip2'),
    $mark = $('#mark');
var $pwdclick = 0;

/**username */
$username.focusout(function () {
    $tip1.css('display','none');
    if (!validate('#username')) {
        $tip1.css('display','none');
        $username.select();
    }
})
$username.focus(function () {
    $tip1.css('display','block');
})
/**tel */
$tel.focusout(function () {
    if (!validate('#tel')) {
        $tel.select();
    }
})
/**password */
$pwd.focusout(function () {
    $pwdclick++;
    $tip2.css('display','none');
    if (!validate('#pwd')) {
        $tip2.css('display','none');
        $pwd.select();
    }
})
$pwd.focus(function(){
    $tip2.css('display','block');
})
$mark.mouseover(function(){
    $mark.css('color','#2E58FF');
    $mark.css('border','1px #2E58FF solid');
    $tip2.css('display','block');
})
$mark.mouseout(function(){
    $mark.css('color','gray');
    $mark.css('border','1px gray solid');
})

function validate(field) {
    var $data = $(field);
    var $msg = $(field + '-validation-message');
    if (field === '#username' && $data.val()) {
            if(/[\u4e00-\u9fa5]/.test($data.val())){
                var $allLength = $data.val().length;
                var $ChineseLength = ($data.val()).match(/[\u4e00-\u9fa5]/g).length;
                var $length = $ChineseLength + $allLength;
                if ($length > 14) {
                    $msg.html('用户名不能超过7个汉字或14个字符');
                    return false;
                } 
            } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]*$/.test($data.val()) || /^[0-9]*$/.test($data.val()) && $data.val()) {
                $msg.html('用户名仅支持中英文、数字和下划线，且不能为纯数字');
                return false;
            }    
    }
    if (field === '#tel') {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test($data.val()) && $data.val()) {
            $msg.html('手机号码格式不正确');
            return false;
        }
    }
    if (field === '#pwd') {
        // 不为空且不匹配   或   focusout后仍为空
        if ((!/^(?![\d]+$) (?![a-zA-Z]+$) (?![!#$%^&*]+$) [\da-zA-Z!#$%^&*]{8,14}$/.test($data.val()) && $data.val()) 
            || (!$data.val() && $pwdclick) ) {
            $msg.html('密码设置不符合要求');
            return false;
        }
    }
    $msg.html('');
    return true;
}
/**点击发送验证码效果 */
$getcode.click(function () {
    if (!$tel.val()) {
        $tel_message.html('请您输入手机号');
        $tel.select();
    } else if (validate('#tel')) {
        $code.attr('placeholder', '你输什么都对');
        $getcode.val('重发验证（15s）');
        var num = 15;
        var timer = setInterval(function () {
            $getcode.attr('disabled', 'disabled');
            num--;
            if (num === 0) {
                clearInterval(timer);
                $getcode.removeAttr('disabled');
                $getcode.val('获取验证码');
                $code.attr('placeholder', '请输入验证码');
            } else {
                $getcode.val('重发验证（' + num + 's' + '）');
            }
        }, 1000);
    }
});
/**register */
document.addEventListener("keyup", function () {
    if ($username.val() && $tel.val() && $pwd.val() && $code.val()) {
        $regist.css("background-color", "#2E58FF");
    } 
    else {
        $regist.css("background-color", "#BDCEFC");
    }
})
$regist.click(function(){
    if(validate('#username') && validate('#tel') && validate('#pwd') && $code.val()){
        alert('恭喜您，注册成功！');
    } 
})