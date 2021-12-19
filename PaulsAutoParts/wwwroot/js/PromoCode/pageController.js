let pageController = (function () {
    function setSearchValues() {
        let searchValues =
            $("#SearchEntity_Code").val();
        mainController.setSearchValues(searchValues);
    }

    return {
        "setSearchValues": setSearchValues,
        "setSearchArea": mainController.setSearchArea,
        "isSearchFilledIn": mainController.isSearchFilledIn
    }
})();