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
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // Rota POST para criar um novo produto
  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) // Aplica a validação
  async create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  // Rota GET para listar todos os produtos
  @Get()
  async findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  // Rota GET para obter um produto específico
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.findOne(id);
  }

  // Rota PUT para atualizar um produto
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() produto: Produto,
  ): Promise<Produto> {
    return this.produtoService.update(id, produto);
  }

  // Rota DELETE para deletar um produto
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.produtoService.remove(id);
  }
}
