import { Arrangement } from './arrangement';

export interface Hymn {
    number: number;
    title: string;
    arrangements: Arrangement[];

    // Properties set by Firebase
    $key?: string;
}
