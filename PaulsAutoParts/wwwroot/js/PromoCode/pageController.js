'use strict';
let pageController = (function () {
    function setSearchValues() {
        let searchValues =
            $("#SearchEntity_Code").val();
        mainController.setSearchValues(searchValues);
    }

    function addValidationRules() {
        $("form").validate({
            rules: {
                "SelectedEntity.PromotionalCode": {
                    required: true,
                    remote: function () {
                        return {
                            url: "/api/PromoCodeApi/DoesCodeExist/" +
                                $("#SelectedEntity_PromotionalCode").val(),
                            type: "get"
                        };
                    }
                }
            },
            messages: {
                "SelectedEntity.PromotionalCode": {
                    required: "Promotional Code must be filled in.",
                    remote: "Promotion Code already exists. Please use a new code"
                }
            }
        });
    }

    return {
        "setSearchValues": setSearchValues,
        "setSearchArea": mainController.setSearchArea,
        "isSearchFilledIn": mainController.isSearchFilledIn,
        "addValidationRules": addValidationRules
    }
})();