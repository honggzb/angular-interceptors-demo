var app = angular.module('app', ['ngResource']);

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push(HttpInterceptor);
}]);

app.factory('HttpInterceptor', ['$q', HttpInterceptor]);
function HttpInterceptor($q) {
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "8000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  return {
    request: function(config){
      return config;
    },
    requestError: function(err){
      toastr["error"]("请检查您的网络连接情况", "请求发送失败");
      return $q.reject(err);
    },
    response: function(res){
      toastr["success"]("获取列表成功", "完成");
      return $q.resolve(res);
    },
    responseError: function(err){
      if(-1 === err.status) {
        toastr["error"]("远程服务器无响应", "失败");
      } else if(404 === err.status) {
        toastr["error"]("找不到资源", "失败");
      } else {
        toastr["error"]("发生错误，代码：" + err.status , "失败");
      }
      return $q.reject(err);
    }
  };
}

app.controller('CodingController', ['$scope', '$resource', '$timeout', CodingController]);
function CodingController($scope, $resource, $timeout){
  var rHot = $resource("hot.json");
  var rNotFound = $resource("NOT_FOUND.json");
  var r = [rHot, rNotFound];
  $scope.isLoading = false;
  $scope.load = function(){
    if($scope.isLoading) {
      return;
    } else {
      $scope.isLoading = true;
    }
    $scope.list = [];
    $timeout(function(){
      r[ Math.floor( Math.random()*2 )]
      .query(function(data){
        $scope.list = data;
        $scope.isLoading = false;
      }, function(err){
        $scope.isLoading = false;
      });
    }, Math.random() * 2000);
  };
}