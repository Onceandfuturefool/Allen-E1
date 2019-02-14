var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
      
    var result = {};
    if (query['cmd'] == 'calcDistance')
    {
      result = distance(query);
    }
    else if(query['cmd'] == 'calcCost')
    {
      result = cost(query);
    }
    else
    {
      throw Error("Invalid command: " + query['cmd']);
    }
 
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function distance(query)
{
  var budget = query['budget'];
  var mpg = query['mpg'];
  var fuelCost = query['fuelCost'];
  var result = {};
  var distance;
  if(isNaN(budget))
    throw Error("Invalid Value for budget");
  else if(budget < 0)
    throw Error("Invalid Value for budget");
  else if(isNaN(mpg))
    throw Error("Invalid Value for mpg");
  else if(mpg<0)
    throw Error("Invalid Value for mpg");
  else if(isNaN(fuelCost))
    throw Error("Invalid Value for fuelCost");
  else if(fuelCost < 0)
    throw Error("Invalid Value for fuelCost");
  distance = (mpg/fuelCost)*budget;
  result = {'distance' : distance};
  return result;
    
}
function cost(query)
{
  var dis = query['distance'];
  var mpg = query['mpg'];
  var fuelCost = query['fuelCost'];
  var result = {};
  var cost;
  if(isNaN(dis))
    throw Error("Invalid Value for distance");
  else if(dis<0)
    throw Error("Invalid Value for distance");
  else if(isNaN(mpg))
    throw Error("Invalid Value for mpg");
  else if(mpg<0)
    throw Error("Invalid Value for mpg");
  else if(isNaN(fuelCost))
    throw Error("Invalid Value for fuelCost");
  else if(fuelCost < 0)
    throw Error("Invalid Value for fuelCost");
  cost = dis/(mpg/fuelCost);
  result = {'cost' : cost};
  return result;
  
}