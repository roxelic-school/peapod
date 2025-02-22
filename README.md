This is a study pod booking site for my college.

To install please follow these instructions

```sh
# clone this repo
git clone https://github.com/roxelic-school/peapod
cd peapod
# install the node packages
npm install
cd ..
# make the frontend folder
mkdir frontends
# clone the frontend repo
git clone https://github.com/roxelic-school/mushy-peas
cd mushy-peas
# install the node packages
npm install
# run the install command
npm run dist
cd ../peapod
# run the program itself
npm run dev
```

now your pod booking website should be up and running, feel free to add yourself as administrator with the provided url (you get this when starting the project up)

to change the port that the application runs on, create a `.env` file in the root of `/peapod/` so it would be `/peapod/.env`
add this content to the file

```env
PORT=3000
```

There is also discord bot capabilitys, to add this go into the file file and add the following lines
```env
DISCORDBOT=True

DISCORD_TOKEN={your discord bot token}
DISCORD_CLIENTID={your discord bot application ID}
```

now once restarting the project it will log into your discord bot and allow you to book your pods through discord