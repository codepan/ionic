/**
 * Created by zhoupan on 2015/9/14.
 */
angular.module('login-controller',[])

    .controller('LoginCtrl',['$scope', '$ionicPopup', '$timeout', '$state',  '$data', function($scope, $ionicPopup, $timeout, $state, $data) {
        $scope.formUser = {};

        //执行用户登录操作
        $scope.doLogin = function(){
             $data.login("user", this.formUser).success(function(data){
                 if(data == null){
                     $scope.showErrorMesPopup("手机号或密码错误");
                 }else{
                     $scope.showSuccessMesPopup("正在登录请稍后");
                     console.log(data);
                     var user = JSON.stringify(data);
                     sessionStorage.setItem("user",user);
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
