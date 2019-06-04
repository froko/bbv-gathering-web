export interface Member {
  id: number;
  name: string;
  profile: string;
  description: string;
}

export interface Resource {
  origin: string;
  classification: string;
  count: number;
}

export interface Rating {
  id: number;
  numberOfStars: number;
}

export interface MemberWithRating {
  id: number;
  name: string;
  profile: string;
  level: number;
  rating: number;
}

export interface Avenger extends Member {
  alias: string;
  level: number;
}

export interface AvengerResource extends Resource {
  avengers: Avenger[];
}

export interface Leader extends Member {
  level: number;
}

export interface LeaderResource extends Resource {
  leaders: Leader[];
}

export interface Agent extends Member {
  level: number;
}

export interface AgentResource extends Resource {
  agents: Agent[];
}
