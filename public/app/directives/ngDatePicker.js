angular.module('rentCarsApp').directive('ngDatePicker', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope) {

                $(function () {

                var datePicker1 = $('#datetimepicker1');
                var datePicker2 = $('#datetimepicker2');
                var datePicker3 = $('#datetimepicker3');

                var datePickerInput1 = $('#aboutCarDateInput1');
                var datePickerInput2 = $('#aboutCarDateInput2');
                var datePickerInput3 = $('#aboutCarDateInput3');

                datePicker1.datetimepicker({
                    format: 'YYYY-MM-DD HH:mm',
                    minDate: moment()
                });

                datePicker2.datetimepicker({
                    format: 'YYYY-MM-DD HH:mm',
                    minDate: moment().date(moment().date() + 1)
                });
                datePicker3.datetimepicker({
                    viewMode: 'years',
                    format: 'YYYY-MM-DD',
                    maxDate: moment().subtract(18, "years"),
                    minDate: '1900-01-01 00:00'
                });

                datePicker1.on("dp.change", function (e) {
                    datePicker2.data("DateTimePicker").minDate(e.date);
                    scope.from = e.date.format('YYYY-MM-DD HH:mm');
                });

                datePickerInput1.on("input", function (e) {
                    scope.from = datePickerInput1.val();
                });

                datePicker2.on("dp.change", function (e) {
                    datePicker1.data("DateTimePicker").maxDate(e.date);
                    scope.to = e.date.format('YYYY-MM-DD HH:mm');
                });

                datePickerInput2.on("input", function (e) {
                    scope.to = datePickerInput2.val();
                });

                datePicker3.on("dp.change", function (e) {
                    scope.dateBirth = e.date.format('YYYY-MM-DD');
                });

                datePickerInput3.on("input", function (e) {
                    scope.dateBirth = datePickerInput3.val();
                });

            });
        }
    };
});
