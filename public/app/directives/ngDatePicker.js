angular.module('rentCarsApp').directive('ngDatePicker',[function () {
        return function (scope) {
            $(function () {

                /**
                * Directive 'ngDatePicker' is used to customize input form for dates.
                * Apply scope to controller, when data in input changes.
                */

                var datePickerFrom = $('#addOrderDatePickerFrom');
                var datePickerTo = $('#addOrderDatePickerTo');
                var datePickerBirth = $('#addOrderDatePickerBirth');

                var inputDatePickerFrom = $('#inputAddOrderDatePickerFrom');
                var inputDatePickerTo = $('#inputAddOrderDatePickerTo');
                var inputDatePickerBirth = $('#inputAddOrderDatePickerBirth');

                datePickerFrom.datetimepicker({
                    format: 'YYYY-MM-DD HH:mm',
                    minDate: moment()
                });

                datePickerTo.datetimepicker({
                    format: 'YYYY-MM-DD HH:mm',
                    minDate: moment().date(moment().date() + 1)
                });
                datePickerBirth.datetimepicker({
                    viewMode: 'years',
                    format: 'YYYY-MM-DD',
                    maxDate: moment().subtract(18, 'years'),
                    minDate: '1900-01-01 00:00'
                });

                datePickerFrom.on('dp.change', function (e) {
                    datePickerTo.data('DateTimePicker').minDate(e.date);
                    scope.from = e.date.format('YYYY-MM-DD HH:mm');
                });

                inputDatePickerFrom.on('input', function (e) {
                    scope.from = inputDatePickerFrom.val();
                });

                datePickerTo.on('dp.change', function (e) {
                    datePickerFrom.data('DateTimePicker').maxDate(e.date);
                    scope.to = e.date.format('YYYY-MM-DD HH:mm');
                });

                inputDatePickerTo.on('input', function (e) {
                    scope.to = inputDatePickerTo.val();
                });

                datePickerBirth.on('dp.change', function (e) {
                    scope.dateBirth = e.date.format('YYYY-MM-DD');
                });

                inputDatePickerBirth.on('input', function (e) {
                    scope.dateBirth = inputDatePickerBirth.val();
                });

            });
        }
}]);
