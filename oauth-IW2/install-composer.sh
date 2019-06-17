#! /bin/bash

docker-compose run auth-client php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
docker-compose run auth-client php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
docker-compose run auth-client php composer-setup.php --install-dir ./
docker-compose run auth-client php -r "unlink('composer-setup.php');"