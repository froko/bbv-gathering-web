import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MemberWithRating } from '@exercise-app/data';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<MemberWithRating[]> {
    return of([]);
  }

  /******************************************************************
  /api/agents
  -----------
  {
    "origin": "s.h.i.e.l.d.",
    "classification": "top secret",
    "count": 5,
    "agents": [
      {
        "id": 13,
        "name": "Phil Coulson",
        "profile": "assets/phil.png",
        "description": "Coulson is an agent of S.H.I.E.L.D., and later becomes the organization's director.",
        "level": 8
      },
      ...
    ]
  }

  /api/avengers
  -------------
  {
    "origin": "s.h.i.e.l.d.",
    "classification": "confidential",
    "count": 5,
    "avengers": [
      {
        "id": 1,
        "alias": "Iron Man",
        "name": "Tony Stark",
        "profile": "assets/iron-man.png",
        "description": "Inventor Tony Stark applies his genius for high-tech solutions to problems as Iron Man, the armored Avenger.",
        "level": 7
      },
      ...
    ]
  }
  
  /api/leaders
  ------------
  {
    "origin": "s.h.i.e.l.d.",
    "classification": "confidential",
    "count": 4,
    "leaders": [
      {
        "id": 10,
        "name": "Peggy Carter",
        "profile": "assets/peggy.png",
        "description": "co-founder of S.H.I.E.L.D.; First known executive director. Deceased.",
        "level": 10
      },
      ...
    ]
  }

  /api/ratings
  ------------
  [
    { "id": 1, "numberOfStars": 2 },
    { "id": 2, "numberOfStars": 2 },
    { "id": 3, "numberOfStars": 2 },
    { "id": 4, "numberOfStars": 2 },
    { "id": 5, "numberOfStars": 2 },
    { "id": 6, "numberOfStars": 2 },
    { "id": 10, "numberOfStars": 2 },
    { "id": 11, "numberOfStars": 2 },
    { "id": 12, "numberOfStars": 2 },
    { "id": 13, "numberOfStars": 2 },
    { "id": 100, "numberOfStars": 2 },
    { "id": 101, "numberOfStars": 2 },
    { "id": 102, "numberOfStars": 2 },
    { "id": 103, "numberOfStars": 2 }
  ]
  
  ******************************************************************/
}
