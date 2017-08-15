import { OrganStops } from './organ-stops';
import { User } from './user';

export interface Arrangement {
    user: User;
    pedal: OrganStops;
    swell: OrganStops;
    great: OrganStops;
    general: OrganStops;
}