# helikuparinen.fi

Next version (pun intended) website for the painter and my mom, **Heli Kuparinen**!

As the last paragraph suggests, this site is created using **Next.js**, for better SEO than the old [CRApp](https://github.com/funnicus/helikuparinenhomepage) (it's time to stop, no offense to CRA though)! Easier content managment is achieved trough contentful!

The site is deployed at [https://helikuparinen.fi](https://helikuparinen.fi)!

## Developing this site 🚀

You will need node.js (v14.*) and npm (v6.*) installed.

Before starting to dev, you need to define an **.env.local** file on the project root.

Inside:
```yml
SPACE_ID=... # contentful space id token and...
ACCESS_TOKEN=... # access token and...
PREVIEW_ACCESS_TOKEN=... # preview token (not necessary for dev)

# + email info for nodemailer form
EMAILUSER=user@email.com
EMAILPASS=super_secretPaSsword666
TO=recipient@email.com
```

Ask those from me (if for some reason I would need to give these out) or use your own contenful tokens and id's and email infos.

More about Next apps [here](./NEXT.md)!

### Scripts and other commands

```bash
# start dev server
npm run dev
# build production ready code
npm run build
# start production server
npm start
# lint the code with eslint (and fix automatically fixable errors)
npm run lint -- --fix

# for server

# production ~/helikuparinen.fi
npm run build
pm2 start npm --name "prod" -- start

# beta in ~/beta.helikuparinen.fi
npm run build
pm2 start npm --name "beta" -- start -- --port 8080

# nginx
# test that you have configured your nginx files correctly
sudo nginx -t

# restart nginx so that changes take effect
sudo systemctl restart nginx
```
## More comprehensive documentation

I have done some [documenting](./docs/TOC.md) for this project, mainly for my future self and Heli, but any other curious fella can take a look🙂