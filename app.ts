'use strict';

import * as angular from 'angular';
import * as moment from 'moment';
import mcDatesComponent from './src/component';
import AppController from './src/controller';
import 'angular-material';
import 'angular-material/angular-material.scss';
import './style.css';

const dateFormat = 'DD.MM.YYYY';

const app = angular
	.module('App', ['ngMaterial'])
	.config(($mdDateLocaleProvider: any) => {
        $mdDateLocaleProvider.parseDate = (dateString: string) => {
            var m = moment(dateString, dateFormat, true);
            return m.isValid() ? m.toDate() : null;
        };
		$mdDateLocaleProvider.formatDate = (date: Date) => {
            const pickerValue = moment(date);
			return pickerValue.isValid() ? pickerValue.format(dateFormat) : '';
		};
	})
	.component('mcDates', mcDatesComponent)
	.controller('AppController', AppController);
