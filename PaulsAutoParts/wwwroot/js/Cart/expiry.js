'use strict';
$(document).ready(function () {
    cartController.setExpiration(
        $("#cartExpires").text()); 
    if (!cartController.isExpired()) {
        let int = setInterval(function () {
            $("#cartExpirationMsg").text(cartController.getMessage());
            if (cartController.isExpired()) {
                clearInterval(int);
                window.location.assign(window.location.href);
            }
        }, 1000);
    }
});