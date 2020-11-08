export interface Hymn {
  number: number;
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
