export interface HeroResource {
  origin: string;
  classification: string;
  count: number;
  heroes: Hero[];
}

export interface Hero {
  id: number;
  alias: string;
  name: string;
  profile: string;
  description: string;
}
