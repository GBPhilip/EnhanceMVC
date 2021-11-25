'use strict';

let pageController = (function () {
    function toggleMyAccountMenu() {
        $("#myAccountMenu").toggleClass("d-none");
        $("#maintenanceMenu").addClass("d-none");
    }

    function toggleMaintenanceMenu() {
        $("#maintenanceMenu").toggleClass("d-none");
        $("#myAccountMenu").addClass("d-none");
    }

    return {
        "toggleMyAccountMenu": toggleMyAccountMenu,
        "toggleMaintenanceMenu": toggleMaintenanceMenu
    }
})();