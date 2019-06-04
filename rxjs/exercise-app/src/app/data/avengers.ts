import { Avenger } from './model';

export function getAvengers(): Avenger[] {
  return [
    {
      id: 1,
      alias: 'Iron Man',
      name: 'Tony Stark',
      profile: 'assets/iron-man.png',
      description:
        'Inventor Tony Stark applies his genius for high-tech solutions to problems as Iron Man, the armored Avenger.',
      level: 7
    },
    {
      id: 2,
      alias: 'Captain America',
      name: 'Steve Rogers',
      profile: 'assets/captain-america.png',
      description:
        'America’s World War II Super-Soldier continues his fight in the present as an Avenger and untiring sentinel of liberty.',
      level: 5
    },
    {
      id: 3,
      alias: 'Black Widow',
      name: 'Natasha Romanoff',
      profile: 'assets/black-widow.png',
      description:
        'Trusted by some and feared by most, the Black Widow strives to make up for the bad she had done in the past by helping the world, even if that means getting her hands dirty in the process.',
      level: 5
    },
    {
      id: 4,
      alias: 'Hulk',
      name: 'Bruce Banner',
      profile: 'assets/hulk.png',
      description:
        'Exposed to heavy doses of gamma radiation, scientist Bruce Banner transforms into the mean, green rage machine called the Hulk.',
      level: 6
    },
    {
      id: 5,
      alias: 'Hawkeye',
      name: 'Clint Barton',
      profile: 'assets/hawkeye.png',
      description:
        'An expert marksman and fighter, Clint Barton puts his talents to good use by working for S.H.I.E.L.D. as a special agent. The archer known as Hawkeye also boasts a strong moral compass that at times leads him astray from his direct orders.',
      level: 4
    }
  ];
}
