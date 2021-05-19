# helikuparinen.fi

Next version (pun intended) website for the painter and my mom, **Heli Kuparinen**!

As the last pargraph suggests, this site is created using **Next.js**, for better SEO than the old [CRApp](https://github.com/funnicus/helikuparinenhomepage) (it's time to stop, no offense to CRA though)! Easier content managment is achieved trough contentful!

## Developing this site 🚀

You will need node.js (v14.*) and npm (v6.*) installed.

Before starting to dev, you need to define an **.env.local** file on the project root.

Inside:
```yml
SPACE_ID=... # contentful space id token and...
ACCESS_TOKEN=... # access token and...
PREVIEW_ACCESS_TOKEN=... # preview token (not necessary for dev)
```

Ask those from me (if for some reason I would need to give these out) or use your own contenful tokens and id's.

### Scripts

```bash
# start dev server
npm run dev
# build production ready code
npm run build
# start production server
npm start
# lint the code with eslint (and fix automatically fixable errors)
npm run lint -- --fix
```