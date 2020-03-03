
function toggleMenu() {
    const form = 'section';
    if($(form).css("display") === 'none') {
        //const t = $(form).parent().height() / 2 - $(form).height() / 2;
        $(form).animate({
            left: "60%",
            opacity: "1"
        } , 250);
        $(form).css("display" , "block");
    }
    else
        $(form).animate({
            left: "100%",
            opacity: "0"
        } , 250, () =>  $(form).css("display" , "none"));
}


function showLoginForm() {
    toggleForm("#authForm");
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
    $("#logBut").after(`<a href onclick="showEditForm(event)">${resp.username}<a/> <a href="/logout">Logout</a>`);
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

function showEditForm(event) {
    event.preventDefault();
    $("#editForm input[name='username']").val(event.target.text);
    toggleForm("#editForm");
}

function sendEdit(event) {
    event.preventDefault();
    const newPass = $("#editForm input[name='password']").val();
    const passConf = $("#newPassConf").val();
    if(passConf && newPass && newPass !== passConf)
    {
        alert("Password and confirm do not equal");
        $("#newPassConf").focus();
        return;
    }
    fetch('/edit_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:
            JSON.stringify({
                username: $("#editForm input[name='username']").val(),
                password: newPass,
                oldPassword: $("#editForm input[name='oldPassword']").val()
            })
    }).then(resp => resp.json()).then(resp => {
        if(!resp.err && resp.res === 'OK')
            alert("Successful registration");
    }).catch(e => alert(e));
}

function toggleForm(form) {
    if( $(form).css("display") === 'none') {
        const t = $(form).parent().height() / 2 - $(form).height() / 2;
        $(form).animate({
            top: `${t}px`,
            opacity: "1"
        } , 250);
        $(form).css("display" , "block");
    }
    else
        $(form).animate({
            top: "0" ,
            opacity: "0"
        } , 250, () =>  $(form).css("display" , "none"));
}

function showLeaderBoard()
{
    if($("#leaderBoard").css('display') === 'none')
    fetch('/get_records')
        .then(resp => resp.json())
        .then(rec => {
            $('#list').empty();
            $("#list").append('<div>Username</div><div>Scores</div><div>Date</div>');
            rec.forEach(r => $('#list').append(`<div>${r.username}</div><div>${r.scores}</div><div>${r.date}</div>`));
            toggleForm("#leaderBoard");
        })
        .catch(e => console.log(e));
    else
        toggleForm("#leaderBoard");
}

