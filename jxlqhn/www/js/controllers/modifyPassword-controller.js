/**
 * Created by zhoupan on 2015/9/14.
 */
angular.module('modifyPassword-controller',[])

    .controller('ModifyPasswordCtrl',['$scope', '$ionicPopup', '$timeout', '$state',  '$data', function($scope, $ionicPopup, $timeout, $state, $data) {
        $scope.formUser = {};

        //执行用户登录操作
        $scope.doModify = function(){
             $data.modifyPassword("user", this.formUser).success(function(data){
                 if(data == null){
                     $scope.showErrorMesPopup("不存在该用户");
                 }else{
                     $scope.showSuccessMesPopup("正在修改请稍后");
                     $state.go("login");
                 }

          });
        };

        $scope.showErrorMesPopup = function(title) {
            var myPopup = $ionicPopup.show({
                title: '<b>'+title+'</b>'
            });
            $timeout(function() {
                myPopup.close(); // 2秒后关闭
            }, 1000);
        };

        $scope.showSuccessMesPopup = function(title) {
            var myPopup = $ionicPopup.show({
                title: '<b>'+title+'</b>',
                template: '<p style="text-align: center"><ion-spinner icon="android" class="spinner-positive"></ion-spinner></p>'
            });
            $timeout(function() {
                myPopup.close(); // 2秒后关闭
                $state.go("tab.main");
            }, 2000);
        };
    }]);
