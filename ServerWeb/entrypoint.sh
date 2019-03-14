#! /bin/bash

/usr/sbin/sshd

rsync --daemon

nginx

php-fpm7.0 -D

fail2ban-client start

pg_ctlcluster 9.6 main start
