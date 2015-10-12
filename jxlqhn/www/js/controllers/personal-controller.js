/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('personal-controller',[])
    .controller('PersonalCtrl',['$scope','$ionicPopup', '$state', function($scope, $ionicPopup, $state){

        $scope.isOne = false;
        $scope.isTwo = false;
        $scope.show = function(subModalIndex){
            if(subModalIndex==1){//我的登记
                $scope.isOne = true;
                $scope.isTwo = false;
            }else{//我的信息
                $scope.isOne = false;
                $scope.isTwo = true;

                //获取当前session中的user(即当前登录的用户)
                $scope.user = JSON.parse(sessionStorage.getItem("user"));

            }
            $scope.tab = subModalIndex;
        };

        $scope.show(1);


        // 确认弹出框
        $scope.showConfirm = function() {
            $ionicPopup.confirm({
                title: "确认退出当前登录？",
                okText:"确认",
                cancelText:"取消"
            })
                .then(function(res) {
                    if(res) {
                        $state.go('login');
                    } else {
                       return false;
                    }
                });
        };


    }]);
