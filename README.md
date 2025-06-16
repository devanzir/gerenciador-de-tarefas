
Sistema de Gerenciamento de Tarefas

Sistema simples para gerenciar tarefas com:

- Backend em "PHP Laravel 9"
- Frontend em "React + Vite"
- Banco de dados "MySQL"
- API "RESTful" e interface web responsiva

Funcionalidades do projeto:

- cadastar nova tarefas 
- Listar todas as tarefas
- Visualizar detalher de uma tarefa 
- Atualizar uma tarefa 
- Marcar como concluida 
- Excluir tarefas 

Tecnologias Utilizadas:

- Backend: PHP, Laravel 9
- Banco: MySQL
- Frontend: React, Vite, CSS
- API: JSON RESTful

*  Clonar o repositório,
BASH
- git clone (https://github.com/devanzir/gerenciador-de-tarefas/edit/main)
- cd gerenciador-de-tarefas

Configurar o Backend (LARAVEL):

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

* Versão do Laravel : Foi utilizada a versão 9.x, compatível com PHP 8.0.

* CORS : O pacote fruitcake/laravel-cors foi instalado para permitir requi* sições do frontend React.

* API Fetch: O frontend consome a API utilizando fetch, sem bibliotecas externas.
* Estilo : Estilização simples com CSS puro para facilitar a manutenção.

Testes:

* Postman — para testar os endpoints da API.
