'use strict';

import * as angular from 'angular';
import * as moment from 'moment';
import mcDatesComponent from './src/component';
import AppController from './src/controller';
import 'angular-material';
import 'angular-material/angular-material.scss';
import './style.css';
import { dateFormat } from './src/hepler';

angular
    .module('App', ['ngMaterial'])
    .config(($mdDateLocaleProvider: any) => {
        $mdDateLocaleProvider.parseDate = (dateString: string) => {
            var m = moment(dateString, dateFormat, true);
            return m.isValid() ? m.toDate() : '';
        };
        $mdDateLocaleProvider.formatDate = (date: Date) => {
            const pickerValue = moment(date);
            return pickerValue.isValid() ? pickerValue.format(dateFormat) : '';
        };
    })
    .component('mcDates', mcDatesComponent)
    .controller('AppController', AppController);

angular.bootstrap(document, ["App"]);