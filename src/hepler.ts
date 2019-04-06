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

interface IDatesByOption {
    start: moment.Moment | null;
    end: moment.Moment | null;
}

const datesByOption = (option: IOptionButton): IDatesByOption => {
    let start = null;
    let end = null;
    switch (option.type) {
        case 'Yesterday':
            const yesterday = moment().subtract(-1, 'days');
            start = yesterday;
            end = yesterday;
            break;
        case 'Today':
            const today = moment();
            start = today;
            end = today;
            break;
        case 'T2Week':
            start = moment().subtract(14, 'days');
            end = moment();
            break;
        case 'Month':
            start = moment().subtract(30, 'days');
            end = moment();
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