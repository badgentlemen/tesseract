import * as moment from 'moment'

export type IOptionButtonType = 'Yesterday' | 'Today' | 'T2Week' | 'Month' | 'All';

export interface IOptionButton {
    id: number;
    type: IOptionButtonType;
    title?: string;
}

export interface momentHolder {
    dateFrom: Date,
    dateTo: Date
}