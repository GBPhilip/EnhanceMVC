'use strict';
$(document).ready(function () {
    pageController.addValidationRules();
    pageController.makesAutoComplete();
    mainController.formSubmit();

    pageController.setSearchValues();
    pageController.setSearchArea();
});