let app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/home", { templateUrl: "home.html" })
    .when("/product", { templateUrl: "product.html" })
    .when("/membership", { templateUrl: "membership.html" })
    .when("/aboutUs", { templateUrl: "aboutUs.html" })
    .when("/contactUs", { templateUrl: "contactUs.html" })
    .when("/blog", { templateUrl: "blog.html" })
    .when("/cart", { templateUrl: "cart.html" })
    .when("/logInSignUp", { templateUrl: "logInSignUp.html" });
});

app.controller("ctrl", function ($scope) {});
