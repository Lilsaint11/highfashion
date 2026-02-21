FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf \
    && sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/conf-available/*.conf

RUN a2enmod rewrite
RUN chown -R www-data:www-data storage bootstrap/cache

RUN composer install --no-dev --optimize-autoloader

# Try frontend build in different locations
RUN if [ -f package.json ]; then npm install && npm run build; \
    elif [ -f frontend/package.json ]; then cd frontend && npm install && npm run build && cd ..; \
    elif [ -f resources/js/app.jsx ]; then npm install && npm run build; \
    else echo "No frontend found - skipping build"; fi

RUN a2enmod rewrite

EXPOSE $PORT

CMD ["apache2-foreground"]