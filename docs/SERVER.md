[<- back](./TOC.md)

# Server and Hosting

The server setup for this site is a little (you could say unnecessarily) more complex than for your usual simple React app of any kind. We are not using Heroku or Netlify or Vercel or any of those things, which do alot of the work for you. This project uses custom made Digital Ocean server with **Ubuntu 18.04** and [Nginx](https://www.nginx.com/) for proxying the requests to the right apps.

Why? Only the lord in the heavens above knows. Originally I used this server to host the older version of the website for my mom, which I created in the summer of 2020. I actually don't remember why I chose to setup my own server. Going the Heroku or Netlify route would have been much easier but hey, atleast I learned about sys-admin/devops stuff🙂 Since I already had this server, why not use it for my new app also?

## How does it work: in a nutshell

The most important parts of my server are: [PM2](https://pm2.keymetrics.io/) for running my apps and **Nginx** for proxying requests and for providing SSL certs with [Let's Encrypt](https://letsencrypt.org/) for my site.

All my apps reside in the folder `~/` and are running with PM2. Nginx is configured in `/etc/nginx/`. Most important content in this directory are `nginx.conf` and the folders `sites-available` and `sites-enabled`.

### Symlinks

The sites-available directory contains all the **server block** configurations (Virtual host in apache terms). Server blocks/Virtual hosts allow us to host multiple websites on a single webserver (which is obviously useful). This allows me to host my site at beta.helikuparinen.fi for testing out it in the wild and helikuparinen.fi for the actual production ready site.

The sites-enabled directory contains [symbolic links](https://www.howtogeek.com/287014/how-to-create-and-use-symbolic-links-aka-symlinks-on-linux/) (symlinks/soft links) to files in sites-available folder. This allows you to selectively disable and enable server blocks as you wish.

To give you an example, I have a file called helikuparinen.fi, which contains all the server blocks for the helikuparinen.fi domain (I should probably do separate files for my subdomains) in the folder sites-available. Symbolic link has been created with a command `ln -s /etc/nginx/sites-available/helikuparinen.fi /etc/nginx/sites-enabled/helikuparinen.fi`, which enabled the site.

### Server blocks

Whats inside those files in sites-available anyway? The file helikuparinen.fi contains something like this: 

```nginx
server {

        root /var/www/helikuparinen.fi/html;
        index index.html index.htm index.nginx-debian.html;

        # Multiple hostnames separated by spaces.
        server_name helikuparinen.fi www.helikuparinen.fi;

        location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
    ...
}

...
```

That defines a server block with a proxy! The most important part is the **location** block. It tells Nginx to proxy requests on hosts defined in server_name at / to our app in http://localhost:3000! I have a another similar block defined in that file which proxies requests on beta.helikuparinen.fi to http://localhost:8080!

### SSL Certifications

We use Let's Encrypt and [Certbot](https://certbot.eff.org/) for our SSL Certifications. Adding a cert to the desired domain is quite straightforward. It is done with the following command: `sudo certbot --nginx -d example.com`. More about that [here](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)!

### PM2 logrotate

It is important to remember to do logrotate with PM2, so your small server doesn't fill up with log files (I learned this the hard way). I have already configured this to be automatic, but it's good do remember either way. More about it [here](https://www.digitalocean.com/community/tutorials/how-to-manage-logfiles-with-logrotate-on-ubuntu-16-04).

Phew! In a nutshell indeed...

## Useful links

If you want know more about creating a server like this on Digital Ocean, follow these links:

- Inital server setup: https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
- Domain name: https://docs.digitalocean.com/products/networking/dns/quickstart/
- Nginx install: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04
- Let's Encrypt for Nginx: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04
- Node.js app to production: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04
