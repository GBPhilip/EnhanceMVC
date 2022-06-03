'use strict';
$(document).ready(function () {
    mainController.formSubmit();

    pageController.addValidationRules();

    pageController.setSearchValues();
    pageController.setSearchArea();
});