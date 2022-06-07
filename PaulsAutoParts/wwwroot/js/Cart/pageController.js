'use strict';
let pageController = (function () {
    function setCountdown() {
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
    }

    function deleteCartItem(id){
        if (confirm('Delete this Product from Cart?')){
$.ajax({
    url: "/api/ShoppingApi/RemoveFromCart/" +id,
    type: "DELETE"
})
        }
    }
 
    return {
        "setCountdown": setCountdown
    }
})();