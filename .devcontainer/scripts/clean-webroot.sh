WEBROOT="../webroot"


echo "\xF0\x9F\x97\x91  Delete core files from webroot to avoid conflicts during build.\n"

rm $WEBROOT/composer.lock 2> /dev/null

rm -rf $WEBROOT/vendor
rm -rf $WEBROOT/wp
rm -rf $WEBROOT/wp-content/plugins
rm -rf $WEBROOT/wp-content/themes