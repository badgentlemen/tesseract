import * as moment from 'moment';
import { IOptionButton } from './types';
import { buttonOptions, datesByOption } from './hepler';
const template = require('./views/mcDate.template.html');

const mcDatesComponent: ng.IComponentOptions = {
    bindings: {
        dateFrom: '<',
        dateTo: '<',
        mcChange: '&'
    },
    template: template,
    controller: class mcDatesComponentController {
        public options: IOptionButton[];
        public mcChange?: () => any;
        public dateFrom: string;
        public dateTo: string;
        public dateFromMoment: moment.Moment | null = null;
        public dateToMoment: moment.Moment | null = null;
        static $inject = ["$scope"];
        constructor(private $scope: any) {
            this.options = buttonOptions;
        }

        $onChanges = (changes: any) => {
            if (changes['dateFrom']) {
                this.dateFromMoment = this.currentValueAsMoment(changes, 'dateFrom');
            }

            if (changes['dateTo']) {
                this.dateToMoment = this.currentValueAsMoment(changes, 'dateTo');
            }

            this.checkDatesRequirement();
        }

        private currentValueAsMoment(changes: any, key: string): moment.Moment | null {
            if (changes[key] && changes[key].currentValue) {
                let date = moment(changes[key].currentValue)
                return date.isValid() ? date : null;
            }
            return null
        }

        private checkOption(option: IOptionButton): void {
            const lastDateFrom = this.dateFromMoment;
            const lastDateTo = this.dateToMoment;
            const dates = datesByOption(option);
            this.dateFromMoment = dates.start;
            this.dateToMoment = dates.end;

            this.checkDatesRequirement();

            if ((this.dateToMoment !== lastDateTo || this.dateFromMoment !== lastDateFrom) && this.mcChange) {
                this.mcChange();
            }
        }

        private checkDatesRequirement(): void {
            console.log(this.dateFromMoment)
            if (this.dateFromMoment && this.dateToMoment) {
                this.dateFromMoment = this.dateFromMoment.isSameOrBefore(this.dateToMoment) ? this.dateFromMoment : null;
            }
        }
    }
}

export default mcDatesComponent;