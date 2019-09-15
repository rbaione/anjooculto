# Anjo Oculto

Repositorio destinado ao projeto Startup One da FIAP - Anjo Oculto

O projeto busca o desenvolvimento de aplicativo que irá permitir a parametrização de dispositivos monitorados realizando a análise da utilização do mesmo, informando ao administrador o nível de sentimento da utilização, indicando prováveis situações de depressão e possível suicídio.

## Execução do Projeto - Cadastro de Dispositivos

O projeto pode ser executado em Docker e para isso utilizamos o Play Docker, para o modulo de testes é necessário utilizar o Visual Studio com o Maven.

### Executando o Docker

Acessar o website [Play Docker](https://labs.play-with-docker.com/):

```
https://labs.play-with-docker.com/
```

Realizar o login e iniciar adicionar nova instancia.

No console iniciado, primeiramente criar uma network, para isso insira o código abaixo e tecle enter:

```
docker network create anjo-net
```

Após isso, iniciar o Docker do MongoDB:

```
docker run -d -p 27017:27017 --network=anjo-net --name mongodb mongo
```

Finalmente executar o Docker do projeto que está disponivel no Docker HUB:

* [Docker HUB](https://cloud.docker.com/repository/docker/rbaione/anjooculto) -- Anjo Oculto

```
docker run --name anjooculto -it -p 5000:5000 --network=anjo-net -d rbaione/anjooculto
```

Após executar os dois Dockers ficará disponivel dois links no topo do console, clicar no link de nome 5000.

Com isso será executado o cadastro e manutenção de Dispositivos.

### Testes Utilizando o Maven

Na pasta bddfiap estão os arquivos necessários para execução dos testes utilizando o Maven.
