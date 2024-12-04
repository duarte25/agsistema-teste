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

  // Função de validação de preço centralizada no serviço
  private validatePreco(preco: number) {
    const precoStr = preco.toString();
    const regex = /^\d+(\.\d{1,2})?$/;
    const errors = [];

    if (!regex.test(precoStr)) {
      errors.push('O preço deve ter no máximo duas casas decimais.');
    }

    if (preco <= 0) {
      errors.push('O preço deve ser maior que zero.');
    }

    // Se houver erros, lançar a exceção com os erros no formato de array
    if (errors.length > 0) {
      throw new BadRequestException({
        message: errors,
        error: 'Bad Request',
        statusCode: 400,
      });
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
    // Valida preço antes de atualizar o produto
    this.validatePreco(produto.preco);

    await this.produtoRepository.update(id, produto);
    return this.findOne(id);
  }

  // Remover um produto
  async remove(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
