function showLoginForm() {
    //$("#authForm").fadeToggle(250);
    if( $("#authForm").css("display") === 'none') {
        const t = $("#authForm").parent().height() / 2 - $("#authForm").height() / 2;
        $("#authForm").animate({
            top: `${t}px`,
            opacity: "1"
        } , 250);
        $("#authForm").css("display" , "block");
    }
    else
        $("#authForm").animate({
            top: "0" ,
            opacity: "0"
        } , 250, () => {
            $("#authForm").css("display" , "none");
        });
}

function choose(event) {
    $("#login").toggleClass("switch");
    $("#login").toggleClass("current-switch");
    $("#signup").toggleClass("switch");
    $("#signup").toggleClass("current-switch");
    $("#loginForm").toggle();
    $("#regForm").toggle();
    event.target.onclick = undefined;
    $(".switch").on('click', choose);
}

function sendLogin() {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: //encodeURI(`username=${$("#loginForm input[name='username']").val()}&&password=${$("#loginForm input[name='password']").val()}`)/*
         JSON.stringify({
            username: $("#loginForm input[name='username']").val(),
            password: $("#loginForm input[name='password']").val()
        })
    }).then(resp => resp.json()).then(resp => {
        if(resp.err)
            alert(resp.err);
        else
            alert(resp.username);
    })
}

function sendRegistration() {

}
