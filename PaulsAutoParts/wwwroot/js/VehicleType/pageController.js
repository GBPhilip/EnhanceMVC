let pageController = (function () {
    function addValidationRules() {
        let maxYear = new Date().getFullYear() + 2;
        $.validator.addMethod("yearplusone",
            function (value, element) {
                return this.optional(element) || value < (maxYear);
            });
        $("form").validate({
            rules: {
                "SelectedEntity.Year": {
                    yearplusone: true
                }
            },
            messages: {
                "SelectedEntity.Year": {
                    yearplusone: "Year must be before " +
                        maxYear
                }
            }
        });
    }
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
        "isSearchFilledIn": mainController.isSearchFilledIn,
        "addValidationRules": addValidationRules
    }
})();