export default class AppController implements angular.IController {
    public date1: string;
    public date2: string;
    public changeDates = () => {
        console.log('mc-change called from child');
    }
    static $inject = ['$timeout'];
    constructor(private $timeout: ng.ITimeoutService) {
        this.date1 = '2019-04-04';
        this.date2 = '2019-04-05';
    }
}