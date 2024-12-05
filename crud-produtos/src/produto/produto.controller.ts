import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ValidationPipe,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // Rota POST para criar um novo produto
  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) // Aplica a validação
  async create(@Body() produto: Produto): Promise<any> {
    try {
      const novoProduto = await this.produtoService.create(produto);
      return {
        data: [novoProduto],
        error: false,
        code: 201,
        message: 'Produto criado com sucesso.',
        errors: [],
      };
    } catch (err) {
      return {
        data: [],
        error: true,
        code: 400,
        message: 'Erro ao criar o produto.',
        errors: [err.message],
      };
    }
  }

  // Rota GET para listar todos os produtos
  @Get()
  async findAll(): Promise<any> {
    try {
      const produtos = await this.produtoService.findAll();
      return {
        data: produtos,
        error: false,
        code: 200,
        message: 'Produtos listados com sucesso.',
        errors: [],
      };
    } catch (err) {
      return {
        data: [],
        error: true,
        code: 400,
        message: 'Erro ao listar os produtos.',
        errors: [err.message],
      };
    }
  }

  // Rota GET para obter um produto específico
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    try {
      const produto = await this.produtoService.findOne(id);
      if (!produto) {
        throw new NotFoundException(`Produto com id ${id} não encontrado.`);
      }
      return {
        data: [produto],
        error: false,
        code: 200,
        message: 'Produto encontrado com sucesso.',
        errors: [],
      };
    } catch (err) {
      return {
        data: [],
        error: true,
        code: err instanceof NotFoundException ? 404 : 400,
        message: err.message,
        errors: [err.message],
      };
    }
  }

  // Rota PUT para atualizar um produto
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() produto: Produto,
  ): Promise<any> {
    try {
      const produtoAtualizado = await this.produtoService.update(id, produto);
      return {
        data: [produtoAtualizado],
        error: false,
        code: 200,
        message: 'Produto atualizado com sucesso.',
        errors: [],
      };
    } catch (err) {
      return {
        data: [],
        error: true,
        code: 400,
        message: 'Erro ao atualizar o produto.',
        errors: [err.message],
      };
    }
  }

  // Rota DELETE para deletar um produto
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      await this.produtoService.remove(id);
      return {
        data: [],
        error: false,
        code: 200,
        message: `Produto com id ${id} removido com sucesso.`,
        errors: [],
      };
    } catch (err) {
      return {
        data: [],
        error: true,
        code: 400,
        message: `Erro ao remover o produto com id ${id}.`,
        errors: [err.message],
      };
    }
  }
}
