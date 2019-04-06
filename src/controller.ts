import { momentHolder } from './types';

export default class AppController implements angular.IController {
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
    }
}