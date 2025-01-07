# EADToolz - Plataforma de Cursos EAD

Uma plataforma moderna de ensino à distância com interface estilo Netflix e sistema de gamificação.

## Características Principais

- Interface inspirada na Netflix para melhor experiência do usuário
- Sistema de gamificação para engajamento dos alunos
- Três níveis de acesso: Aluno, Professor e Administrador
- Sistema de streaming de vídeo otimizado
- Acompanhamento de progresso em tempo real
- Sistema de conquistas e recompensas

## Requisitos Técnicos

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

## Configuração do Ambiente

1. Clone o repositório
2. Crie um ambiente virtual Python:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure as variáveis de ambiente no arquivo .env
5. Execute as migrações:
   ```bash
   python manage.py migrate
   ```
6. Inicie o servidor:
   ```bash
   python manage.py runserver
   ```

## Estrutura do Projeto

```
eadtoolz/
├── backend/           # Django backend
│   ├── apps/         # Aplicações Django
│   ├── core/         # Configurações principais
│   └── api/          # APIs REST
├── frontend/         # React frontend
└── docs/            # Documentação
```
