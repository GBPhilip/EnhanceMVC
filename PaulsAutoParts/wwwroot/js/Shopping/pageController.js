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

    function modifyCart(id, ctl) {
        if (Boolean($(ctl).data("isadding"))) {
            addToCart(id);

            $(ctl).text("Remove from cart");
            $(ctl).data("isadding", false);
            $(ctl).removeClass("btn-info")
                .addClass("btn-danger");
        }
        else {
            removeFromCart(id);
            $(ctl).text("Add to cart");
            $(ctl).data("isadding", true);
            $(ctl).removeClass("btn-danger")
                .addClass("btn-info");
        }
    }

    function addToCart(id) {
        let settings = {
            url: "/api/ShoppingApi/AddToCart",
            contentType: "application/json",
            data:JSON.stringify(id)
        }
        $.post(settings)
            .done(function (data) {
                console.log("Product Added to Shopping Cart");
            })
            .fail(function (error) {
                console.error(error);
            });
    }

    function removeFromCart(id) {

    }
    return {
        "setSearchArea": setSearchArea,
        "modifyCart": modifyCart
    }

})();

$(document).ready(function () {
    pageController.setSearchArea();
});