import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsPositive, Matches } from 'class-validator';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsPositive({ message: 'O preço deve ser um valor positivo.' })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'O preço deve ter no máximo duas casas decimais.',
  })
  preco: number;

  @Column()
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  descricao: string;
}
