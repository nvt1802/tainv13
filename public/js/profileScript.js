$(document).ready(function () {
    const url_avatar_default = "http://bootdey.com/img/Content/avatar/avatar6.png";
    $('#edit-info').click(function (e) {
        e.preventDefault();
        var displayname = $('#displayname');
        var location = $('#location');
        var email = $('#email');
        var birthday = $('#birthday');
        var phone = $('#phone');
        var fb = $('#facbook');

        var status = $(this).attr('status');
        if (status == 'close') {
            $(this).attr('status', 'open');
            $(this).text('SAVE');
            displayname.text('');
            displayname.append("<input type='text' name='displayname' id='' value='Nguyễn Văn Tài'>");
            location.text('');
            location.append("<input type='text' name='location' id='' value='Huế'>");
            email.text('');
            email.append("<input type='text' name='email' id='' value='tainguyen6600@gmail.com'>");
            birthday.text('');
            birthday.append("<input type='text' name='birthday' id='' value='18/02/1997'>");
            phone.text('');
            phone.append("<input type='text' name='phone' id='' value='0971962464'>");
            fb.text('');
            fb.append("<input type='text' name='facebook' id='' value='www.facebook.com/tai1802'>");
        } else {
            $(this).attr('status', 'close');
            $(this).text('EDIT');
            displayname.html('Nguyễn Văn Tài');
            location.html('Huế');
            email.html('tainguyen6600@gmail.com');
            birthday.html('18/02/1997');
            phone.html('0971962464');
            fb.html('www.facebook.com/tai1802');
        }
    });

    $('#chooseFile').click(() => {
        $('#upload').click();
    });
    $('input[type="file"').change(() => {
        var ava = $('#avatar2');
        $("#uploadForm").ajaxSubmit({
            error: xhr => {
                ava.attr('src',url_avatar_default);
            },
            success: response => {
                console.log('Response: ', response);
                ava.attr('src',response);
            }
        });
        console.log("-----");
    });
});