let app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("", { templateUrl: "home.html" })
    .when("/home", { templateUrl: "home.html" })
    .when("/product", { templateUrl: "product.html" })
    .when("/membership", { templateUrl: "membership.html" })
    .when("/aboutUs", { templateUrl: "aboutUs.html" })
    .when("/contactUs", { templateUrl: "contactUs.html" })
    .when("/blog", { templateUrl: "blog.html" })
    .when("/cart", { templateUrl: "cart.html" })
    .when("/logInSignUp", { templateUrl: "logInSignUp.html" });
});

// initialize list of product, album, category, liveshow, contest and sold monthly from route
app.run(function ($rootScope, $http) {
  $rootScope.listOfProduct = [];
  $rootScope.listOfAlbum = [];
  $rootScope.listOfCategory = [];
  $rootScope.listOfLiveshow = [];
  $rootScope.listOfContest = [];
  $rootScope.listOfSoldMonthly = [];

  $http.get("data.json").then(
    function (response) {
      $rootScope.listOfProduct = response.data.product;
      $rootScope.listOfAlbum = response.data.album;
      $rootScope.listOfCategory = response.data.category;
      $rootScope.listOfLiveshow = response.data.liveshow;
      $rootScope.listOfContest = response.data.contest;
      $rootScope.listOfSoldMonthly = response.data.soldMonthly;
    },
    function (response) {}
  );
});

app.controller("index", function ($scope) {});
app.controller("home", function ($scope) {});
app.controller("product", function ($scope) {});
app.controller("cart", function ($scope) {
  $scope.listOfCart = [];
  $scope.listOfCart.push($scope.listOfProduct[0]);
  $scope.listOfCart.push($scope.listOfProduct[1]);
  $scope.shipFee = 200;

  cal();

  function cal() {
    $scope.cartTotal = 0;
    $scope.vat = 0;

    for (let i = 0; i < $scope.listOfCart.length; i++) {
      $scope.cartTotal +=
        $scope.listOfCart[i].price * $scope.listOfCart[i].quantity;
    }

    $scope.vat += $scope.cartTotal * 0.1;
  }

  $scope.plusQuantity = function (index) {
    $scope.listOfCart[index].quantity++;
    cal();
  };

  $scope.minusQuantity = function (index) {
    $scope.listOfCart[index].quantity--;
    if ($scope.listOfCart[index].quantity < 0) {
      $scope.listOfCart[index].quantity = 0;
    }
    cal();
  };

  $scope.delete = function (nameToDelete) {
    let index = -1;

    angular.forEach($scope.listOfCart, function (eachOfList, indexOfEach) {
      if (eachOfList.name == nameToDelete) {
        index = indexOfEach;
      }
    });

    if (index >= 0) {
      $scope.listOfCart.splice(index, 1);
    }
  };
});

app.controller("membership", function ($scope) {});
