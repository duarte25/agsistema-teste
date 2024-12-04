import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async create(produto: Produto): Promise<Produto> {
    // Verificação extra de preço
    if (produto.preco <= 0) {
      throw new BadRequestException('O preço deve ser maior que zero.');
    }
    return this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async findOne(id: number): Promise<Produto> {
    return this.produtoRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, produto: Produto): Promise<Produto> {
    await this.produtoRepository.update(id, produto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
