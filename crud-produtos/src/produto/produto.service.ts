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

  // Função de validação centralizada
  private validateProduto(produto: Produto) {
    const errors = [];

    // Validação do nome
    if (!produto.nome || produto.nome.trim() === '') {
      errors.push('O nome do produto não pode ser vazio.');
    }

    // Validação do preço
    const precoStr = produto.preco.toString();
    const regex = /^\d+(\.\d{1,2})?$/;

    if (!regex.test(precoStr)) {
      errors.push('O preço deve ter no máximo duas casas decimais.');
    }

    if (produto.preco <= 0) {
      errors.push('O preço deve ser maior que zero.');
    }

    // Se houver erros, lançar exceção
    if (errors.length > 0) {
      throw new BadRequestException({
        data: [],
        error: true,
        code: 400,
        message: 'Erro de validação',
        errors: errors.map((msg) => ({
          field: 'produto',
          errors: [msg],
        })),
      });
    }
  }

  // Criar um novo produto
  async create(produto: Produto): Promise<Produto> {
    this.validateProduto(produto);
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
    this.validateProduto(produto);
    await this.produtoRepository.update(id, produto);
    return this.findOne(id);
  }

  // Remover um produto
  async remove(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
