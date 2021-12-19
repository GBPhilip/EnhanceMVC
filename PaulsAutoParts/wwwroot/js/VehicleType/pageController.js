let pageController = (function () {
    function setSearchValues() {
        let searchValues = $("#SearchEntity_Make").val() +
            $("#SearchEntity_Model").val();
        let year = $("#SearchEntity_Year").val();
        if (year && !year.startsWith("<--")) {
            searchValues += year;
        }
        mainController.setSearchValues(searchValues);
    }

    return {
        "setSearchValues": setSearchValues,
        "setSearchArea": mainController.setSearchArea,
        "isSearchFilledIn": mainController.isSearchFilledIn
    }
})();