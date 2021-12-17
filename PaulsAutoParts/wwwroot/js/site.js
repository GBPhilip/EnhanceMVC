// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
'use strict';
var mainController = (function () {
    let searchValues = null;
    function disableAllClicks() {
        $("a").css("cursor", "arrow").click(false);
        $("input[type='button']").attr("diasabled", "disabled");
        $("button").attr("diasabled", "disabled");
    }
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
        disableAllClicks();
    }
    function formSubmit() {
        $("form").submit(function () {
            pleaseWait(this);
        });
    }

    function setSearchValues(value) {
        searchValues = value;
    }

    function isSearchFilledIn() {
        return searchValues;
    }

    function setSearchArea() {
        $("#searchBody").collapse(isSearchFilledIn() ? "show" : "hide");
    }

    return {
        "pleaseWait": pleaseWait,
        "disableAllClicks": disableAllClicks,
        "formSubmit": formSubmit,
        "setSearchValues": setSearchValues,
        "isSearchFilledIn": isSearchFilledIn,
        "setSearchArea": setSearchArea
    }
})();


