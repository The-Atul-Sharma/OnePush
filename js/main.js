var app = angular.module('myApp', []);

//Get data from server

app.controller('dataCtrl', function($scope, $http) {
    $scope.loading = true;
    $scope.serverError = false;
    $http.get("https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites")
        .then(function(response) {
            $scope.personList = response.data.websites;
            $scope.noOfSites = response.data.websites.length;
            $scope.loading = false;
        }, function(response) {
            //Second function handles error
            $scope.loading = false;
            $scope.serverError = true;
            $scope.errorMessage = "Something went wrong :)";
        });
});

//post data on server

app.controller('postCtrl', function($scope, $http) {

    $scope.submitForm = function() {
        var user = $scope.user;
        $scope.success = false;
        $http.get('https://hackerearth.0x10.info/api/one-push?type=json&query=push&title=' + user.title + '&url=' + user.url + '&tag=' + user.tag).then(
            function(data) {
                if (data.data.status == 200) {
                    $scope.success = true
                    $scope.postStatus = "Your website is successfully added! To post another website, come back after one hour :)"
                } else {
                    $scope.postStatus = "Can not post, try again later!"
                }
            },
            function(data) {
                console.log("Server Error");
            });
    }
});