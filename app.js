const openai = require('openai'); 
const config = require('./config');
const conf = new openai.Configuration({'apiKey': config.apiKey});
const api = new openai.OpenAIApi(conf);

const http = require('http'); 
const fs = require('fs');

async function generate(prompt) {
    const response = await api.createCompletion({
        model: 'text-davinci-003',
        prompt: `Write a recipe for ${config.prompt} and format it in html, return only the recipe, nothing else.`,
        max_tokens: 2600, 
        temperature: 0.5
    });
   return response.data.choices[0].text.replaceAll("\n", "");
}

const requestListener = async function (req, res) {

    res.setHeader("Content-Type", "text/html");

    switch(req.url) {

        case '/':
            const body = fs.readFileSync('skin/index.html').toString();
            res.end(body);
            break;

        case '/generate': 
                if (req.method !== "POST") {
                    res.writeHead(400, {'Content-Type': 'text/html'});
                    res.end('404 Bad request'); 
                    break;
                }
                console.log('POST')
                var pbody = '';
                req.on('data', function(data) {
                    
                  pbody += data;
                })
                req.on('end', async function() {
                prompt = pbody.split(/[=+]/).toString().replaceAll(',', ' ').replace(`input `, '');
          
                  console.log('Body: ' + prompt);
                  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                  gen = await generate(prompt); 
                  if(gen.length > 1) {
                    console.log(gen);
                    res.end(gen);
                  } else {
                    res.end("An error occured while trying to get an answer from openAI, please try again")
                  }
                })
            break;     

        case '/style': 
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(fs.readFileSync('node_modules/bootstrap/dist/css/bootstrap.min.css').toString());
                break;
        default: 
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('404');
            break;     
    }
}
const server = http.createServer(requestListener); 
server.listen(config.port, config.host, () => {
    console.log(`Webserver is running on http://${config.host}:${config.port}`);
}); 