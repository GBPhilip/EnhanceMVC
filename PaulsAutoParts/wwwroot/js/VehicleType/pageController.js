'use strict';
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

    function modelsAutoComplete() {
        $("#SelectedEntity_Model").autocomplete({
            source: searchModels, minLength: 1
        });
    }

    function makesAutoComplete() {
        $("#SelectedEntity_Make").autocomplete({
            source: searchMakes, minLength: 1
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
        "addValidationRules": addValidationRules,
        "makesAutoComplete": makesAutoComplete
    }
})();