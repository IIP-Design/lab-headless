#!/bin/bash

echo -e "\n\xF0\x9F\x96\xA5  Stopping the development server.\n"

docker-compose -f docker-compose-caddy.yml stop caddy