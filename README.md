# Ecups

Ecups é uma aplicação para gestão de campeonatos de e-sports.
O intuito dela é ser rápido! Sem muitas burocracias, é destinada
a gamers comuns que querem jogar um campeonato amador com seus parças
no final de semana <3.

Sou um apaixonado por novos conhecimentos, então em cada projeto me encarreguei de testar novas tecnologias e me aperfeicoar em algumas que eu ja conhecia =D.

## Partes do Ecups:

- 1 [Api - Em Andamento - (NestJS, MongoDB, Postgresql, Typescript, Docker Compose)](https://github.com/antunesgabriel/ecups)
- 2 [Front Web - Em Andamento - (ReactJS, Material-ui)](https://github.com/antunesgabriel/ecups-front)
- 3 [App - Em Andamento - (React Native, Typescript, React Native UI Kitten, Git Flow)](https://github.com/antunesgabriel/ecups-app)

## Preparando Ambiente

```bash
$ git clone https://github.com/antunesgabriel/ecups && cd ecups
$ yarn ou npm i
$ cp ./env.example ./.env
$ gedit (ou vim, vi, nano) ./.env
```

### Envrioment:

```env
APP_URL=http://localhost:3333 - Host da api
APP_DB_HOST=127.0.1.1 - Host do banco
APP_DB_PORT=5432 - Porta do banco
APP_DB_USER= - Usuario do banco
APP_DB_PASS= - Senha do banco
APP_DB_NAME=ecups - Nome do banco
APP_PORT=3333 - Porta do api

CONF_PASS_SALT=7 - Numero de salt pra criptografia de senha
CONF_PASS_SALT_MEMBER= - Numero de salt pra criptografia de senha
CONF_KEY= - Aqui ficara salva a key para gerar um admin
APP_JWT_SECRET=secret - Palavra chave do JsonWebToken
APP_JWT_EXPIRE=7d - Tempo de vida do token

MONGODB_CONNECT_URL=mongodb://USER:PASS@127.0.1.1:27017 - Url do mongodb (Mude USER pelo nome do usuario e PASS pela senha)
MONGODB_DBNAME=ecups - Nome do base
MONGODB_PORT=27017 - Porta do mongodb
MONGODB_USER= - Usuario do banco
MONGODB_PASS= - Senha do banco

HASH_DOMAIN_LENGTH=7 - Largura para hash do dominio
```

### Subindo os containers:

```console
$ docker-compose up -d
```

### Gerando a key para criar um admin (usado em /admin/signup no front)

```console
$ node ./generate.js
? Digite a key:  ecups // KEY
Adcione esta KEY em CONF_KEY no .env: $2a$08$Thr6qRRykq6ZwwKAnOHPqeHRmk2lAzrr0piHo0wlL6PQyFkut5uHu // Token da key
```

Adcione o token da key gerada como valor de CONF_KEY no .env

### Rodando App

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
