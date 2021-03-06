angular.module('myksr.users', [])

.controller('UsersCtrl', function($scope, $window, $http, information) {
  $scope.currentUser = information.currentUser;
  // eventually Fetch the users who are in the same group as the rater,
  // for now, fetch all users, then save it as a scope variable
  // have it rendered on html using ng repeat
  $scope.groupFriends = [];
  $http.get('/allFriends').then(function (response) {
    //expect to get an array of data
    // console.log('Successfully fetched all users from server');
    $scope.groupFriends = response.data;
  }, function (error) {
    // console.log('Only friend in our db in the same group as you is the owl.');
    console.log('failed to fetch all friends', error);
    // $scope.groupFriends = [{name:'owl'}];
  });

  $scope.clickFriend = function(raterUsername, rated) {
    information.clickedUser = rated;
    var urlString = `/${raterUsername}/${rated}`;
    $http.get(urlString).then(function (response) {
      if (!response.data[0]){
      // If !(response), redirect them to rating page
        $window.location = '#/ratings';
      }else {
      //else direct them to the friend's info page
        $window.location = '#/result';
      }

    }, function (error) {

    });
  }
});
