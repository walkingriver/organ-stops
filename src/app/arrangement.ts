import { OrganStops } from './organ-stops';

export interface Arrangement {
    pedal: OrganStops;
    swell: OrganStops;
    great: OrganStops;
    general: OrganStops;
}