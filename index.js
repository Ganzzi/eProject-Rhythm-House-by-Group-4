// SCROLL UP BUTTON
let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// END SCROLL UP BUTTON

// Initial angular app
let app = angular.module("myApp", ["ngRoute"]);

// NG-ROUTE
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
// END NG-ROUTE

// initialize list of product, album, category, liveshow, contest and sold monthly from route
app.run(function ($rootScope, $http) {
  $rootScope.listOfProduct = [];
  $rootScope.listOfAlbum = [];
  $rootScope.listOfCategory = [];
  $rootScope.listOfLiveshow = [];
  $rootScope.listOfContest = [];
  $rootScope.listOfSoldMonthly = [];
  $rootScope.listOfCart = [];

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

// CONTROLLER

// index's controller
app.controller("index", function ($scope) {});

// home's controller
app.controller("home", function ($scope) {
  // function add album to cart
  $scope.addAlbumToCart = function (index) {
    $scope.listOfCart.push($scope.listOfAlbum[index]);
    alert("Add successfully!");
  };

  // function add category to cart
  $scope.addCategoryToCart = function (index) {
    $scope.listOfCart.push($scope.listOfCategory[index]);
    alert("Add successfully!");
  };
});

// product's controller
app.controller("product", function ($scope) {
  setYearStatus();

  // loop to initial index of each product
  for (let i = 0; i < $scope.listOfProduct.length; i++) {
    $scope.listOfProduct[i].index = i;
  }

  // function set year status (3 status) according to product's year
  function setYearStatus() {
    for (let i = 0; i < $scope.listOfProduct.length; i++) {
      if ($scope.listOfProduct[i].year < 2000) {
        $scope.listOfProduct[i].yearStatus = "before2000";
      }
      if (
        $scope.listOfProduct[i].year >= 2000 &&
        $scope.listOfProduct[i].year <= 2010
      ) {
        $scope.listOfProduct[i].yearStatus = "2000To2010";
      }
      if ($scope.listOfProduct[i].year > 2010) {
        $scope.listOfProduct[i].yearStatus = "after2010";
      }
    }
  }

  // function add product to cart
  $scope.addProductToCart = function (index) {
    if ($scope.listOfCart.indexOf($scope.listOfProduct[index]) == -1) {
      $scope.listOfCart.push($scope.listOfProduct[index]);
    } else {
      $scope.listOfCart[$scope.listOfCart.indexOf($scope.listOfProduct[index])]
        .quantity++;
    }
    alert("Add successfully!");
  };

  // function show modal contain information of product
  $scope.showModal = function (index) {
    $scope.productModal = [];
    $scope.productModal.push($scope.listOfProduct[index]);
    console.log($scope.productModal[0]);
    $scope.manualModal = { display: "flex" };
  };

  // function close modal
  $scope.closeModal = function () {
    $scope.manualModal = { display: "none" };
  };
});

// cart's controller
app.controller("cart", function ($scope) {
  $scope.shipFee = 200;

  cal();

  // function calculate cart total and vat
  function cal() {
    $scope.cartTotal = 0;
    $scope.vat = 0;

    for (let i = 0; i < $scope.listOfCart.length; i++) {
      $scope.cartTotal +=
        $scope.listOfCart[i].price * $scope.listOfCart[i].quantity;
    }

    $scope.vat += $scope.cartTotal * 0.1;
  }

  // function plus quantity of each product
  $scope.plusQuantity = function (index) {
    $scope.listOfCart[index].quantity++;
    cal();
  };

  // function minus quantity of each product
  $scope.minusQuantity = function (index) {
    $scope.listOfCart[index].quantity--;
    if ($scope.listOfCart[index].quantity < 0) {
      $scope.listOfCart[index].quantity = 0;
    }
    cal();
  };

  // function delete product from list of product in cart
  $scope.delete = function (nameToDelete) {
    let index = -1;

    angular.forEach($scope.listOfCart, function (eachOfList, indexOfEach) {
      if (eachOfList.name == nameToDelete) {
        index = indexOfEach;
      }
    });

    if (index >= 0) {
      $scope.listOfCart[index].quantity = 1;
      $scope.listOfCart.splice(index, 1);
    }

    cal();
  };

  // function when user click order button
  $scope.orderSuccess = function () {
    if ($scope.listOfCart.length == 0) {
      alert("Nothing in your cart!");
    } else {
      alert("Your successful order!!");
    }
    $scope.listOfCart = [];
  };
});

// membership's controller
app.controller("membership", function ($scope) {});

// logInSignUpPage's controller
app.controller("logInSignUpPage", function ($scope) {
  checkLogInFunction();

  // function sign up when click sign up button
  $scope.SignUp = function () {
    localStorage.setItem("emailSignUp", $scope.emailSignUp);
    localStorage.setItem("username", $scope.username);
    localStorage.setItem("passSignUp", $scope.passSignUp);
    alert("Sign Up successfully!");
    $scope.emailSignUp = "";
    $scope.username = "";
    $scope.passSignUp = "";
  };

  // function log in when click log in button
  $scope.LogIn = function () {
    //get email and password from local storage
    var checkEmail = localStorage.getItem("emailSignUp");
    var checkPass = localStorage.getItem("passSignUp");

    // check email and password
    if ($scope.email == checkEmail && $scope.pass == checkPass) {
      localStorage.setItem("logInStatus", "true");
      alert("Log In successfully!");
    } else {
      localStorage.setItem("logInStatus", "false");
      alert("Wrong Email or Password!");
    }
    checkLogInFunction();
  };

  // function log out when click log out button
  $scope.LogOut = () => {
    localStorage.setItem("logInStatus", "false");
    $scope.welcome = { display: "none" };
    $scope.form = { display: "flex" };
  };

  // function to check login status true or false
  function checkLogInFunction() {
    // get login status
    var logInStatuss = localStorage.getItem("logInStatus");

    // if true: display welcome, ortherwise login form
    if (logInStatuss == "true") {
      $scope.userName = localStorage.getItem("username");
      $scope.welcome = { display: "flex" };
      $scope.form = { display: "none" };
    } else {
      $scope.welcome = { display: "none" };
      $scope.form = { display: "flex" };
    }
  }
});

// END CONTROLLER

// REVEAL

// Event Listener
window.addEventListener("load", checkHomePageMobile); // display when load home page
window.addEventListener("scroll", revealOfBlogPage);
window.addEventListener("scroll", revealOfHomePage);
window.addEventListener("scroll", revealOfAboutUsPage);
window.addEventListener("scroll", revealOfMembershipPage);
window.addEventListener("scroll", revealOfContactUsPage);

// FUNCTION DECLARATION
function checkHomePageMobile() {
  var reveals = document.querySelectorAll(".revealOfHomePage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 300;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function revealOfBlogPage() {
  var reveals = document.querySelectorAll(".revealOfBlogPage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 50;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function revealOfHomePage() {
  var reveals = document.querySelectorAll(".revealOfHomePage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 300;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function revealOfAboutUsPage() {
  var reveals = document.querySelectorAll(".revealOfAboutUsPage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 200;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function revealOfMembershipPage() {
  var reveals = document.querySelectorAll(".revealOfMembershipPage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function revealOfContactUsPage() {
  var reveals = document.querySelectorAll(".revealOfContactUsPage");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 50;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
// END FUNCTION DECLARATION

// END REVEAL
