This is a study pod booking site for my college.

To install please follow these instructions

clone this repo: 
```sh
git clone https://github.com/roxelic-school/peapod
```
install the node modules
```sh
cd peapod
npm install
```
return to the parent folder
```sh
cd ..
```
clone the frontend for this repo
```sh
git clone https://github.com/roxelic-school/mushy-peas
```
install the node modules
```sh
cd mushy-peas
npm install
```
run the install / build command
```sh
npm run dist
```
return to the main project
```sh
cd ../peapod
```
run the main project
```sh
npm run dev
```
now your pod booking website should be up and running, feel free to add yourself as administrator with the provided url (you get this when starting the project up)

here is the full install script
```sh
git clone https://github.com/roxelic-school/peapod
cd peapod
npm install
cd ..
git clone https://github.com/roxelic-school/mushy-peas
cd mushy-peas
npm install
npm run dist
cd ../peapod
npm run dev
```