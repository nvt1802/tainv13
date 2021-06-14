$(document).ready(function () {
    $('#content-message').scrollTop($('#content-message')[0].scrollHeight);
});
var flag = true;
$(function () {
    //Kết nối tới server socket đang lắng nghe
    var socket = io.connect('http://localhost:8080');
    socket.on('connect', function () {
        console.log('socket connected. Authenticating...');
        socket
            .emit('authenticate', { token: localStorage.getItem('accessToken') }) //send the jwt
            .on('authenticated', function () {
                console.log('Socket authenticated')
                //do other things
            })
            .on('unauthorized', function (msg) {
                console.log("unauthorized: " + JSON.stringify(msg.data));
                throw new Error(msg.data.type);
            })
    });
    //Socket nhận data và append vào giao diện
    socket.on("send", function (data) {
        var time = new Date(data.time);
        var hours = (time.getHours() < 10) ? '0' + time.getHours() : time.getHours();
        var minutes = (time.getMinutes() < 10) ? '0' + time.getMinutes() : time.getMinutes();
        $('#content-message').append("<li class='you'><div class='entete'><span class='status green'></span><h2>" + data.username + "</h2><h3>" + "Hôm nay, " + hours + ":" + minutes + "</h3></div><div class='triangle'></div><div class='message'>" + data.message + "</div></li>");
        $('#content-message').scrollTop($('#content-message')[0].scrollHeight);
    });

    socket.on("typing", function (data) {
        $('#content-message').append("<li id='re-typing' class='you'><div class='entete'><span class='status green'></span><h2>" + data.username + "</h2></div><div class='message' style='width: 100%'><span class='container-typing'><span class='circle'></span><span class='circle'></span><span class='circle'></span></span></div></li>");
        $('#content-message').scrollTop($('#content-message')[0].scrollHeight);
    });

    socket.on('no_typing', (data) => {
        $('#re-typing').remove();
    });

    //Bắt sự kiện click gửi message
    $("#sendMessage").on('click', function (e) {
        e.preventDefault();
        var username = $('#username').val();
        var message = $('#message').val();
        var time = new Date();
        var hours = (time.getHours() < 10) ? '0' + time.getHours() : time.getHours();
        var minutes = (time.getMinutes() < 10) ? '0' + time.getMinutes() : time.getMinutes();
        if (message == '') {
            return $('#message').focus();
        } else {
            //Gửi dữ liệu cho socket
            socket.emit('send', { username: username, message: message, time: new Date() });
            $("#content-message").append("<li class='me'><div class='entete'><h3>" + "Hôm nay, " + hours + ":" + minutes + "</h3>&nbsp;&nbsp;&nbsp;<h2>" + username + "</h2><span class='status blue'></span></div><div class='triangle'></div> <div class='message'>" + message + "</div></li>");
            $('#content-message').scrollTop($('#content-message')[0].scrollHeight);
            $('#message').val('');
        }
    });

    $('#message').on('focusin', () => {
        var username = $('#username').val();
        socket.emit('typing', { username: username });
    });

    $('#message').on('focusout', () => {
        var username = $('#username').val();
        socket.emit('no_typing', { username: username });
    });

})