'use strict';
var cartController = (function () {
    let dateExpires;
    function setExpiration(expires) {
        dateExpires = new Date(expires);
    }

    function clearExpiration() {
        dateExpires = null;
    }

    function getLength() {
        if (dateExpires) {
            return dateExpires.getTime() -
                new Date().getTime();
        }
        else {
            return 0;
        }
    }

    function isExpired() {
        if (getLength() <= 0) {
            clearExpiration();
        }
        return (dateExpires === null);
    }

    function getMessage() {
        let length = getLength;
        if (length <= 0) {
            clearExpiration();
            return "Your cart has expired";
        }
        else {
            let minutes = Math.floor(
                (length % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor(
                (length % (1000 * 60)) / 1000);
            return `Your cart expires in  ${minutes} minutes and ${seconds} seconds`;
        }
    }

    return {
        "setExpiration": setExpiration,
        "clearExpiration": clearExpiration,
        "isExpired": isExpired,
        "getMessage": getMessage
    }
})();