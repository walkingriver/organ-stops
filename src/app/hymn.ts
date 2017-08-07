import { OrganStops } from './organ-stops';

export interface Hymn {
    number: number;
    title: string;
    pedal: OrganStops;
    swell: OrganStops;
    great: OrganStops;
    general: OrganStops;
}
