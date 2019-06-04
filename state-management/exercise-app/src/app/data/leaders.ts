import { Leader } from './model';

export function getLeaders(): Leader[] {
  return [
    {
      id: 10,
      name: 'Peggy Carter',
      profile: 'assets/peggy.png',
      description: 'co-founder of S.H.I.E.L.D.; First known executive director. Deceased.',
      level: 10
    },
    {
      id: 11,
      name: 'Alexander Pierce',
      profile: 'assets/alexander.png',
      description:
        'Secretary of S.H.I.E.L.D.. Executive Director. Appointed to director upon the death of Nick Fury; Hydra double agent. Deceased.',
      level: 10
    },
    {
      id: 12,
      name: 'Nick Fury',
      profile: 'assets/nick.png',
      description:
        "Former executive director; faked his death after S.H.I.E.L.D's fall and appointed Phil Coulson as his successor.",
      level: 10
    },
    {
      id: 13,
      name: 'Phil Coulson',
      profile: 'assets/phil.png',
      description:
        "Executive director; current field officer who oversees many of the division's field operations; briefly deceased before being subjected to GH-325. Deceased.",
      level: 8
    }
  ];
}
