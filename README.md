# Elite Treinos

## Tecnologias:
### Front-end
- ReactJs ^19.2.4
- TailwindCSS ^4.2.1
- Vite ^8.0.0
- React Router DOM ^7.13

### Back-end
- PHP ^8.2
- Laravel ^12.0
- Scramble (dedoc/scramble) ^0.13 (Docs API)

### Banco de Dados
- MySQL 8.0

## Configurando o projeto
### Back-end
- Acesse a pasta /backend no terminal
- Instale o PHP na versão ^8.2
- Instale o composer (no projeto foi usada a versão 2.9.5)
- Crie o banco de dados ```create database nome_db```
- Abra o cmd e execute os comandos:
    - ```composer install```
    - ```php artisan key:generate```
    - ```php artisan migrate --seed```

### Front-end
- Acesse a pasta /frontend no terminal
- Execute o comando ```npm install```
- Para inicializar o projeto, execute ```npm run dev```
- Acesse o projeto pelo link: http://localhost:5173

## Credenciais de Teste
- admin:
    - email: admin@teste.com
    - senha: admin
- personal:
    - email: personal@teste.com
    - senha: personal
- aluno:
    - email: client@teste.com
    - senha: client

## Documentação da API
- Para ver a documentação da api, acesse: http://localhost:8000/docs/api
    - Ou importe o arquivo ```/api_doc.json``` ou ```api.postman_collection.json``` no Postman

## Decisões Técnicas
### Banco de Dados
O sistema possui evidentes relacionamentos (Conta, Personal, Aluno...), então foi modelado no diagrama do Modelo Entidade-Relacionamento (ER) usando BR Modelo e usado MySQL como SGBD.

O diagrama ER está disponível está disponível no arquivo ```modelo_conceitual.brM3```

Notas:
- Não houve necessidade ID em Workouts, pois os treinos já eram pré-cadastrados e nenhum outro treino seria cadastrado. O treino foi identificado pelo código (A, B, C, D).
- As entidades Coaches e Clients foram identificadas pelo user_id->user.id por ser uma relação de 1:n.

### Back-end
#### Autenticação
Por se tratar de um projeto simples, foi utilizado sanctum - em um projeto de produção eu utilizaria JWT - com token do tipo Bearer e BCrypt para criptografia.

#### Documentação da API
Para a documentação da API foi utilizado a lib dedoc/scramble, pois problemas de compatibilidade não favoreceram o uso da lib Swagger/OpenAPI.

### Front-end
No front-end foi utilizado ReactJs com Vite para rodar o servidor.

Para uma melhor validação de dados, foi implementado junto ao React o TypeScript.

Para o CSS, o TailwindCSS foi escolhido para agilizar o desenvolvimento de um front-end sem um design planejado (no Figma, por exemplo).

Para consultas à API, foi usado Axios para simplificar a construção do serviço.

#### Estrutura
Diferente do back-end que seguiu mais no padrão do Laravel, no front-end foi criada uma arquitetura de pastas categorizadas:
- src
    - components: componentes globais que serão reutilizados.
    - contexts: contexts da aplicação, nesse caso, só o AuthContext para globalização da sessão, função de login e logout.
    - services: pasta para modularização de processos agrupados como consultas para API, CRUD e outras chamadas para a API.
    - styles/ui.ts: arquivo para centralizar as classes para elementos de interface (botão, texto...). Poderia também ser utilizado as próprias @utility do TailwindCSS.