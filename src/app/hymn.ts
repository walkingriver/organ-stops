export interface Hymn {
  number?: number;
  title: string;
  arrangements: { [key: string]: Arrangement };
}

export interface Arrangement {
  user: User;
  pedal: OrganStop[];
  swell: OrganStop[];
  great: OrganStop[];
  general: OrganStop[];
}

export interface User {
  id: string;
  name: string;
}

export interface OrganStop {
  name: string;
  enabled: boolean;
}

const pedal: OrganStop[] = [
  { name: 'Contra Violone 32', enabled: false },
  { name: 'Diapason 16', enabled: false },
  { name: 'Bourdon 16', enabled: false },
  { name: 'Lieblich Gedackt 16', enabled: false },
  { name: 'Octave 8', enabled: false },
  { name: 'Flute 8', enabled: false },
  { name: 'Choral Bass 4', enabled: false },
  { name: 'Mixture III', enabled: false },
  { name: 'Posaune 16', enabled: false },
  { name: 'Waldhorn 16', enabled: false },
  { name: 'French Trumpet 8', enabled: false },
  { name: 'Great to Pedal', enabled: false },
  { name: 'Swell to Pedal', enabled: false },
];

const swell: OrganStop[] = [
  { name: 'Lieblich Gedackt 16', enabled: false },
  { name: 'Gedackt 8', enabled: false },
  { name: 'Viola Pomposa 8', enabled: false },
  { name: 'Viola Celeste 8', enabled: false },
  { name: 'Flute Celeste II 8', enabled: false },
  { name: 'Octave 4', enabled: false },
  { name: 'Traverse Flute 4', enabled: false },
  { name: 'Nasard 2 ⅔', enabled: false },
  { name: 'Piccolo 2', enabled: false },
  { name: 'Tierce 1 ⅗', enabled: false },
  { name: 'Fourniture IV', enabled: false },
  { name: 'Waldhorn 16', enabled: false },
  { name: 'Tromba 8', enabled: false },
  { name: 'Oboe 8', enabled: false },
  { name: 'Tremulant', enabled: false },
];

const great: OrganStop[] = [
  { name: 'Violone 16', enabled: false },
  { name: 'Diapason 8', enabled: false },
  { name: 'Harmonic Flute 8', enabled: false },
  { name: 'Flute Celeste II 8', enabled: false },
  { name: 'Octave 4', enabled: false },
  { name: 'Spitzflöte 4', enabled: false },
  { name: 'Fifteenth 2', enabled: false },
  { name: 'Mixture IV', enabled: false },
  { name: 'French Trumpet 8', enabled: false },
  { name: 'Krummhorn 8', enabled: false },
  { name: 'Chimes', enabled: false },
  { name: 'Tremulant', enabled: false },
  { name: 'Swell to Great', enabled: false },
];

const general: OrganStop[] = [
  { name: 'Bass Coupler', enabled: false },
  { name: 'Melody Coupler', enabled: false },
  { name: 'Alternate Tuning', enabled: false },
];

export const emptyHymn: Hymn = {
  title: '',
  arrangements: {},
};

export const emptyArrangement: Arrangement = {
  pedal: pedal.slice(),
  swell: swell.slice(),
  great: great.slice(),
  general: general.slice(),
  user: { id: '', name: '' },
};
