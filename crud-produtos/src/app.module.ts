import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Altere se necessário
      port: 5432,
      username: 'usuario', // Substitua pelo seu usuário
      password: 'senha', // Substitua pela sua senha
      database: 'produtos_db', // Nome do banco de dados
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Certifique-se de que isso está correto
      synchronize: true,
    }),
    ProdutoModule,
  ],
})
export class AppModule {}
