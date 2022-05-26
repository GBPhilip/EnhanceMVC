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
            if ($("form").valid()) {
                pleaseWait(this);
            }
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

    function modifyItemsInCartText(isAdding) {
        let value = $("#itemsInCart").text();
        let count = 0;
        let pos = 0;
        pos = value.indexOf(" ");
        count = parseInt(value.substring(0, pos));
        if (isAdding) {
            count++;
        }
        else {
            count--;
        }
        value = count.toString() + " " + value.substring(pos);
        $("#itemsInCart").text(value);
    }

    return {
        "pleaseWait": pleaseWait,
        "disableAllClicks": disableAllClicks,
        "formSubmit": formSubmit,
        "setSearchValues": setSearchValues,
        "isSearchFilledIn": isSearchFilledIn,
        "setSearchArea": setSearchArea,
        "modifyItemsInCartText": modifyItemsInCartText
    }
})();


