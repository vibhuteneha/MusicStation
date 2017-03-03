var app = angular.module('myServices', ['ngRoute']);
app.controller('confirmController', function($scope, sharedData, $location){
		$scope.info = sharedData.info;
		$scope.which = sharedData.which;

		$scope.fname = sharedData.fname;
		$scope.lname = sharedData.lname;
		$scope.address = sharedData.address;
		$scope.city = sharedData.city;
		$scope.zip = sharedData.zip;
		
		$scope.home = function(){

			$location.path('/');

		}
	
})
app.controller('resultController', function($scope, sharedData, $location){

	$scope.info = sharedData.info;
	$scope.which = sharedData.which;
	$scope.review1 = true;
	$scope.review = function(){

		
		sharedData.fname = $scope.fname;
		sharedData.lname = $scope.lname;
		sharedData.email = $scope.email;
		sharedData.cc = $scope.cc;
		sharedData.address = $scope.address;
		sharedData.city = $scope.city;
		sharedData.zip = $scope.zip;
		sharedData.phone = $scope.phone;

		$scope.customer = true;
		$scope.review1 = false;
	}

	$scope.edit = function(){

		$scope.customer = false;
		$scope.review1 = true;
	}

	$scope.buy = function(){

		$location.path('/confirm');

		

	}
	

});
app.controller('mainController', function($scope,$location,sharedData, $http){
		sharedData.info = [];
		$http.get('../json/guitardata.json').success(function(data){
			sharedData.info = data;
			
			sharedData.which = 0;

			var l = sharedData.info.allProducts.length;
			
			$scope.info = sharedData.info;
			$scope.which = sharedData.which;


			$scope.next = function(){
				if(sharedData.which < l-1)
				{
					sharedData.which ++;
					$scope.info = sharedData.info;
					$scope.which = sharedData.which;
					$scope.ndis = false;
					$scope.pdis = false;
				}
				else
				{
					$scope.ndis = true;
				}


			}

			$scope.prev = function(){

				if(sharedData.which > 0)
				{
					sharedData.which --;
					$scope.info = sharedData.info;
					$scope.which = sharedData.which;
					$scope.pdis = false;
					$scope.ndis = false;
				}
				else
				{
					$scope.pdis = true;
				}
				
			}
			
		});

		$("a").click(function(){
			$a = $(this);
			$p = $a.next();
			$p.slideToggle(500, function(){
				
					return $p.is(":visible");
				
			});
		});

		$scope.submit = function(){

			$location.path('/result');
			sharedData.info = $scope.info;
			sharedData.which = $scope.which;

		}

});
app.service('sharedData', function(){


});
app.config(function($routeProvider)
{
	$routeProvider

		.when('/',{
			templateUrl : 'home.html',
			controller : 'mainController'
		})
		.when('/guitar',{
			templateUrl : 'guitar.html',
			controller : 'mainController'
		})
		.when('/result', {
			templateUrl : 'result.html',
			controller :'resultController'
		})
		.when('/confirm', {
			templateUrl : 'confirm.html',
			controller : 'confirmController'
		});
});