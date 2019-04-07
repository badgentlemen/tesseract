import * as moment from 'moment';
import { IOptionButton } from './types';
import { buttonOptions, datesByOption, uglyDateFormat } from './hepler';
const template = require('./views/mcDate.template.html');

interface IDateRangePicker {
    start?: Date | null;
    startMoment?: moment.Moment | null;
    end?: Date | null;
    endMoment?: moment.Moment | null
}

const mcDatesComponent: ng.IComponentOptions = {
    bindings: {
        dateFrom: '=',
        dateTo: '=',
        mcChange: '&'
    },
    template: template,
    controller: class mcDatesComponentController {
        public options: IOptionButton[];
        public mcChange?: () => any;
        public dateFrom: string;
        public dateTo: string;
        public dateRangerPicker: IDateRangePicker;
        constructor(private $scope: any) {
            this.options = buttonOptions;
            this.dateRangerPicker = {};

        }

        $onInit() {
            this.$scope.$watch(() => {
                return this.dateFrom;
            }, (newVal: string) => {
                this.setDateStart(newVal.length ? new Date(newVal) : null);
                this.checkDatesRequirement();
            });

            this.$scope.$watch(() => {
                return this.dateTo;
            }, (newVal: string) => {
                this.setDateEnd(newVal.length ? new Date(newVal) : null);
            });
        }

        private checkOption(option: IOptionButton): void {
            const dates = datesByOption(option);
            this.setDateStart(dates.start);
            this.setDateEnd(dates.end);
            this.updateParent();
            this.mcChange && this.mcChange();
        }

        private setDateStart(start: Date | null) {
            this.dateRangerPicker.start = start;
            this.dateRangerPicker.startMoment = start ? moment(start) : null;
        }

        private setDateEnd(end: Date | null) {
            this.dateRangerPicker.end = end;
            this.dateRangerPicker.endMoment = end ? moment(end) : null;
        }

        private checkDatesRequirement(): void {
            if (this.dateRangerPicker.startMoment && this.dateRangerPicker.endMoment) {
                if (!this.dateRangerPicker.startMoment.isSameOrBefore(this.dateRangerPicker.endMoment, 'days')) {
                    this.setDateStart(null);
                    this.setDateEnd(this.dateRangerPicker.endMoment ? this.dateRangerPicker.endMoment.toDate() : moment().toDate())
                }
            }
        }

        private afterDatePickerModified() {
            this.checkDatesRequirement();
            this.updateParent();
        }

        private onDatePickerChanged(): void {
            this.setDateEnd(this.dateRangerPicker.end);
            this.setDateStart(this.dateRangerPicker.start);
            this.afterDatePickerModified();
        }

        private updateParent() {
            this.dateFrom = this.dateRangerPicker.startMoment && this.dateRangerPicker.startMoment.isValid() ? this.dateRangerPicker.startMoment.format(uglyDateFormat) : '';
            this.dateTo = this.dateRangerPicker.endMoment && this.dateRangerPicker.endMoment.isValid() ? this.dateRangerPicker.endMoment.format(uglyDateFormat) : '';
        }
    }
}

export default mcDatesComponent;