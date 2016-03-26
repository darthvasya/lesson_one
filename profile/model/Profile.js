myApp.factory("Profile", function($firebaseObject, $q) {
  var ref = new Firebase("https://radiant-fire-8876.firebaseio.com/");
  function Profile(profData) {

  };
  Profile.prototype = {
      load: function() {
        var user = ref.getAuth();
        var userRef = ref.child('users').child(user.uid);
        var deferred = $q.defer();
        userRef.once('value', function (snap) {
          // code to handle new value
          deferred.resolve(snap.val());
        }, function (err) {
          // code to handle read error
          deferred.reject(err);
        });
        return deferred.promise;
      }
  }

  return Profile;

});
