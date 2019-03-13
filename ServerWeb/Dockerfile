FROM debian

RUN apt-get update && apt-get install -y openssh-server \
          sudo \
          procps net-tools \
          nano vim

RUN mkdir /run/sshd

RUN useradd -m admin

RUN usermod -a -G sudo admin

RUN echo "admin:test" | chpasswd

COPY ./sshkey.pub /home/admin/.ssh/authorized_keys

EXPOSE 22

RUN apt-get install -y rsync

EXPOSE 873

RUN echo " \
lock file = /var/run/rsync.lock \
log file = /var/log/rsyncd.log \
pid file = /var/run/rsyncd.pid \
" > /etc/rsyncd.conf

RUN echo ". /root/entrypoint.sh" >> /root/.profile
RUN echo ". /root/entrypoint.sh" >> /root/.bashrc

RUN apt-get install -y nginx

EXPOSE 80
EXPOSE 443

RUN apt-get install -y php-fpm php-pgsql php-zip php-intl
RUN mkdir /run/php

RUN apt-get install openssl
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
             -keyout /etc/ssl/private/selfsigned.key \
             -out /etc/ssl/certs/selfsigned.crt \
             -subj '/CN=monsitessl.fr/O=My Company Name LTD./C=US'
RUN openssl dhparam -out /etc/nginx/dhparam.pem 1024
RUN echo " \
ssl_certificate /etc/ssl/certs/selfsigned.crt; \
ssl_certificate_key /etc/ssl/private/selfsigned.key;" > /etc/nginx/snippets/selfsigned.conf
COPY ./nginx/ssl/ssl-params.conf /etc/nginx/snippets/ssl-params.conf

COPY ./nginx/www /var/www
COPY ./nginx/vhost /etc/nginx/sites-available

RUN ln -s /etc/nginx/sites-available/monsite.fr /etc/nginx/sites-enabled/monsite.fr
RUN ln -s /etc/nginx/sites-available/monsitephp.fr /etc/nginx/sites-enabled/monsitephp.fr
RUN ln -s /etc/nginx/sites-available/monsitessl.fr /etc/nginx/sites-enabled/monsitessl.fr

COPY ./entrypoint.sh /root/entrypoint.sh
