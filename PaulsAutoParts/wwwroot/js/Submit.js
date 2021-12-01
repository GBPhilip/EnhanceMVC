'use strict';
$(document).ready(function () {
    $("form").submit(function () {
        mainController.pleaseWait(this);
    });
});