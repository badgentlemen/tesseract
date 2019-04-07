export default class AppController implements angular.IController {
    public date1: string;
    public date2: string;
    static $inject = ['$timeout'];
    constructor(private $timeout: ng.ITimeoutService) {
        this.date1 = '2019-04-04';
        this.date2 = '2019-04-05';
    }
    changeDates = () => {
        this.$timeout(() => {
            alert(`dateFrom - ${this.date1}; dateTo - ${this.date2}`)
        }, 20);   
    }
}