myApp.controller('profileController', function($scope, Auth, $location, Profile) {
//*****CHECK AUTH***********//
  $scope.auth = new Auth();
  $scope.auth.load();

  if($scope.auth.onAuth() != true) {
    $location.path('/');
  }
//*********END CHECK AUTH******//
//*********LOADING*********//
  $scope.userLogin = "";
  $scope.userPoints = "";
  $scope.userAbout = "";
  $scope.userSmoking = "";
  $scope.userAlcohol = "";

  $scope.allow = false;

  $scope.prof = new Profile();
  var promiseObj = $scope.prof.load();
  //then - успех, reason - ошибка
  promiseObj.then(function(value) {

    if(value != null) {
      $scope.userLogin = value.login;
      $scope.userSmoking = value.smoking;
      $scope.userAlcohol = value.alcohol;
      $scope.userPoints = value.points;
      $scope.userAbout = value.about;
      $scope.allow = true;
    }
   }, function(reason) {
     console.log(reason);
   });
//**********END LOADING**********//
  $scope.change = function() {
    $scope.prof.change($scope.userLogin, $scope.userSmoking, $scope.userAlcohol, $scope.userPoints, $scope.userAbout);
  };

});
