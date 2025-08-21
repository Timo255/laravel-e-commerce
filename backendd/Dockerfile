FROM php:8.2 as php

WORKDIR /var/www

RUN apt-get update && apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libmcrypt-dev libpng-dev
RUN docker-php-ext-install -j$(nproc) pdo_mysql


COPY composer.lock composer.json ./    

COPY . .

# COPY --from=composer:2.3.5 /usr/bin/composer /usr/bin/composer

ENV PORT=8000
ENTRYPOINT [ "docker/entrypoint.sh" ]
