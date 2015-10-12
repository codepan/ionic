/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('gywm-controller',[])
    .controller('GywmCtrl',['$scope','$ionicHistory',function($scope,$ionicHistory){
        $scope.goBack = function(){
            $ionicHistory.goBack();
        }

    }]);
