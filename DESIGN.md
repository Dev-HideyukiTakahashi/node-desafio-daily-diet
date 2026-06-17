# Design da Aplicação:

Este documento descreve a estrutura, rotas e regras de negócio da API.

## 📋 Requisitos / 🛣️ Rotas

- [ ] Criar usuário
  - Usuários são identificados automaticamente via 'session_id' (armazenado em cookie) a cada requisição
- [ ] Identificar o usuário entre as requisições
  - Identificação única do usuário via 'session_id' persistido em cookie.
- [x] Registrar uma refeição feita
  - POST - /meals
- [ ] Editar uma refeição
  - PUT - /meals
- [ ] Apagar uma refeição
  - DELETE - /meals
- [x] Listar todas as refeições de um usuário
  - GET - /meals
- [x] Visualizar uma única refeição
  - GET - /meals/:id
- [ ] Recuperar as métricas de um usuário
  - GET - /meals/metrics
  - Retorna um objeto JSON contendo os quatro indicadores : **total, totalOnDiet, totalOffDiet, bestOnDietSequence**
- [ ] O usuário só pode visualizar, editar e apagar as refeições
  - Tratar com session id

## 🗄️ Modelo de Dados

### Table: Meal

---

| Campo           | Tipo      | Descrição                            |
| --------------- | --------- | ------------------------------------ |
| id              | uuid      | Identificador único da refeição (PK) |
| name            | string    | Nome da refeição                     |
| description     | string    | Detalhes da refeição                 |
| date            | timestamp | Data e hora da refeição              |
| within_the_diet | boolean   | Indica se está na dieta (true/false) |
| session_id      | string    | Identificador do usuário (FK/Cookie) |
| created_at      | timestamp | Data de registro no sistema          |
