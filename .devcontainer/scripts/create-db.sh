#!/bin/bash

echo -e "\n\xF0\x9F\x97\x84  Creating DB...\n"

# Drop lab DB if it exists, (re)create it, and create lab_dev user
docker exec -i lab_db mysql -e "DROP DATABASE IF EXISTS lab_dev"
docker exec -i lab_db mysql -e "CREATE DATABASE lab_dev;"
docker exec -i lab_db mysql -e "CREATE USER IF NOT EXISTS lab_dev@localhost IDENTIFIED BY 'lab_dev';"
docker exec -i lab_db mysql -e "GRANT ALL ON lab_dev.* TO 'lab_dev'@'%' IDENTIFIED BY 'lab_dev';"
docker exec -i lab_db mysql -e "FLUSH PRIVILEGES;"
docker exec -i lab_db mysql --database=lab_dev < wordpress/lab_dev.sql

echo -e "\xE2\x9C\x94  DB created.\n"