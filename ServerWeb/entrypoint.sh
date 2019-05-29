#! /bin/bash

/usr/sbin/sshd > /dev/null 2>&1

rsync --daemon > /dev/null 2>&1

nginx > /dev/null 2>&1

php-fpm7.0 -D > /dev/null 2>&1

fail2ban-client start > /dev/null 2>&1

pg_ctlcluster 9.6 main start > /dev/null 2>&1

postfix start > /dev/null 2>&1

proftpd > /dev/null 2>&1

bash /opt/.init_db.sh > /dev/null 2>&1

bash /opt/.init_ufw.sh > /dev/null 2>&1

echo "Initialization completed"

exec "$@"
