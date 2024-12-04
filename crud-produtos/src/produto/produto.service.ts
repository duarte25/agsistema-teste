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

  // Função de validação de preço centralizada no serviço, tinha mudado para o controller mas não precisa
  private validatePreco(preco: number) {
    const precoStr = preco.toString();
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(precoStr)) {
      throw new BadRequestException(
        'O preço deve ter no máximo duas casas decimais.',
      );
    }

    if (preco <= 0) {
      throw new BadRequestException('O preço deve ser maior que zero.');
    }
  }

  // Criar um novo produto
  async create(produto: Produto): Promise<Produto> {
    // Valida preço antes de criar o produto
    this.validatePreco(produto.preco);

    return this.produtoRepository.save(produto);
  }

  // Obter todos os produtos
  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  // Obter um produto por id
  async findOne(id: number): Promise<Produto> {
    return this.produtoRepository.findOne({
      where: { id },
    });
  }

  // Atualizar um produto com PUT
  async update(id: number, produto: Produto): Promise<Produto> {
    // Valida preço antes de atualizar o produto, (fundamental)
    this.validatePreco(produto.preco);

    await this.produtoRepository.update(id, produto);
    return this.findOne(id);
  }

  // Remover um produto
  async remove(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
