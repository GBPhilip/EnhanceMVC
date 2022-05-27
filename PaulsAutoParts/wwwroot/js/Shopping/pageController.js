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
            data: JSON.stringify(id)
        }
        $.post(settings)
            .done(function (data) {
                mainController.modifyItemsInCartText(true);
                console.log("Product Added to Shopping Cart");
            })
            .fail(function (error) {
                console.error(error);
            });
    }

    function removeFromCart(id) {
        $.ajax({
            url: "/api/ShoppingApi/RemoveFromCart/" + id,
            type: "DELETE"
        })
            .done(function (data) {
                mainController.modifyItemsInCartText(false);
                console.log("Product Removed From Shpping Cart");
            })
            .fail(function (error) {
                console.error(error);
            });

    }

    function getMakes(ctl) {
        let year = $(ctl).val();
        let elem = $("#SearchEntity_Make");

        elem.empty();

        $("#SearchEnity_Model").empty();

        $.get("api/ShoppingApi/GetMakes/" +
            year, function (data) {
            $(data).each(function () {
                console.log(`${this}`);
                elem.append(`<option>${this}</option>`);
                console.log(`${elem}`);
                });
            })
            .fail(function (error) {
                console.error(error);
            });
    }

    function getModels(ctl) {
        let year = $("#SearchEntity_Year").val();

        let model = $(ctl).val();
        let elem = $("#SearchEntity_Model");

        elem.empty();

        $("#SearchEnity_Model").empty();

        $.get("api/ShoppingApi/GetModels/" +
            year +"/"+ model, function (data) {
                $(data).each(function () {
                    elem.append(`<option>${this}</option>`);
                });
            })
            .fail(function (error) {
                console.error(error);
            });
    }

    return {
        "setSearchArea": setSearchArea,
        "modifyCart": modifyCart,
        "getMakes": getMakes,
        "getModels": getModels
    }

})();

$(document).ready(function () {
    pageController.setSearchArea();
});