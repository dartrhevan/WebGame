function showLoginForm() {
    //$("#authForm").fadeToggle(250);
    if( $("#authForm").css("display") === 'none') {
        const t = $("#authForm").parent().height() / 2 - $("#authForm").height() / 2;
        $("#authForm").animate({
            top: `${t}px`,
            opacity: "1"
        } , 250);
        $("#authForm").css("display" , "block");
        //window.onclick = closeLoginForm;
    }
    else
        closeLogin();
}

function closeLoginForm() {
    if( $("#authForm").css("display") !== 'none')
        closeLogin();
}

function closeLogin() {
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

function sendLogin(e) {
    e.preventDefault();
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
        else showUserName(resp);
    }).catch(e => alert(e));
}

function showUserName(resp) {
    $("#logBut").after(`<a href onclick="showEditForm()">${resp.username}<a/> <a href="/logout">Logout</a>`);
    //alert(resp.username);
    $("#logBut").remove();
    closeLoginForm();
}

function sendRegistration(e) {
    e.preventDefault();
    if($("#regForm input[name='password']").val() !== $("#passConf").val())
    {
        alert("Password and confirm do not equal");
        $("#passConf").focus();
        return;
    }
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: //encodeURI(`username=${$("#loginForm input[name='username']").val()}&&password=${$("#loginForm input[name='password']").val()}`)/*
            JSON.stringify({
                username: $("#regForm input[name='username']").val(),
                password: $("#regForm input[name='password']").val()
            })
    }).then(resp => resp.json()).then(resp => {
        if(!resp.err && resp.res === 'OK')
            alert("Successful registration");
    }).catch(e => alert(e));
}

function showEditForm() {

}
