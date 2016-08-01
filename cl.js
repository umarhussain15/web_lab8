var app = angular.module("myApp", []);

var dgl;
app.controller("init", function ($scope,$http) {
    $http.get('./yql.json')
    .success(function(response) {$scope.names = response.query;
                                 localStorage.setItem("query",JSON.stringify(response.query));
                                window.console.log(localStorage.getItem("query"));});
    
    $scope.date = new Date();
    $scope.firstDay = new Date($scope.date.getFullYear(), $scope.date.getMonth() , 1);
    $scope.lastDay = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 0);
    $scope.nextme = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 1);
    window.console.log($scope.firstDay + " vs " + $scope.lastDay + " vs next m" + $scope.nextme);
   
    $scope.update = function () {
        var weeks = 0;
        var stdn = $scope.firstDay.getDay();
        var lastme = new Date($scope.date.getFullYear(), $scope.date.getMonth() , 0);
         window.console.log("<<<<<<<<<< last me"+lastme);
        $scope.war = [];
        $scope.days = [];
        $scope.war[weeks] = weeks;
        $scope.days[weeks] = [];
        //days[weeks][stdn] = firstDay.getDate();
        //alert(stdn + "  " + $scope.firstDay);
        var i, lop;
        if (stdn == 1) {
            lop = 0;
        }
        if (stdn == 0) {
            lop = 6;
        } else {
            lop = stdn - 1;
        }
        lastme.setDate(lastme.getDate() - lop+1);
        // storing last month days
        for (i = 0; i < lop; i = i + 1) {
            // alert(days[weeks][i]);
            $scope.days[weeks][i] = lastme.getDate();
            //        alert(days[weeks][i]);
            lastme.setDate(lastme.getDate() + 1);
        }
        // checking if we still have space in fisrt row
        for (i; i <= 6; i = i + 1) {
            // alert(days[weeks][i]);
            $scope.days[weeks][i] = $scope.firstDay.getDate();
            //        alert(days[weeks][i]);
            $scope.firstDay.setDate($scope.firstDay.getDate() + 1);
        }


        weeks++;
        //firstDay.setDate(firstDay.getDate() + 1);


        while ($scope.firstDay.getDate() != $scope.lastDay.getDate()) {
            $scope.war[weeks] = weeks;
            $scope.days[weeks] = [];
            for (i = 0; i <= 6; i++) {
                if ($scope.firstDay.getDate() == $scope.lastDay.getDate())
                    break;
                $scope.days[weeks][i] = $scope.firstDay.getDate();

                $scope.firstDay.setDate($scope.firstDay.getDate() + 1);
            }
            window.console.log($scope.firstDay);
            window.console.log($scope.war);
            weeks++;
        }

        weeks--;

//        alert($scope.days[weeks].length);
        //if row is full and we have still the last date to store then
        // create new row and add remaining elements
        if ($scope.days[weeks].length == 7) {
            weeks++;
            var tt = 0;
            $scope.war[weeks] = weeks;
            $scope.days[weeks] = [];
            $scope.days[weeks][tt] = $scope.lastDay.getDate();

            for (i = tt + 1; i <= 6; i = i + 1) {
                // alert(days[weeks][i]);
                $scope.days[weeks][i] = $scope.nextme.getDate();
                // alert(days[weeks][i]);
                $scope.nextme.setDate($scope.nextme.getDate() + 1);
            }
        }
        // if row is not full just add last date and fill row with new month dates
        else {
            var tt = $scope.days[weeks].length;
            $scope.days[weeks][tt] = $scope.lastDay.getDate();

            var nextme = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 1);
            for (j = tt + 1; j < 7; j++) {
                $scope.days[weeks][j] = $scope.nextme.getDate();
                // alert(days[weeks][i]);
                $scope.nextme.setDate($scope.nextme.getDate() + 1);
            }

        }
//
//        window.console.log($scope.days[0]);
//        window.console.log($scope.days[1]);
//        window.console.log($scope.days[2]);
//        window.console.log($scope.days[3]);
//        window.console.log($scope.days[4]);
//        window.console.log($scope.days[5]);
//        window.console.log($scope.days);
    }
     $scope.next = function () {
        var now = $scope.firstDay;
        var nxt;
        if (now.getMonth() == 11) {
            $scope.date = new Date(now.getFullYear() + 1, 0, 1);
        } else {
            $scope.date = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        window.console.log(">>>>>>>>>>"+$scope.date);
        $scope.firstDay = new Date($scope.date.getFullYear(), $scope.date.getMonth() , 1);
        $scope.lastDay = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 0);
        $scope.nextme = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 1);
        
        window.console.log($scope.firstDay + " vs " + $scope.lastDay + " vs next m" + $scope.nextme);
        $scope.update();
    }
    $scope.prev = function () {
        var now = $scope.firstDay;
        var nxt;
        if (now.getMonth() == 0) {
            $scope.date = new Date(now.getFullYear() - 1, 11, 1);
        } else {
            $scope.date = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        }
        window.console.log(">>>>>>>>>>"+$scope.date);
        $scope.firstDay = new Date($scope.date.getFullYear(), $scope.date.getMonth() , 1);
        $scope.lastDay = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 0);
        $scope.nextme = new Date($scope.date.getFullYear(), $scope.date.getMonth() + 1, 1);
        
        window.console.log($scope.firstDay + " vs " + $scope.lastDay + " vs next m" + $scope.nextme);
        $scope.update();
    }
    $scope.update();
});
app.controller("myCtrl", function ($scope) {
    //    var date = new Date();
    //    $scope.date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    //    dgl = new Date();

});