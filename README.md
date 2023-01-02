# openai-recipes
A simple web application in Node's native http library tnat takes some user input and inserts it to a completion prompt sent to openai and displays the result (formatted in basic html by the ai) back to the user, in this case to create recipes for slushy <3

## how to run (on linux systems with git, nodejs and npm installed)
git clone https://github.com/spr1t3-0/openai-recipes
cd openai-recipes 
npm i 
edit config.js, at least insert an apiKey (To get one, sign up on https://openai.com, log in, click on the top right menu "Personal" and go to "View API Keys" to create one)
node app.js  


