$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

//
$(document).ready(function() {
    // REGISTER DOM ELEMENTS
    const $title = $('#title');
    const $doc = $("#doc");

    // INITIALIZE FIREBASE
    firebase.initializeApp({
        apiKey: "AIzaSyBaEvtMM5S1cfUpPjJGLq9njyxzU6o8al4",
        authDomain: "lbj-contact-file.firebaseapp.com",
        projectId: "lbj-contact-file",
        storageBucket: "lbj-contact-file.appspot.com",
        messagingSenderId: "437851844808",
        appId: "1:437851844808:web:7dd2443a6b20b8b2af35fd",
        measurementId: "G-KLN67RW6HQ"
    });
    console.log("123");
    let db = firebase.firestore();
    let usersRef = db.collection("users");
    // usersRef.add({
    //     "name": "NTUE",
    //     "age": 13,
    //     "tel": {
    //         "tel1": "111-111",
    //         "tel2": "222-111"
    //     }
    // });

    let docRef = usersRef.doc("information");

    docRef.get().then(function(doc) {
        $doc.html(`doc information name = ${doc.data().name}`)
    });

    docRef.set({
        "name": "Alex2",
        "age": 27,
        "tel": {
            "tel1": "111-111",
            "tel2": "222-111"
        }
    });

    console.log("456");
    //REGISTER DOM ELEMENTS\

    let messageCollectionRef = db.collection("users");

    const $name = $('#name');
    const $email = $('#email');
    const $phone = $('#phone');
    const $message = $('#message');

    // LISTEN FOR KEYPRESS EVENT
    $("#submit").click(function(e) {
        // FIELD VALUES
        let sendername = $name.val();
        let email = $email.val();
        let phone = $phone.val();
        let message = $message.val();
        // SAVE DATA TO FIREBASE
        if ((sendername | email | phone | message) == "") {
            alert("填寫資料不正確");
        } else {
            messageCollectionRef.add({
                sendername: sendername,
                email: email,
                phone: phone,
                message: message,
                // timeStamp: data.now(),

            });
            console.log("789");
            $name.val("");
            $email.val("");
            $phone.val("");
            $message.val("");
            alert("送出成功");
        }
    });

});