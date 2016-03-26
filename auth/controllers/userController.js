myApp.controller('userController', function($scope, Auth, $location, $timeout) {

  $scope.auth = new Auth();
  $scope.auth.load();
  if($scope.auth.onAuth() == true) {
    $location.path('/profile');
  }
  //$scope.auth.login("vasya@mail.com", "myName");
  //$scope.auth.register("petr@mail.ru", "petr1234");


//***************LOGIN !!!!!!!**************************//
  $scope.messageLogin = "Error!";
  $scope.successLogin = false;
  $scope.errorLogin = false;
  $scope.login = function() {
    //получение прмисответа после логгирования
    var promiseObj = $scope.auth.login($scope.email, $scope.password);
    //then - успех, reason - ошибка
    promiseObj.then(function(value) {
       $scope.messageLogin = "Success";
       $scope.successLogin = true;
       $scope.errorLogin = false;
       $timeout(function () {
         $location.path('/profile');
       }, 900);

     }, function(reason) {
       $scope.errorLogin = true;
       $scope.successLogin = false;
       if(reason.code == 'INVALID_PASSWORD') {
         $scope.messageLogin = "INVALID_PASSWORD";
       } if (reason.code == "INVALID_USER") {
         $scope.messageLogin = "INVALID_USER";
       }
     });
  };
//*************** END LOGIN !!!!!!!**************************//


//*************** REGISTER !!!!!!!**************************//
  $scope.messageRegister = "Error register";
  $scope.successRegister = false;
  $scope.errorRegister = false;
  $scope.register = function() {
    //получение прмисответа после регистрации
    var promiseObj = $scope.auth.register($scope.email, $scope.password);
    promiseObj.then(function(value) {
      $scope.messageRegister = "Success. Now go Login!";
      $scope.successRegister = true;
      $scope.errorRegister = false;
    }, function(reason) {
      $scope.successRegister = false;
      $scope.errorRegister = true;
      if(reason.code == 'EMAIL_TAKEN') {
        $scope.messageRegister = 'EMAIL_TAKEN';
      }
    });
  };
//*************** END REGISTER !!!!!!!**************************//
});
