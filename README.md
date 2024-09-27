
# core-frontend

## Descrição
Este é um projeto de frontend desenvolvido com Next.js, Tailwind CSS, e outras bibliotecas modernas para criar um aplicativo de gerenciamento de notas. O projeto inclui funcionalidades de autenticação, gerenciamento de notas e uma interface de usuário responsiva.

## Docker

### O que é Docker?
Docker é uma plataforma que permite criar, implantar e executar aplicações em containers. Um container é uma unidade de software que empacota código e todas as suas dependências, permitindo que a aplicação rode de forma rápida e confiável em diferentes ambientes. 

Com o Docker, você pode garantir que seu projeto terá o mesmo comportamento em qualquer lugar que ele for executado, seja na sua máquina de desenvolvimento, em um servidor ou em uma nuvem.

### Por que usamos Docker neste projeto?
Usar Docker neste projeto ajuda a isolar o ambiente de execução e evita problemas de incompatibilidade de versões ou configurações do sistema. Além disso, facilita a configuração do ambiente para outros desenvolvedores que queiram contribuir com o projeto.

### Executando o Projeto com Docker

Você pode construir e executar este projeto em um container Docker. Certifique-se de ter o Docker instalado em sua máquina. Siga os passos abaixo:

#### 1. Construir a imagem Docker
No diretório raiz do projeto, execute o comando abaixo para construir a imagem Docker:

```sh
docker build -t core-frontend-app .
```

Este comando cria uma imagem Docker chamada `core-frontend-app` com base no `Dockerfile` que configuramos. A imagem inclui todo o código-fonte e dependências do projeto.

#### 2. Executar o container
Depois de construir a imagem, execute o seguinte comando para iniciar o aplicativo em um container:

```sh
docker run -p 3000:3000 core-frontend-app
```

Este comando cria e inicia um container a partir da imagem `core-frontend-app`, mapeando a porta `3000` do container para a porta `3000` da sua máquina local. Depois de executar este comando, você pode acessar o aplicativo no navegador através de [http://localhost:3000](http://localhost:3000).

### Parando o Container
Para parar o container, pressione `CTRL + C` no terminal onde o container está sendo executado. Como alternativa, você pode listar e parar containers em execução com os comandos:

```sh
docker ps
docker stop <CONTAINER_ID>
```

#### 3. Limpando Recursos do Docker
Depois de trabalhar com containers e imagens, você pode limpar recursos não utilizados para liberar espaço no seu sistema:

```sh
docker system prune
```

### Outras Opções do Docker
- **Rodar em segundo plano:** Para executar o container em segundo plano (modo daemon), use o comando: `docker run -d -p 3000:3000 core-frontend-app`.
- **Entrar no container:** Para acessar o terminal do container em execução, use: `docker exec -it <CONTAINER_ID> /bin/sh`.

## Instalação (Método Tradicional)
Se você preferir não usar Docker, siga os passos abaixo para instalar e executar o projeto localmente:

Clone o repositório:
```sh
git clone https://github.com/herickmds/core-frontend.git
cd seu-repositorio
```

Instale as dependências:
```sh
npm install
```

Execute o servidor de desenvolvimento:
```sh
npm run dev
```

Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

## Scripts Disponíveis
No diretório do projeto, você pode executar:

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm start`: Inicia o servidor de produção.

## Tecnologias Utilizadas
- **Next.js** - Framework React para produção.
- **Tailwind CSS** - Framework CSS utilitário.
- **Axios** - Cliente HTTP para fazer requisições.
- **Yup** - Biblioteca para validação de esquemas.
- **React Hook Form** - Gerenciamento de formulários em React.

## Funcionalidades
- Autenticação de usuários (login e registro).
- Gerenciamento de notas (criação, visualização, edição e exclusão).
- Interface de usuário responsiva.
- Validação de formulários.

## Contribuição
Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Envie para o repositório remoto (`git push origin feature/nova-feature`).
5. Abra um pull request.

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---
Criado por Herick Marçal dos Santos
