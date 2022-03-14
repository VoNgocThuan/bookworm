Step 1: Install packages by running command
    composer install
    npm install
Step 2: Rename .env.example to .env
Step 3: Generate app key by running command:
    php artisan key:generate
Step 4: Migrate & seed database by running command:
    php artisan migrate:fresh --seed
Step 5: Run server by running command
    php artisan serve
Step 6: Mix project by running command
    npm run watch