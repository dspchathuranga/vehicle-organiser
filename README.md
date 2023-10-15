# Vehicle Organiser

The Vehicle Organiser System is a React Redux project designed for managing vehicles data. This README provides an overview of the project and instructions on how to set it up using Docker Compose.

#### [Check out the Documentation in GitHub Pages site](https://dspchathuranga.github.io/vehicle-organiser/)

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Accessing API Documentation](#accessing-api-documentation)
- [Running Tests](#running-tests)

## Project Overview

The Vehicle Organiser System is a React Redux application that provides CRUD (Create, Read, Update, Delete) operations for vehicle data.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [node](https://nodejs.org/en/download) 14 or later 
- [nmp](https://nodejs.org/en/download) 6 or later
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To get started with the Student Management System, follow these steps:

1. Clone the repository to your local machine:

    ```sh
    git clone https://github.com/dspchathuranga/vehicle-organiser.git
    ```
    
2. You can change env `Dockerfile` file in the project directory:

    ```Dockerfile
    FROM node:18-alpine

    WORKDIR /app

    COPY package.json .
    
    RUN npm install
    
    COPY . .
    
    EXPOSE 3000 4000
    
    # CMD ["npm", "run", "prod"]
    CMD ["npm", "run", "dev"]
    ```
3. You can change port's and image version `docker-compose.yaml` file in the project directory:

    ```yaml
    version: "3.8"
    services:
      vehicle-organiser:
      build: .
      container_name: vehicle-organiser
      image: vehicle-organiser-image:1.0
      ports:
        - "3000:3000"  # React app port
        - "4000:4000"  # JSON Server port
      #stdin_open: true
    ```
    
4. Start the application and database services using Docker Compose:

    ```sh
    docker-compose up
    ```

The application will be accessible at `http://localhost:3000`

<!-- 
## Running Tests

Testing is an essential part of ensuring the quality and correctness of the Student Management System. We use [JUnit](https://junit.org/junit5/) in combination with [Spring Test](https://spring.io/guides/gs/testing/).

Before running the tests, make sure the `application.properties` configuration:

```properties
# Database Configuration
spring.datasource.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/postgres}
spring.datasource.username=${DATABASE_USERNAME:postgres}
spring.datasource.password=${DATABASE_PASSWORD:postgres}

# Flyway Configuration
spring.flyway.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/postgres}
spring.flyway.user=${DATABASE_USERNAME:postgres}
spring.flyway.password=${DATABASE_PASSWORD:postgres}
```

#### Using Maven

For Maven-based projects, execute the following command in your project's root directory:

```shell
mvn test
``` -->

## Contributing

If you would like to contribute to the project, please submit a pull request. We welcome your contributions and ideas.

---

© 2023 DSP Chathuranga

