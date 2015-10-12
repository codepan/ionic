/**
 * Created by zhoupan on 2015/9/23.
 */
angular.module('phoneNumberFilter', [])
    .filter('phoneNumberFilter', function() {
        return function(input) {
            return input.replace(/tank/, "=====")
        };
    });