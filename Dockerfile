FROM php:8.3-apache

# Install system dependencies + PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev          # required for PostgreSQL

# Install PostgreSQL PDO driver
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd pdo_pgsql \
    && docker-php-ext-enable pdo_pgsql

# Install Node.js 20 + npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

# Fix permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Frontend build
RUN npm install && npm run build

# Enable Apache rewrite module
RUN a2enmod rewrite

# Expose Render port
EXPOSE $PORT

CMD ["apache2-foreground"]