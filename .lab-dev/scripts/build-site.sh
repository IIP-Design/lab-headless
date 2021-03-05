DIR="/www/local/sites-enabled/lab_dev"

# Copy webroot into the WordPress container
echo "\xF0\x9F\x92\xBE Cloning the webroot into the container...\n"

docker cp ../webroot/. lab_web:$DIR/

echo "\xF0\x9F\xA7\xB9 Removing plugins not needed for development.\n"

# Delete the Google login and hide login plugins, since neither is needed for development
docker exec -i lab_web sed -i '/wpackagist-plugin\/google-apps-login/d' $DIR/composer.json
docker exec -i lab_web sed -i '/iip-design\/wp-hide-login-form/d' $DIR/composer.json

# Delete themes and plugins that are part of the monorepo
docker exec -i lab_web sed -i '/gpalab\/ichabod/d' $DIR/composer.json
docker exec -i lab_web sed -i '/gpalab\/neck-brace/d' $DIR/composer.json
docker exec -i lab_web sed -i '/gpalab\/lab-guillotine/d' $DIR/composer.json

# Delete all the repository references to monorepo
docker exec -i lab_web sed -i '/"type": "path"/I,+6 d' $DIR/composer.json

# Run Composer to install WordPress and all the site dependencies
echo "\xE2\x8F\xB1  Installing site dependencies with Composer, this may take a few minutes...\n"

docker exec -i lab_web rm -f $DIR/composer.lock
docker exec -i lab_web composer install -n -d $DIR

# Remove unneeded default themes and plugins.
docker exec -i lab_web rm -rf $DIR/wp/wp-content/themes/twenty*
docker exec -i lab_web rm -rf $DIR/wp/wp-content/plugins/hello.php

echo "\n\xF0\x9F\x98\x81  Hooray, the dev site has been built!\n"