/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('zcgs-controller',[])
    .controller('ZcgsCtrl',['$scope','$timeout','$data', function($scope, $timeout, $data){

        $scope.items = [];
        $scope.pagination = config.pagination;

        $scope.isHaveMoreData = true;

        $scope.loadMore = function(){
            $data.findAll("zcgs",{pageSize:$scope.pagination.pageSize,currentPage:$scope.pagination.currentPage++})
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

    .controller('ZcgsDetailCtrl', ['$scope', '$stateParams', '$data', function($scope, $stateParams, $data){
       // $scope.detailData = $data.find("Zcgs", {id:$stateParams.id});
    }]);
