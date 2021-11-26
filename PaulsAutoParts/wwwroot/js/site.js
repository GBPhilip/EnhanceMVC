// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
'use strict';
var mainController = (function () {
    function pleaseWait(ctl) {
        if (ctl) {
            let msg = $(ctl).data("waitmsg");
            if (msg) {
                $("#theWaitMessage").html(msg)
            }
        }
        $("#pleaseWait").removeClass("d-none");
        $("header").addClass("pleaseWaitArea");
        $("main").addClass("pleaseWaitArea");
        $("footer").addClass("pleaseWaitArea");
    }
    return {
        "pleaseWait": pleaseWait
    }
})();


