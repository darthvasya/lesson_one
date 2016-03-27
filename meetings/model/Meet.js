myApp.factory("Meet", function($firebaseObject, $q) {
  var ref = new Firebase("https://radiant-fire-8876.firebaseio.com/");
  function Meet(meetData) {

  };
  Meet.prototype = {
      load: function() {

        //var user = ref.getAuth();
        var userRef = ref.child('meets');//.child(user.uid);
        var deferred = $q.defer();
        userRef.once('value', function (snap) {
          // code to handle new value
          deferred.resolve(snap.val());
        }, function (err) {
          // code to handle read error
          deferred.reject(err);
        });
        return deferred.promise;
      },
      createMeet: function(meetTitle, meetTime, meetPlace, login, points, about, smoking, alcohol) {
        ref.onAuth(function(authData) {

          var meetRef = ref.child('meets');
          var lastKey = meetRef.push({
            authorUid: authData.uid,
            title: meetTitle,
            key: '',
            time: meetTime,
            place: meetPlace,
            aboutAuthor: about,
            authorLogin: login,
            authorPoints: points,
            authorSmoking: smoking,
            authorAlcohol: alcohol
          }).key();


        });

      }
  }

  return Meet;

});
