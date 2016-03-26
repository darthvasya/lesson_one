myApp.controller('profileController', function($scope, Auth, $location, Profile) {

  $scope.auth = new Auth();
  $scope.auth.load();

  if($scope.auth.onAuth() != true) {
    $location.path('/');
  }

  $scope.userLogin = "";
  $scope.userInt = "";
  $scope.prof = new Profile();
  var promiseObj = $scope.prof.load();
  //then - успех, reason - ошибка
  promiseObj.then(function(value) {
    $scope.userLogin = value.login;
    $scope.userInt = value.int;
   }, function(reason) {

   });
  // Check the current user





   //$scope.auth.addInf("Vasiliy007");


});
