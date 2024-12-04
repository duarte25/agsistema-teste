import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsPositive } from 'class-validator';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsPositive({ message: 'O preço deve ser um valor positivo.' })
  @IsNotEmpty({ message: 'O preço é obrigatório.' })
  preco: number;

  @Column()
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  descricao: string;
}
