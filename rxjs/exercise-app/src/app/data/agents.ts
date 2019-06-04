import { Agent } from './model';

export function getAgents(): Agent[] {
  return [
    {
      id: 13,
      name: 'Phil Coulson',
      profile: 'assets/phil.png',
      description: "Coulson is an agent of S.H.I.E.L.D., and later becomes the organization's director.",
      level: 8
    },
    {
      id: 100,
      name: 'Melinda May',
      profile: 'assets/melinda.png',
      description: 'S.H.I.E.L.D. ace pilot and weapons expert',
      level: 6
    },
    {
      id: 101,
      name: 'Daisy "Skye" Johnson',
      profile: 'assets/daisy.png',
      description: 'An Inhuman S.H.I.E.L.D. agent with the ability to create earthquakes.',
      level: 6
    },
    {
      id: 102,
      name: 'Leo Fitz',
      profile: 'assets/leo.png',
      description: 'An agent of S.H.I.E.L.D. who specializes in engineering, especially weapons technology.',
      level: 7
    },
    {
      id: 103,
      name: 'Jemma Simmons',
      profile: 'assets/jemma.png',
      description: 'A S.H.I.E.L.D. biochemist who specializes in life sciences (both human and alien).',
      level: 7
    }
  ];
}
