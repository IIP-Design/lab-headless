#!/bin/bash

echo -e "\n\xF0\x9F\x94\xA7 Generating the web server Docker image...\n"

# Build the web server image
docker build -t gpalab/wordpress ./wordpress

echo -e "\n\xF0\x9F\x94\xA7 Generating the database Docker image...\n"

# Build the database image
docker build -t gpalab/mariadb ./mariadb