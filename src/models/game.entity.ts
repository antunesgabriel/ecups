import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LeagueEntity } from './league.entity';

@Entity({ name: 'games' })
export class GameEntity {
  @PrimaryGeneratedColumn({ name: 'game_id' })
  gameId: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  game: string;

  @Column({ nullable: false, type: 'varchar' })
  logo: string;

  // Relacionamentos

  @OneToMany(
    () => LeagueEntity,
    league => league.game,
  )
  leagues: LeagueEntity[];
}
