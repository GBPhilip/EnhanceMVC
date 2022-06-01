'use strict';
let pageController = (function () {
    function setSearchValues() {
        let searchValues =
            $("#SearchEntity_ProductName").val() +
            $("#SearchEntity_Category").val();
        mainController.setSearchValues(searchValues);
    }

    function categoryAutoComplete() {
        $("#SelectedEntity_Category").autocomplete({
            source: searchCategories, minLength: 1
        });
    }

    function searchCategories(request, response) {
        $.get("/api/ShoppingApi/SearchCategories/" +
            request.term, function (data) {
                response(data);
            })
            .fail(function (error) {
                console.error(error);
            });
    }

 
    return {
        "setSearchValues": setSearchValues,
        "setSearchArea": mainController.setSearchArea,
        "isSearchFilledIn": mainController.isSearchFilledIn,
        "categoryAutoComplete": categoryAutoComplete
    }
})();