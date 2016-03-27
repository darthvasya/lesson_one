myApp.controller('meetingsController', function($scope, Meet, Profile) {

  $scope.meets = new Meet();
  $scope.meets.load();

  //*********LOADING*********//
    $scope.userLogin = "";
    $scope.userPoints = "";
    $scope.userAbout = "";
    $scope.userSmoking = "";
    $scope.userAlcohol = "";



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

      }
     }, function(reason) {
       console.log(reason);
     });
  //**********END LOADING**********//
  $scope.allow = false;

  $scope.createMeet = function() {
    $scope.meets.createMeet($scope.meetTitle,
                            $scope.meetTime,
                            $scope.meetPlace,

                            $scope.userLogin,
                            $scope.userPoints,
                            $scope.userAbout,
                            $scope.userSmoking,
                            $scope.userAlcohol);
    //$location.path('/meet');
    //$scope.allow = true;
  };


});
