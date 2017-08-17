import { OrganStop } from './organ-stop';
import { User } from './user';

export interface Arrangement {
    user: User;
    pedal: OrganStop[];
    swell: OrganStop[];
    great: OrganStop[];
    general: OrganStop[];

    // Properties set by Firebase
    $key?: string;
}
