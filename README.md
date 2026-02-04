<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en dev

1. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
2. Clonar el repositorio
3. Instalar las dependencias del proyecto usando el siguiente comando
```
  npm install
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env```
6. Llenar las variables de entorno definidas en el ```.env```
7. Ejecutar la aplicacion en dev
```
npm run start:dev
```
5. Reconstruir la base de datos con el seed (Correr solo en desarrollo)
```
localhost:3000/api/v2/seed
```

## Stack
* MongoDB
* NestJs
* TypeScript