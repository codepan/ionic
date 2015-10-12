/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('gqpt-controller',[])
    .controller('GqptCtrl',['$scope',  '$ionicModal','$timeout','$ionicLoading',  '$data', function($scope, $ionicModal,$timeout,$ionicLoading,  $data){
        $scope.items = [];
        var pagination = $scope.pagination = {
            pageSize:10,
            currentPage:1
        };//获取分页信息

        var pagination1 = $scope.pagination1 = {
            pageSize:10,
            currentPage:0
        };


        $scope.isHaveMoreData = true;//是否还有更多数据，true:显示加载更多图标，后台获取数据；false:隐藏加载等多图标，不再像后台请求数据

        $scope.isFindByConditions = false;//标记当前用户是否为组合条件查询页面,true:加载更多时调用根据多条件查询数据；false：加载更多时不需要带条件进行查询

        //加载更多
        $scope.loadMore = function(){
            if(!! $scope.isFindByConditions){
                $scope.findByConditions();
            }else{
                $scope.findAll();
            }

        };


        //无条件分页查询
        $scope.findAll = function(){
            $scope.isFindByConditions = false;
            $data.findAll("gqpt",{pageSize:$scope.pagination.pageSize,currentPage:$scope.pagination.currentPage++})
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

        //组合条件分页查询
        $scope.queryConditions = {releaseTime:"",publisher:"",type:"",pageSize:pagination1.pageSize,currentPage:pagination1.currentPage};//
        $scope.findByConditions = function() {
            $scope.queryConditions.currentPage++;
            console.log( $scope.queryConditions);

            $scope.isFindByConditions = true;
            $data.findByConditions("gqpt",$scope.queryConditions)
                .success(function(data){
                    console.log(data);
                    $scope.closeModal();
                    if(data == null){
                        $scope.isHaveMoreData = false;
                        return;
                    }

                    $scope.items = data;

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


        $ionicModal.fromTemplateUrl("templates/search-modal-gqpt.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal = modal;
        });


        $scope.openModal = function() {
            console.log("{{}}",pagination1.currentPage);
            $scope.queryConditions.currentPage = 0;
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.removeModal = function() {
            $scope.modal.remove();
        };
        //Cleanup the modal when we are done with it!
        $scope.$on("$destroy", function() {
            console.log('modal.$destroy');
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on("modal.hidden", function() {
            // Execute action
            console.log('modal.hidden');
        });
        // Execute action on remove modal
        $scope.$on("modal.removed", function() {
            // Execute action
            console.log('modal.removed');
        });

    }])

    .controller('GqptDetailCtrl', ['$scope', '$stateParams' ,'$data', function($scope, $stateParams, $data){
        $data.findById("gqpt",$stateParams.id)
            .success(function(data){
                console.log(data);
                $scope.detailData = data;

            })
            .error(function(){

            });
    }]);

