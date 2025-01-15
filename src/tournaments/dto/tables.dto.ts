export class Club {
  name: string;
  shortName?: string;
  stadium: string;
  stadiumDescription: string;
  coach: string;
  logoURL: string;
  foundedYear: number;
}

class Tables {
  position: number;
  club: any;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAganst: number;
  goalDefference: number;
  point: number;
}
