DIR="/www/local/sites-enabled/lab_dev"

# Copy webroot into the WordPress container
echo "\xF0\x9F\x92\xBE Cloning the webroot into the container...\n"

docker cp ../webroot/. lab_web:$DIR/

# Delete the Google login and hide login plugins, since neither is needed for development
echo "\xF0\x9F\xA7\xB9 Removing plugins not needed for development.\n"

docker exec -i lab_web sed -i '/wpackagist-plugin\/google-apps-login/d' $DIR/composer.json
docker exec -i lab_web sed -i '/iip-design\/wp-hide-login-form/d' $DIR/composer.json

# Run Composer to install WordPress and all the site dependencies
echo "\xE2\x8F\xB1  Installing site dependencies with Composer, this may take a few minutes...\n"

docker exec -i lab_web rm $DIR/composer.lock
docker exec -i lab_web composer install -n -d $DIR

echo "\n\xF0\x9F\x98\x81  Hooray, the dev site has been built!\n"