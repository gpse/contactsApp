var app = angular.module('homeApp', ['ngRoute']);

// to disable cache
app.run(function($rootScope, $templateCache, $window) {

   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
	
});

app.config(function($routeProvider, $locationProvider) {
		return;
		// route for the home page
		$routeProvider
		.when('/', {
            redirectTo: '/home'
        })
		.when('/home', {
			templateUrl : 'home.html',
			controller  : 'mainController'
		})
		.when('/add', {
			templateUrl : 'add.html',
			controller  : 'mainController'
		})
		.otherwise({
            redirectTo: '/home'
        });
		//$locationProvider.html5Mode(true);
		//$locationProvider.html5Mode(true).hashPrefix('!');
});

app.directive("homeContacts", function() {
	return {
		restrict: 'E',
		templateUrl: "home.html"
	};
});

app.directive("viewContacts", function() {
	return {
		restrict: 'E',
		templateUrl: "contacts.html"
	};
});

app.directive("viewContact", function() {
	return {
		restrict: 'E',
		templateUrl: "view.html"
	};
});

app.directive("addContacts", function() {
	return {
		restrict: 'E',
		templateUrl: "add.html"
	};
});

app.directive("editContact", function() {
	return {
		restrict: 'E',
		templateUrl: "edit.html"
	};
});

app.controller('mainController', ['$scope', '$http', '$location','$window', '$interval', function($scope, $http, $location, $window, $interval){
	
	$scope.formData = {};
	$scope.contacts = {};
	$scope.contactsMaster = {};
	$scope.status = 0;
	$scope.item = {};
	$scope.search = "";
	
	$scope.showAddContact = function() {
		$scope.status = 1;
	};

	$scope.filterContacts = function(a) {
		if(a == "#"){$scope.contacts = $scope.contactsMaster; return};
		$scope.contacts = $scope.contactsMaster.filter(function (el) {
		  var ch = el.fname;
		  if(ch){
			  if(ch.charAt(0) == a){
				  return el.fname;
			  }
		  }
		  
		});
	};

	$scope.viewContactDetail = function(id) {
		$scope.status = 2;
		$http.get('/api/contacts/' + id)
			.success(function(data) {
				$scope.item = data;
				console.log($scope.item);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});

			$scope.optimizeDisplay();
	};

	$scope.editContact = function(id) {
		$scope.status = 3;
		$http.get('/api/contacts/' + id)
			.success(function(data) {
				$scope.item = data;
				console.log($scope.item);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.viewContacts = function() {
		$http.get('/api/contacts')
		.success(function(data) {
			$scope.contacts = data;
			$scope.contactsMaster = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// when submitting the add form, send the text to the node API
	$scope.createContact = function() {
		$http.post('/api/contacts', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.contacts = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.updateContact = function(id) {
		console.log($scope.item);
		$http.put('/api/contacts', $scope.item[0])
			.success(function(data) {
				$scope.viewContacts();
				console.log(data);
				$scope.viewContactDetail(id);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/contacts/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.selectContact = function(id) {
		$http.select('/api/contacts/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	$scope.clear = function() {

		$scope.optimizeDisplay();
		
	};

	$scope.optimizeDisplay = function() {
		var x = screen.availWidth;
		if(x < 500){
			var status = document.getElementById("listView").style.display;
			if(status == ""){
				document.getElementById("mainView").style.display = "";
				document.getElementById("listView").style.display = "none";
			}
			else{
				document.getElementById("mainView").style.display = "none";
				document.getElementById("listView").style.display = "";
			}
		}
		
	};

	$scope.viewContacts();//load contacts


	 $scope.$on("$destroy", function(){
		   
		   
	   });

	
}]);
