'use strict';
let pageController = (function () {
    function isMonthYearValid(month, year) {
        let ret = true;
        let currentMonth = new Date().getMonth() + 1;
        if (year == new Date().getFullYear()) {
            ret = month >= currentMonth;
        }
        return ret;
    }
    function addValidationRules() {
        $.validator.addMethod("checkexpmonth", function (value, element) {
            let ret = isMonthYearValid(parseInt(value),
                $("#CustomerCreditCard_ExpYear").val());
            return ret;
        });

        $.validator.addMethod("checkexpyear", function (value, element) {
            let ret = isMonthYearValid($("#CustomerCreditCard_ExpMonth").val(),
                parseInt(value));
            return ret;
        });


        $("form").validate({
            rules: {
                "CustomerCreditCard.ExpMonth": {
                    required: true, checkexpmonth: {
                        depends: function (element) {
                            return $("form").validate().element("#CustomerCreditCard_ExpYear");
                        }
                    }
                },
                "CustomerCreditCard.ExpYear": {
                    required: true,
                    checkexpyear: true
                }
            },
            messages: {
                "CustomerCreditCard.ExpMonth": {
                    checkexpmonth: "Expiration Month/Year Must Be Later Than or equal to Current Month Year"
                },
                "CustomerCreditCard.ExpYear": {
                    checkexpyear: "Expiration Month/Year Must Be Later Than or equal to Current Month Year"
                }
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "CustomerCreditCard.ExpMonth" ||
                    element.attr("name") == "CustomerCreditCard.ExpYear")
                    error.insertAfter("#CustomerCreditCard_ExpMonth");
                else
                    error.insertAfter(element);
            }
        });
    }
    return {
        "addValidationRules": addValidationRules
    }
})();