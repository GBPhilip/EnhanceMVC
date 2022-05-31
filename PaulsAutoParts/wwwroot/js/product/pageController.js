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

    function searchMakes(request, response) {
        $.get("/api/VehicleTypeApi/SearchMakes/" +
            request.term, function (data) {
                response(data);
            })
            .fail(function (error) {
                console.error(error);
            });
    }

    function searchModels(request, response) {
        let year = $("#SelectedEntity_Year").val();
        let make = $("#SelectedEntity_Make").val();

        if (make) {
            $.get("/api/VehicleTypeApi/SearchModels/" + year + "/" +
                make + "/" + request.term, function (data) {
                    response(data);
                })
                .fail(function (error) {
                    console.error(error);
                });
        }
        else {
            searchModels(request, response);
        }
    }


    return {
        "setSearchValues": setSearchValues,
        "setSearchArea": mainController.setSearchArea,
        "isSearchFilledIn": mainController.isSearchFilledIn,
        "categoryAutoComplete": categoryAutoComplete
    }
})();