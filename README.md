# GPA/LAB Headless

## Setup

Clone this repository onto your local machine (by running the command `git clone git@github.com:IIP-Design/gpalab-headless.git`) and follow the below instructions.

### 1. Setup WordPress Configs

Navigate to the `lab-headless` directory you just created. In the `.devcontainer/config` sub-directory, copy the file `template.conf` as `lab.conf` and change all the fields labeled as `[REPLACE ME]`.

If you need to generate new salts and keys you can do so by visiting: https://api.wordpress.org/secret-key/1.1/salt/.

**Note:** When filled out this file contains sensitive information. Do not commit it to version control.

### 2. Set Permission on Build Scripts

In order to run the startup scripts you need to make the script files executable. To do so, in your terminal, navigate to the `lab-headless` directory and run the following command:

```
chmod -R +x .devcontainer/scripts/
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

### 4. Map the URL to Localhost

This will allow to access your VM at the URL `lab.dev.local`. To do so, open your Mac's hosts file by running the command:

```
sudo nano /etc/hosts
```

Within this file, add the line:

```
127.0.0.1 lab.dev.local
```

Enter `Ctrl + o` and `Ctrl + x` to save the file and exit. The URL `lab.dev.local` is now mapped to your localhost.

**Note:** When first visiting the site in a new browser make sure you navigate to `http://lab.dev.local` (as opposed to https or no protocol specified) otherwise your browser may upgrade you to https and the connection will fail.

### 5. Login to the WordPress Admin

You can now login into the WordPress backend by going to [lab.dev.local/wp-admin](http://lab.dev.local/wp-admin) in your browser. The site is set up with a default super admin user. You can login as this user with the username `dev_admin` and the password `admin`.
