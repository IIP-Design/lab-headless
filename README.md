# GPA/LAB Headless

## Dev Environment Setup

Clone this repository onto your local machine (by running the command `git clone git@github.com:IIP-Design/lab-headless.git`) and follow the below instructions.

### 1. Setup WordPress Configs

Navigate to the `lab-headless` directory you just created. In the `.lab-dev/config`sub-directory, create a new file named `lab.conf` and copy over the contents of the `template.conf` file found in the same directory. In the new `lab.conf` file, change all the fields labeled as [REPLACE ME].

If you need to generate new salts and keys you can do so by visiting: https://api.wordpress.org/secret-key/1.1/salt/.

**Note:** When filled out, the `lab.conf` file contains sensitive information. Do not commit it to version control.

### 2. Set Permission on Build Scripts

In order to run the startup scripts you need to make the script files executable. To do so, in your terminal, navigate to the root `lab-headless` directory and run the following command:

```
chmod -R +x .lab-dev/scripts/
```

### 3. Run the Setup Scripts

To initiate the start-up scripts run the command:

```
npm run setup
```

This single command will:

1. Build the web server and database Docker images
1. Run Docker Compose to bring the virtual machine up
1. Import a clean WordPress database into the the MariaDB container
1. Clone the Lab site webroot and build the WordPress instance

**Note:** You must have [make](https://www.gnu.org/software/make/manual/make.html) installed on your computer for the setup script to work.

### 4. Running the Caddy Server

All of the services with this repo run within Docker containers and are not bound to your system localhost. Therefore, if you want to access the development site in the browser you will need to use some sort of proxy to connect the container to your localhost. While you are welcome to set up your own solution, we recommend using the either the Caddy webserver found in this repo or the [GPA Lab universal proxy](https://github.com/IIP-Design/lab-tools/tree/main/packages/universal-proxy).

The Caddy webserver found in this repo allows you to access the local content site at the URL `lab.dev.local`. To start up the Caddy server, run `npm run caddy-start`.

You must also map the `lab.dev.local` URL to you localhost. To do so, open your Mac's hosts file by running the command:

```
sudo nano /etc/hosts
```

Within this file, add the line:

```
127.0.0.1 lab.dev.local
```

Optionally, if you intend to use the included Adminer database client [described below](#6-adminer) you should also add the following line to the hosts file.

```
127.0.0.1 lab.adminer.local
```

Enter `Ctrl + o` and `Ctrl + x` to save the file and exit. The URL `lab.dev.local` is now mapped to your localhost.

**Note:** Caddy provisions the dev site a self-signed SSL certificate. Your browser may notify you that this certificate is not valid, nevertheless, it is safe to proceed. To avoid these error entirely, you will have to add the root certificate to your key chain as described [here](https://github.com/IIP-Design/lab-tools/tree/main/packages/universal-proxy#ssl-certificates). If following those directions, note that the mentioned `config` directory is a sub directory of the `.lab-dev` directory in this repository.

### 5. Login to the WordPress Admin

You can now login into the WordPress backend by going to [lab.dev.local/wp-admin](http://lab.dev.local/wp-admin) in your browser. The site is set up with a default super admin user. You can login as this user with the username `dev_admin` and the password `admin`. The first time you log in you may be prompted to update the database and/or confirm the admin user. If you see these messages, simply click the `Update WordPress Database` or `This email is correct` button to confirm.

### 6. Adminer

This repo includes a built-in browser-based database client via Adminer. If using the included Caddy server or the GPA Lab universal proxy you will be able to access Adminer at the URL lab.adminer.local (after mapping the URL as described [above](#4-running-the-caddy-server)). The database name, username, and password for this development DB are all `lab_dev`.

If you prefer to connect directly to the database using a different client, it is available at port 3306 of the `lab_db` Docker container.

## Dev Helper Scripts

In addition to the setup script, we provide several scripts to help manage the development container. Run the following scripts from the project root to rebuild the project's Docker images, reinstall the development WordPress instance, or refresh the WordPress site's database. _[Note that you must have make installed on your computer for these scripts to work]_

| Command               | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `npm run setup`       | Create the dev site for the first time                       |
| `npm run dev-start`   | Start up the containers required to run the development site |
| `npm run dev-stop`    | Suspend the containers required to run the development site  |
| `npm run caddy-start` | Start the local webserver                                    |
| `npm run caddy-stop`  | Suspend the local webserver                                  |
| `npm run cleanup`     | Removes extraneous files from the webroot sub-directory      |
| `npm run images`      | Rebuild the WP and MariaDB Docker images                     |
| `npm run rebuild-wp`  | Reinstall WordPress and plugins on the dev container         |
| `npm run reset-db`    | Drop the dev site's database and recreate with a clean db    |
