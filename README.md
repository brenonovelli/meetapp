<h1 align="center">

![](.github/assets/logo.png)

</h1>

<h3 align="center">
  Meetapp, um acrônimo à Meetup + App, é um app agregador de eventos para desenvolvedores.
</h3>

## **Instalação**

- Postgres - Banco de dados principal  
  `docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
- Mongo - Banco de dados para notificações  
  `docker run --name mongobarber -p 27017:27017 -d -t mongo`
- Redis - Banco de dados para filas  
  `docker run --name redisbarber -p 6379:6379 -d -t redis:alpine`

- Sequelize  
  `yarn sequelize db:migrate`  
  `yarn sequelize db:seed:all`

- Usuários testes:

  ```
  user: breno@breno.com.br
  pass: 123456
  ```

  ```
  user: `gabi@gabi.com.br`
  pass:  `123456`
  ```

  ```
  user: `rafael@rafael.com.br`
  pass:  `123456`
  ```

  ```
  user: `thiago@thiago.com.br`
  pass:  `123456`
  ```

  ```
  user: `bart@bart.com.br`
  pass:  `123456`
  ```

## **Backend**

`yarn dev`
`yarn queue`

## **Frontend**

`yarn start`

## **Mobile**

`react-native run-ios`
