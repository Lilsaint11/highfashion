FROM php:8.3-apache

# Install system dependencies + PostgreSQL driver
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip libpq-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd pdo_pgsql

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Fix permissions (important for Laravel)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Build frontend
RUN npm install && npm run build

# Enable Apache rewrite
RUN a2enmod rewrite

# Set Apache DocumentRoot to public
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf \
    && sed -i 's|<Directory /var/www/html>|<Directory /var/www/html/public>|g' /etc/apache2/sites-available/000-default.conf \
    && echo "DirectoryIndex index.php" >> /etc/apache2/apache2.conf

# Expose dynamic Render port
EXPOSE 10000

# 🚀 Run cache clear + migrations at container startup (NOT build time)
CMD ["sh", "-c", "php artisan optimize:clear && php artisan migrate --force && apache2-foreground"]