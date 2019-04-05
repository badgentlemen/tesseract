'use strict';

import * as angular from 'angular';
import * as moment from 'moment'
import 'angular-material';
import 'angular-material/angular-material.scss';
import './style.css';

const template = require('./mcDate.template.html');

const dateFormat = 'DD.MM.YYYY';

const app = angular.module('App', ['ngMaterial'])
    .config(($mdDateLocaleProvider: any) => {
        $mdDateLocaleProvider.formatDate = (date: Date) => {
            return moment(date).format(dateFormat);
        };
    })

type IOptionButtonType = 'Yesterday' | 'Today' | 'T2Week' | 'Month' | 'All';

interface IOptionButton {
    id: number;
    type: IOptionButtonType;
    title?: string;
}

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
        static $inject = ['$timeout'];
        constructor(private $tmeout: angular.ITimeoutService) {
            this.options = [{
                id: 0,
                type: 'Yesterday',
                title: 'Вчера'
            }, {
                id: 1,
                type: 'Today',
                title: 'Сегодня'
            }, {
                id: 2,
                type: 'T2Week',
                title: '2 Недели'
            }, {
                id: 3,
                type: 'Month',
                title: 'Месяц'
            }, {
                id: 4,
                type: 'All',
                title: 'Все'
            }];

            this.$tmeout(() => {
                this.dateFrom = '1991-04-03'
            }, 5000);
        }

        $onChanges = (changes: any) => {
            if (changes['dateFrom']) {
                let date = this.currentValueAsMoment(changes, 'dateFrom');
                if (date) {
                    this.dateFromMoment = date;
                }
                 
            }

            if (changes['dateTo']) {
                this.dateToMoment = this.currentValueAsMoment(changes, 'dateTo');
            }

            console.log(changes);
        }

        private currentValueAsMoment(changes: any, key: string): moment.Moment | null {
            if (changes[key] && changes[key].currentValue) {
                let date = moment(changes[key].currentValue)
                return date.isValid ? date : null;
            }
            return null
        }

        private checkOption(option: IOptionButton): void {
            if (false) {

            }
        }

        private service(): void {

        }
    }
}

interface momentHolder {
    dateFrom: moment.Moment,
    dateTo: moment.Moment
}

class AppController implements angular.IController {
    public dateFrom: string;
    public dateTo: string;
    private momentHolder: momentHolder;
    public changeDates = () => {
        console.log('changeDates called in parent');
    }
    static $inject = ['$timeout'];
    constructor(private $timeout: ng.ITimeoutService) {
        this.dateFrom = '2019-04-04';
        this.dateTo = '2019-04-05';

        this.$timeout(() => {
            this.dateFrom = '2019-04-01';
        }, 3000, true);

    }
}

app.component('mcDates', mcDatesComponent);
app.controller('AppController', AppController);