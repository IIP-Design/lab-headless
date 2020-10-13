FROM amazonlinux:latest

LABEL Name=gpalab/mariadb Version=0.0.1

ENV MYSQL_CONF /etc/my.cnf.d/server.cnf

# Add mariadb repo to yum package manager.
RUN echo -e "[repo] \nname = MariaDB \nbaseurl = http://yum.mariadb.org/10.1/centos7-amd64 \ngpgkey = https://yum.mariadb.org/RPM-GPG-KEY-MariaDB \nenabled = 1 \ngpgcheck = 1" > /etc/yum.repos.d/mariadb.repo

# Install MariaDB​.
RUN yum -y install hostname
RUN yum -y install MariaDB-server

# Open connections on all interfaces.
RUN sed -i 's/\#bind-address=0.0.0.0/bind-address=0.0.0.0/g' $MYSQL_CONF

# Define mountable directories.
VOLUME ["/etc/mysql", "/var/lib/mysql"]

# Expose instance to external traffic on port 3306.
EXPOSE 3306

# Start container by enabling mariadb server.
CMD ["mysqld_safe"]​