
Sistema de Gerenciamento de Tarefas

Sistema simples para gerenciar tarefas com:

- Backend em "PHP Laravel 9"
- Frontend em "React + Vite"
- Banco de dados "MySQL"
- API "RESTful" e interface web responsiva

Funcionalidades do projeto:

1. Cadastrar nova tarefa
2. Listar todas as tarefas
3. Visualizar detalhes de uma tarefa
4. Atualizar uma tarefa
5. Marcar como concluída
6. Excluir tarefas

Tecnologias Utilizadas:

- Backend: PHP, Laravel 9
- Banco: MySQL
- Frontend: React, Vite, CSS
- API: JSON RESTful

Como executar o projeto:

1. Clonar o repositório:
-bash
-git clone https://github.com/devanzir/gerenciador-de-tarefas.git
-cd gerenciador-de-tarefas

2. Configurar o Backend (Laravel):
- bash
- cd tasks-api
- composer install
- cp .env.example .env
- php artisan key:generate

3. Configurar o banco de dados no .env:

- DB_CONNECTION=mysql
- DB_HOST=127.0.0.1
- DB_PORT=3306
- DB_DATABASE=tasks_db
- DB_USERNAME=seu_usuario
- DB_PASSWORD=sua_senha

4. Rodar as migrations e iniciar o servidor:
- bash
- php artisan migrate
- php artisan serve

Acesse: http://localhost:8000/api/tasks

5. Configurar o Frontend (React):
- bash
- cd tasks-api/frontend
- npm install
- npm run dev

 * Acesse: http://localhost:5173

Observações Técnicas:

- Versão do Laravel: Utilizada a versão 9.x, compatível com PHP 8.0.
  
- CORS: O pacote fruitcake/laravel-cors foi instalado para permitir requisições do frontend React.
  
- API Fetch: O frontend consome a API utilizando fetch, sem bibliotecas externas.
  
- Estilo: Estilização simples com CSS puro para facilitar a manutenção.

Testes:

- Postman — para testar os endpoints da API.


PROJETO:

BACKEND:

![alt text](image.png)

FRONTEND:

![alt text](image-1.png)
