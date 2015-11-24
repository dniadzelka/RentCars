angular.module('rentCarsApp').directive('ngDatePicker', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope) {
                $(function () {

                $('#datetimepicker1').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm'
                });
                $('#datetimepicker2').datetimepicker({
                    useCurrent: false, //Important! See issue #1075
                    format: 'YYYY-MM-DD HH:mm'
                });
                $("#datetimepicker1").on("dp.change", function (e) {
                    $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
                });
                $("#datetimepicker2").on("dp.change", function (e) {
                    $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
                });
                $('#datetimepicker3').datetimepicker({
                    viewMode: 'years',
                    format: 'YYYY-MM-DD'
                });

                scope.from =
            });
        }
    };
});
