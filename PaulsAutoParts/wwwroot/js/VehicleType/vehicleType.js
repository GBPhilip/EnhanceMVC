'use strict';
$(document).ready(function () {
    pageController.addValidationRules();
    pageController.makesAutoComplete();
    pageController.modelsAutoComplete();
    mainController.formSubmit();

    pageController.setSearchValues();
    pageController.setSearchArea();
});