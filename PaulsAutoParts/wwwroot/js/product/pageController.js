'use strict';
let pageController = (function () {
    function setSearchValues() {
        let searchValues =
            $("#SearchEntity_ProductName").val() +
            $("#SearchEntity_Category").val();
        mainController.setSearchValues(searchValues);
    }

    return {
        "setSearchValues": setSearchValues,
        "setSearchArea": mainController.setSearchArea,
        "isSearchFilledIn": mainController.isSearchFilledIn
    }
})();