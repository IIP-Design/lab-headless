db:
	./scripts/docker-up.sh N
	./scripts/create-db.sh

images:
	./scripts/build-images.sh

setup:
	./scripts/build-images.sh N
	./scripts/docker-up.sh N
	./scripts/create-db.sh N
	./scripts/clean-webroot.sh N
	./scripts/build-site.sh

wp:
	./scripts/docker-up.sh N
	./scripts/clean-webroot.sh N
	./scripts/build-site.sh