WEBROOT="../webroot"

echo "\n\xF0\x9F\x97\x91  Deleting core files from webroot to avoid conflicts during build.\n"

rm -f $WEBROOT/composer.lock

rm -rf $WEBROOT/vendor
rm -rf $WEBROOT/wp
rm -rf $WEBROOT/wp-content/plugins
rm -rf $WEBROOT/wp-content/themes