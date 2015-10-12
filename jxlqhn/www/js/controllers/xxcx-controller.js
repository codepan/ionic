/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('xxcx-controller',[])
    .controller('XxcxCtrl',['$scope',  '$ionicModal','$timeout', '$data', function($scope, $ionicModal, $timeout, $data){

        $scope.items4LQLZ = [];
        $scope.items4LQDY = [];
        $scope.pagination ={
            pageSize:10,
            currentPage:1
        };

        $scope.pagination1 = {
            pageSize:10,
            currentPage:1
        };
        $scope.tabIndex = '林权流转登记';

        $scope.isOne = false;
        $scope.isTwo = false;

        $scope.showTab = function(tabIndex){
            if(tabIndex=='林权流转登记'){
                $scope.isOne = true;
                $scope.isTwo = false;
            }else{
                $scope.isHaveMoreData = true;
                $scope.isOne = false;
                $scope.isTwo = true;
            }
            $scope.tabIndex = tabIndex;
        };

        $scope.showTab($scope.tabIndex);


        $scope.isHaveMoreData = true;

        //加载更多林权流转
        $scope.loadMoreLQLZ = function(){
            console.log( $scope.isHaveMoreData);
            $data.findAll("xxcx",{pageSize:$scope.pagination.pageSize,currentPage:$scope.pagination.currentPage++,cxlx:'林权流转登记'})
                .success(function(data){
                    if(data == null){
                        $scope.isHaveMoreData = false;
                        return;
                    }

                    $scope.items4LQLZ = $scope.items4LQLZ.concat(data);

                })
                .finally(function(){
                    $timeout(function(){
                        $scope.$broadcast("scroll.infiniteScrollComplete");
                    },2000);
                });
        };

        //加载更多林权抵押
        $scope.loadMoreLQDY= function(){
            $data.findAll("xxcx",{pageSize:$scope.pagination1.pageSize,currentPage:$scope.pagination1.currentPage++,cxlx:'林权抵押登记'})
                .success(function(data){
                    if(data == null){
                        $scope.isHaveMoreData = false;
                        return;
                    }

                    $scope.items4LQDY = $scope.items4LQDY.concat(data);

                })
                .finally(function(){
                    $timeout(function(){
                        $scope.$broadcast("scroll.infiniteScrollComplete");
                    },2000);
                });
        };



        $scope.$on("stateChangeSuccess",function(){
            $scope.loadMoreLQLZ();
            $scope.loadMoreLQDY();

        });


        $ionicModal.fromTemplateUrl("templates/search-modal-xxcx.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal = modal;
        });


        $scope.openModal = function() {
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

        //多条件查询供求信息
        $scope.queryConditions = {releaseTime:"",publisher:"",type:""};
        $scope.findByConditions = function() {
            $data.findByConditions("gqpt",$scope.queryConditions)
                .success(function(data){
                    $scope.items = data;
                })
                .finally(function(data){
                    $timeout(function(){
                        $scope.$broadcast("scroll.infiniteScrollComplete");
                    },2000);
                });
        };

    }])

.controller('XxcxDetailCtrl', ['$scope', '$stateParams', '$data', function($scope, $stateParams, $data){
        $data.findById("xxcx",$stateParams.id)
            .success(function(data){
                console.log(data);
                $scope.detailData = data;
            })
            .error(function(){

            });
    }]);
