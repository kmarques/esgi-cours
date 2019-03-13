#! /bin/bash

/usr/sbin/sshd

rsync --daemon

#if [ ! -e /etc/dhparam.key ]; then
#   openssl dhparam -out /etc/dhparam.key 4096
#fi

nginx

php-fpm7.0 -D
