FROM amazonlinux:latest

LABEL Name=gpalab/wordpress Version=0.0.1

# Define variables.
ENV HTTPD_CONF /etc/httpd/conf/httpd.conf
ENV FPM_POOL /etc/php-fpm.d/www.conf
ENV FPM_CONF /etc/php-fpm.conf
ENV PHP_CONF /etc/php.ini
ENV TZ America/New_York

# Install dependencies (Apache, PHP).
RUN yum update -y && \
  amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2 && \
  yum install -y httpd httpd-tools procps php-cli php-common \
  php-fpm php-gd php-json php-mbstring php-mcrypt php-mysqlnd \
  php-pdo php7.2-pdo-dblib php-xml php-xmlrpc php-zip && \
  yum clean all

# Add deploy user.
RUN groupadd -g 1001 deploy && \
  useradd -r -u 1001 -g deploy deploy

# Create directory for site and give deploy user permissions to it.
RUN mkdir -p /www/local/sites-enabled/lab_dev
RUN chown -R deploy:deploy /www/local/sites-enabled/lab_dev

# Customize PHP settings.
RUN sed -i 's/user = apache/user = deploy/g' $FPM_POOL && \
  sed -i 's/group = apache/user = deploy/g' $FPM_POOL && \
  sed -i 's/;listen.owner = nobody/listen.owner = deploy/g' $FPM_POOL && \
  sed -i 's/;listen.group = nobody/listen.group = deploy/g' $FPM_POOL && \
  sed -i 's/;listen.mode = 0660/listen.mode = 0660/g' $FPM_POOL && \
  sed -i 's/listen.acl_users = apache,nginx/;listen.acl_users = apache,nginx/g' $FPM_POOL && \
  # php-fpm.conf
  sed -i 's/error_log = \/var\/log\/php-fpm\/error.log/error_log = \/proc\/self\/fd\/2/g' $FPM_CONF && \
  sed -i 's/\/var\/log\/php-fpm\/www-error.log/\/proc\/self\/fd\/2/g' $FPM_CONF && \
  # php.ini
  sed -i 's/memory_limit = 128M/memory_limit = 256M/g' $PHP_CONF && \
  sed -i 's/;date.timezone =/date.timezone = "America\/New_York"/g' $PHP_CONF

# Customize Apache settings.
RUN sed -i 's/var\/www\/html/www\/local\/sites-enabled\//g' $HTTPD_CONF && \
  sed -i 's/User apache/User deploy/g' $HTTPD_CONF && \
  sed -i 's/Group apache/Group deploy/g' $HTTPD_CONF

# Link error logs to docker logs.
RUN ln -sf /dev/stdout var/log/httpd/error.log
RUN ln -sf /dev/stdout var/log/httpd/lab_error.log
RUN ln -sf /dev/stdout var/log/httpd/lab_access.log

# Set timezone on instance.
RUN ln -snf /user/share/zoneinfo/$TZ /etc/localtime 

# Expose instance to external traffic on port 80.
EXPOSE 80

# Start container by enabling Apache and PHP.
CMD /usr/sbin/php-fpm -D; /usr/sbin/httpd -D FOREGROUND;