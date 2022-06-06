'use strict';
let pageController = (function () {
    function addValidationRules() {
        $.validator.addMethod("nonumbers", function (value, element) {
            return this.optional(element) || /^([^0-9]*)$/.test(value);
        });

        $("form").validate({
            rules: {
                "SelectedEntity.FirstName": {
                    nonumbers: true
                },
                "SelectedEntity.LastName": {
                    nonumbers: true
                }
            },
            messages: {
                "SelectedEntity.FirstName": {
                    nonumbers: "First name may not have numbers in it"
                },
                "SelectedEntity.LastName": {
                    nonumbers: "Last  name may not have numbers in it"
                }
            }

        });

    }
    function setSearchValues() {
        let searchValues = $("#SearchEntity_LastName").val();
        mainController.setSearchValues(searchValues);
    }
    function deleteCustomer(id) {
        if (confirm('Delete this customer?')) {
            $.ajax({
                url: "/api/CustomerMaintApi/Delete/" + id,
                type: "Delete"
            })
                .done(function (data) {
                    if (data) {
                        $("#" + id).remove();
                    }
                })
                .fail(function (error) {
                    console.error(error);
                });
        }
    }

    function calculateNewTotal() {

    }
    return {
        "setSearchValues": setSearchValues,
        "setSearchArea": mainController.setSearchArea,
        "isSearchFilledIn": mainController.isSearchFilledIn,
        "addValidationRules": addValidationRules,
        "deleteCustomer": deleteCustomer
    }
})();