/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('main-controller',[])
    .controller('MainCtrl',['$scope', '$timeout', '$ionicLoading',  '$data',function($scope, $timeout, $ionicLoading,  $data){
        $scope.items = [];
        $scope.pagination = {
          pageSize:10,
            currentPage:1
        };

        $scope.isHaveMoreData = true;

        $scope.loadMore = function(){
            $data.findAll("main",{pageSize:$scope.pagination.pageSize,currentPage:$scope.pagination.currentPage++})
                .success(function(data){
                    if(data == null){
                        $scope.isHaveMoreData = false;
                        return;
                    }

                    $scope.items = $scope.items.concat(data);

                })
                .finally(function(){
                    $timeout(function(){
                        $scope.$broadcast("scroll.infiniteScrollComplete");
                    },2000);
                });
        };

        $scope.$on("stateChangeSuccess",function(){
                $scope.loadMore();
        });






    }])
    .controller('MainDetailCtrl',['$scope','$stateParams', '$data', function($scope, $stateParams , $data){
        console.log($stateParams.id);
        $data.findById("main",$stateParams.id)
            .success(function(data){
                console.log(data);
                $scope.detailData = data;

               // &lt;p&gt;
            })
            .error(function(){

            });
    }]);
