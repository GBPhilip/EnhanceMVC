'use strict';
let pageController = (function () {
    let searchYearModelModel = null;
    let searchNameCategory = null;
    function setSearchArea() {
        $("#yearMakeModel").on("shown.bs.collapse", function () {
            $("#nameCategory").collapse("hide");
        });
        $("#nameCategory").on("shown.bs.collapse", function () {
            $("#yearMakeModel").collapse("hide");
        });

        setYearMakeModel();

        setProductNameCategory();
    }

    function setYearMakeModel() {
        let value = "hide";
        let searchValues =
            $("#SearchEntity_Make option").length +
            $("#SearchEntity_Model option").length;
        if (searchValues > 0) {
            value = "show";
        }
        $("#yearMakeModel").collapse(value);
    }

    function setProductNameCategory() {
        let value = "hide";
        if ($("#SearchEntity_ProductName").val()) {
            value = "show";
        }
        else {
            if ($("#SearchEntity_Category option").length > 0) {
                if ($("#SearchEntity_Category").prop("selectedIndex") > 0) {
                    value = "show";
                }
            }
        }
        $("#nameCategory").collapse(value);
    }

    return {
        "setSearchArea": setSearchArea
    }
})();

$(document).ready(function () {
    pageController.setSearchArea();
});