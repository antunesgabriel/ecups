import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LeagueEntity } from './league.entity';

// Tipo de liga: mata-mata, copa, pontos corridos
@Entity({ name: 'league_type' })
export class LeagueTypeEntity {
  @PrimaryGeneratedColumn({ name: 'leaguetype_id' })
  leagueTypeId: number;

  @Column({ nullable: false })
  type: string;

  //Relacionamentos
  @OneToMany(
    () => LeagueEntity,
    league => league.leagueType,
  )
  leagues: LeagueEntity[];
}
