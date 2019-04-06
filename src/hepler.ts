import { IOptionButton } from './types'
import moment = require('moment');

const buttonOptions: IOptionButton[] = [{
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

export const dateFormat = 'DD.MM.YYYY';
export const uglyDateFormat = 'YYYY-MM-DD';

interface IDatesByOption {
    start: Date | null;
    end: Date | null;
}

const datesByOption = (option: IOptionButton): IDatesByOption => {
    let start = null;
    let end = null;
    switch (option.type) {
        case 'Yesterday':
            const yesterday = moment().subtract(1, 'days').toDate();
            start = yesterday;
            end = yesterday;
            break;
        case 'Today':
            const today = moment().toDate();
            start = today;
            end = today;
            break;
        case 'T2Week':
            start = moment().subtract(14, 'days').toDate();
            end = moment().toDate();
            break;
        case 'Month':
            start = moment().subtract(30, 'days').toDate();
            end = moment().toDate();
            break;
        default:
            break;
    }


    return {
        start,
        end
    };
}


export {
    buttonOptions,
    datesByOption
}