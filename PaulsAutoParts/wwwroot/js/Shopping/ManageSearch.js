'use strict';
$(document).ready(function () {
    $("#yearMakeModel")
        .on("shown.bs.collapse", function () {
            $("#nameCategory").collapse("hide");
        });
    $("#nameCategory")
        .on("shown.bs.collapse", function () {
            $("#yearMakeModel").collapse("hide");
        });
});
