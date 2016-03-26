myApp.factory("Auth", function($firebaseAuth, $q) {
var ref = new Firebase("https://radiant-fire-8876.firebaseio.com/");
  function Auth(authData) {
      if (authData) {
          this.setData(authData);
      }
      // Some other initializations related to book
  };
  Auth.prototype = {
      setData: function(authData) {
          angular.extend(this, authData);
      },
      load: function() {

        var scope = this;
        scope.setData($firebaseAuth(ref));
      },
      login: function(email, password) {

        var deferred = $q.defer();
        ref.authWithPassword({
          email    : email,
          password : password
        }, function(error, authData) {
          if (error) {
            deferred.reject(error);
            //console.log("Login Failed!", error);
          } else {
             deferred.resolve(authData);
            //console.log("Authenticated successfully with payload:", authData);
          }
        });
        return deferred.promise;
      },
      register: function(email, password) {
        var deferred = $q.defer();
        ref.createUser({
          email    : email,
          password : password
        }, function(error, authData) {
          if (error) {

            deferred.reject(error);
            //console.log("Error creating user:", error);
          } else {
            var userRef = ref.child('users').child(authData.uid);
            userRef.set({
              login: '',
              points: 10,
              about: '',
              smoking: 'Negative',
              alcohol: 'Negative',
              interests: {
                first: ''
              }

            });
            
            deferred.resolve(authData);

            //console.log("Successfully created user account with uid:", userData.uid);
          }
        });
        return deferred.promise;
      },
      logout: function() {
        ref.unauth();
      },
      onAuth: function() {
        if(ref.getAuth() != null) {
          return true;
        } else {
          return false;
        }
      },
      getUid: function() {
        var deferred = $q.defer();
        ref.onAuth(function(authData) {
           deferred.resolve(authData.uid);
        });
        return deferred.promise;
      }
  };

  return Auth;

});
