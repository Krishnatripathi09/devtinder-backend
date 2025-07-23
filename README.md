# Node-Js-Project-Repo
Repo for Project  in Node Js 



node_modules folder contains all the dependencies that our project requires to run it is like a database for 
our app which contains all the dependencies that our project  needs to run .

"express": "^4.21.2"

when we install a dependency it is installed with some version the first 
digit in version (4) means major update verison which is not backward compatible and it can 
break our app if we install the major verison in our app which is running on minor version
for eg: we are using version 4.x.x in our app and we install 5.x.x version so it represents some major update 
in our app and it could break our application

The second digits (21) represents minor updates which can be installed in our app and wil not do any harm 
The third digits (2) represents patch updates which are also safe to install in our app and will
not do any harm.

(^) symbol means our app can accept minor and path updates without any issue 
(~) symbol means our app avoids version updates that could introduce new features or bugs
if it does not have any symbol then it means that project needs exact dependencies to run.

while pacakage.json is flexible with installing new minor updates or patch versions but pacakage.lock.json
will install exact version of the dependency and will not accept any changes in its version minor or major

installed nodemon globally (npm install -g nodemon) to refresh our app as soon as we do some changes in our app
now we run our app using nodemon src/app.js. We can use nodemon from any directory as we have installed 
it globally

we can add a script in package.json to run our app just using npm run dev as we have add the 
scripts ""scripts": {
    "start":"node src/app.js",
    "dev":"nodemon src/app.js"
  }" in our package.json file



We can delete our node_modules folder and we can run command __npm install__ so it will again create
node_modules folder with all the dependencies that our project requires to run. when we run npm install 
it goes to package.json and checks the dependencies section there it finds express and installs all the 
dependencies again

## Route Handling
If we have a route which starts with / and we have some piece of info to show after that for eg:(app.use("/", (req, res) => {
  res.send("Namaste World");
});) 
 so if we try to access any path after this "/" then it will overwrite that path  with its content 
 for eg: if we have a similar route with name /test which shows "Hello world" on screen but if the "/" is 
 active then it will display "Namaste World" on the screen and will overwrite anything that is there 
 inside the /test route 

 We can avoid this by changing the order of port for eg:

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/test", (req, res) => {
  res.send("Hello World");
});
app.use("/hi", (req, res) => {
  res.send("Hello Page ba");
});

app.use("/", (req, res) => {
  res.send("Namaste World");
});


Now in above case all routes will work as we have changes the order of execution of routes

In above Api route we have used app.use so it will match all the routes like get,put,post or delete 
but to to match the specific route we have to use app.get 

if we swap the order of (req, res) writing req and res in parameters then it will thorow error because
req Contains information about the HTTP request, such as headers, query parameters, and the request body.
and res is Used to send the HTTP response back to the client.
so if we swap the order of writing them it will throw an error  because the res object doesn't have the properties and methods expected for a request object, and vice versa.

# Optional Chaining in Api Path

In our routes we can make our path as optional by putting a question mark for example if we have a path 
"/test/abc" then we can make the path optional by using a question mark after the path like "/test/ab?c"
so here b is optional like if we write the full path on postman to this path it will work "/test/abc" but if we 
write it like "/test/ac" then it will also point to that path as we have kept b as optional

# + Opeartor in Path
We can also add (+) operator in path so we can add multiple letter in front of which we have added+ (bbbb) in our path unless starting and ending letter is same
for eg: "/test/ab+c" so if try to acess the path like "/test/abbbbbbbbbbc" then as well it will work

# * Opeartor in Path
we can also write(*) opeartor in path and it means unless and until starting and ending letters match we can give anything in between the path for eg: we have path "/test/abccd/" then we can write it like
/test/a*d/ and it will hit the path

# () group Operator 
Here we can use () to group some characters in path for eg: if we have path "/test/a(bc)?d then even if we do not
write the bc in our path it will hit the correct path as we made the bc optional in our path"/test/ad"
We Can also Write REGEX in our Api paths to make more Dynamic

# Read the Query Params
We can read the query params in our api by using req.query for eg: if we have a path /ab?c then we can 
add console.log(res.query) in its body and in post man we can add some query params which will be printed 
in our Console

# Params 
We can also add Dynamic routes by using "/abc/:user" so here (:) giving colon we can add dynamic path 
and we can read it by using req.params so here userId is the dynamic path which we are accessing.
for eg (app.get("/users/:userId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "YTU", lastName: "Tripathi" });
});)


If we do not put any response inside our Route then the request from postman will run like an infinite loop 
as we have not set any response in our call :for eg: "app.use("/user", (req, res) => {
 //No Reponse
});"

we can wrap our responses in array and then send them like below if we have many responses 
app.use("/user", [
  (req, res, next) => {
    console.log("I am first response");
    next();
  },
  (req, res, next) => {
    console.log("I am second response");
    next();
  },
  (req, res, next) => {
    console.log("I am third response");
    next();
  },
  (req, res, next) => {
    console.log("I am 4th response");
    next();
  },
  (req, res, next) => {
    console.log("I am 5th response");
    next();
  },
]);

or we can wrap 2 or 3 or 4 responses in an array then we can send them 
for eg:
app.use("/user", [
  (req, res, next) => {
    console.log("I am first response");
    next();
  },
  (req, res, next) => {
    console.log("I am second response");
    next();
  },],
  (req, res, next) => {
    console.log("I am third response");
    next();
  },
  (req, res, next) => {
    console.log("I am 4th response");
    next();
  },
  (req, res, next) => {
    console.log("I am 5th response");
    next();
  },
);

we can use the routes like this in any http method Get,put,post and delete ,patch

next() function  : It is a callback function that passes control to the next middleware function in the request-response cycle. Without calling next(), the request will not proceed to the next middleware or route handler.

for eg: (req, res, next) => {
    console.log("I am first response");
    next();
  },
  (req, res, next) => {
    console.log("I am second response");
    res.send("send the response )
  },

  if we do not add next() function the control will not be passed to next route handler and as first 
  handler does not have any reponse the api call to this path will run like an infinite loop 

  # MiddleWare Functions
Middleware in Express.js is any function that has access to the req, res, and next objects and is used to handle a part of the request-response cycle.
Middleware functions can be chained using next(), but only one function should send a response (e.g., res.send(), res.json(), etc.).
If you don't call next() in a middleware, the next middleware or route handler will not be executed.
If you use res.send() in a middleware, the request-response cycle ends, and subsequent middleware or handlers are not executed.

    For eg: (req, res, next) => {
    console.log("I am first response");
    next();
  },
  (req, res, next) => {
    console.log("I am second response");
    res.send("send the response )
  },

  function which actually send the response back are known as response handlers.

  To export anything in node js as default export we have to export it using module.exports={adminAuth} then we can import it like  const { adminAuth } = require("./middlewares/auth");

  # Connecting to DataBase 
  Use the connection string "mongodb://user:password@localhost:27017/mydatabase?authSource=admin"
to connect to database and we are going to use mongoose to connect to Database
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://user:password@localhost:27017/mydatabase?authSource=admin"
  );
};
connectDB()
  .then(() => {
    console.log("connected to database :)");
  })
  .catch((err) => {
    console.log("Database connection Failed:", err);
  });

so to connect to our databse we installed mongoose and passed our connection string inside mongoose.connect
which is used to connect to data base as mongoose.connect will return a promise we have awaited it and wrapped it inside a async function and then called the function which would then connect to databse or throw 
an error based on output it gets.

We have connected to database after starting our server but in Actual scenarios this is a bad way to connect to database after server is started. first our server should connect to database then the server should be started as users might start to send API calls before our server actually starts that's why now we are exporting our code in databse.js file and call the connect to database function before server starts in app.js 
"const connetDB = require("./config/database");
const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there

const app = express();

connectDB() // Called the function to connect to databse first
  .then(() => {
    console.log("connected to database :)");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");// Then start the server to listen API Calls
    });
  })
  .catch((err) => {
    console.log("Database connection Failed:", err);
  });
"
After connecting to database we need to create a userSchema to for our users with below configuration
"const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  Age: { type: Number },
  password: { type: String },
  gender: { type: String },
});
for which we have created a folder models inside that we have create our user.js file to create the schema.
Once we have created our schema we have to create mongoose model( Table )to start using our schema as we have
created our schema for Users then we will create a User model(Table) with defined schema configuration.
we can create the model (Table) using mongoose.model("TableName",schemaForTable) and then export it using
default exports.
For eg:const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
or we can directly export it like module.exports = mongoose.model("User", userSchema);

Next to create a User in our Schema we have used the post method with the user Details like below
app.post("/signup", (req, res) => {
  const userObj = {
    firstName: "Krishna Tripathi",
    lastName: "Tripathi",
    emailId: "krish@789.com",
    password: "krish@678",
  };

const user = new User(userObj); // Creating the new instance of the UserModel by passing the data of the userObj
  await user.save();
   res.send("User Created in DataBase ");
});

we have created a user and we have put that user in userObj and then we have passed the userObj in our User Model
to create a new instance of the User Model and then we have saved that instance in our database using user.save
Now to create our User in DB we have to make a Post API call to signUp and once we make the API call successfully
the user will be created in the DataBase successfully. we have also added a res.send to send a success response 
once the post request is made successfully.
Wrapped our user.save in a try catch block to handle any Error if occured:

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Elon",
    lastName: "Musk",
    emailId: "Elon@789.com",
    password: "Elon@678",
  });
  // Creating the new instance of the Model User by passing the data of that Model

  try {
    await user.save();
    res.send("User Created in DataBase ");
  } catch (err) {
    res.status(400).send("Error Saving the User Info " + err.message);
  }
});

# Creating the POST API
APIs are mechanisms that enable two software components to communicate with each other using a set of definitions and protocols. For example, the weather bureau’s software system contains daily weather data. The weather app on your phone “talks” to this system via APIs and shows you daily weather updates on your phone.


Till now we were hardcoding data in to our post method But Now to handle Dynamic data directly from End-User and
 we have to convert the json data from END-User into readable format we have to convert our json data using app.use(express.json());
then we can use the data directly in our post method using req.body and it will saved into DB directly if 
we hit the post API from PostMan
app.use(express.json()); //converting the json data into understandable format 
app.post("/signup", async (req, res) => {
  // Creating the new instance of the  User Model by passing the data of that Model
  const user = new User(req.body);//now passing the request body User Model

  try {
    await user.save();
    res.send("User Created in DataBase ");
  } catch (err) {
    res.status(400).send("Error Saving the User Info " + err.message);
  }
});

# Creating the Get API
After Creating the Post API we can find the users by creating a Get API like Below  
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  const user = await User.findOne({ email: userEmail });// FindOne Method will return just one User if multiple //users are resgistered with the value we are trying to find the User 
  res.send(user);
   try {
     const user = await User.find({ email: userEmail });// Find method will return all the users that are //registered with the provided email id
    if (user.length === 0) {
      res.status(404).send("User Not Found");
    } else {
       res.send(user);
     }
   } catch (err) {
     res.status(400).send("Something Went Wrong :");
   }
});

# Creating the Delete API
We can delete the user by creating a Delete API like Below
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Delted Successfully Bhau !");
  } catch (err) {
    res.status(400).send("Error Deleting User Info :" + err.message);
  }
});

we have used the findByIdAndDelete() method from mongoose to delete the user 

# Setting up Schema Validation

We can set the schema validations on our DB Fields from "https://mongoosejs.com/docs/schematypes.html" schemaTypes validations and we can also install and use Validator package from npm for setting 
custom validations for any field: 
for eg: email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Invalid email')
        }
      }
    },

After custom validation in user Schema we have also created a validation file to validate the datapassed into
schema properly and then used those validations in our Post method. 
# Password Hashing
To hash our passwords we have used an external library from Npm known as bcrypt.

# Login API
Created a login Endpoint to login with resgistered user with email and password. We have used bcrypt to compare the password with the hashed password in the database.
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      res.send("Login Successfully");
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

# Authentication JWT and Cookies
 When a user makes a API call to server it is made using TCP/IP Protocol. Once the user makes the API call 
 a connection is created and once the request is Fullfilled the connection is closed by server.
 To keep the user logged in when the user enters his email and password then server verfies his email id and 
 password and gives the user a JWT (Json Web token) which is used for verification with server everytime user
 makes a new API call
 Issue with this authentication method was that once the JWT is generated by server then how the user will store this JWT as he also needs to send this jwt everytime he makes an API request to tackle this issue the web came
 up with a solution called Cookie(A small piece of data stored by user's browser provided by a website they visit.)
 So whenever the user provides his email and pwd to server the server will generate the JWT token and wrap it 
 inside a cookie and will send back to the user which will then stored by user's browser and then from 
 next time every-time the user makes a new API request this cookie will be sent along with the API request
 to server and server will verify the cookie and then will provide the user with the data he requested.
 so Everytime the user needs some data ad he makes an API call this cookie will be shared to server and once 
 verified server will share the data to user.
 Once the Cookie expires (as we can set the expiry time for cookie) then user needs to login again and a new 
 cookie will be generated.
JWT Token is divided into 3 parts (Header,Payload and Signature)
To generate the JWT we have to install a library jsonwebtoken and then we have to import jwt from Jsonwebtoken
const jwt = require("jsonwebtoken"); 
and then we can use this jwt to create a token and also we have to specify the private key to sign the token
 const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$619");
      console.log(token);
      //Add the Token to Cookie and send the response back to the user
      res.cookie("token", token);
      res.send("Login Successfully");


when we want to read a cookie then we need a middleware (package)  we have to install the 
cookie-parser which is a middleware used in Express.js applications to parse cookies from incoming HTTP requests and make them easily accessible through the req.cookies object.

We created a auth middle ware so all userAuthentcation logic for cookie and JWT was added inside that and whenever we want to hit an API which needs to accessed after authentication there we can add the middle-ware so 
the request to access the API will be safely routed to authentication middleware before user can access the api
only after verification whether the user has valid cookie and JWT or not 

# Express Router
Express Router is a feature of Express.js that allows you to break up your application into smaller, more
manageable pieces. It's a way to organize our routes and controllers in a more modular and scalable
way. 
Now We have created a routes folder in our src folder inside that we have a auth folder in which we will 
write all the routes for our authentication.
We have created the route files for authentication, profile and request routes and then we have imported those routes in our app.js and used them for routes to particular page.
for eg:
const authRouter = require("./routes/auth"); // importing the routes 
const profileRouter = require("./routes/profile"); // importing the routes
const requestRouter = require("./routes/request"); // importing the routes

 (app.use("/", authRouter); // then using those routes for routing to particular page
app.use("/", profileRouter); 
app.use("/", requestRouter);)

# Log-Out Logic
For a user to Log-out we just need to clear the Cookie inside which the jwt is stored
In the below code we can either set the cookie as null or we can clear the cookie directly 
authRouter.post("/logout", async (req, res) => {
  //   res.cookie("token", null, {
  //     expires: new Date(Date.now()),
  //   });
  //   res.send("Logout Successfully");
  res.clearCookie("token");
  res.send("Logout Successfully");
});

# ENUMS(Enumerations)
Enums are types that contain a limited number of fixed values, as opposed to types like Number or String which can have a wide range of values.
Enums are helpful if there are a definite number of fixed values for any one variable.

# Updated the Sign-up API
Updated the sign Up API by setting JWT token when a user signs-up and redirecting him to /Profile page

# Starting our Application on Server:
pm2 start npm --start // To start the Application 24/7

pm2 logs // To check ths logs for Anay Issues

pm2 flush npm // this command is used to Flush the Logs where npm is the name of the Application for which we want to flush the logs:

pm2 list // It will show the name of the processes ruuning 
pm2 stop npm // to stop the app, where npm is the name of the application that we want to stop.
pm2 delete npm // It will delete the Application where npm is name of application

pm2 start npm --name 'devTinder-Backend' -- start // to start our application and before starting Application we give it a name for that we have used 
//--name parameter 

Now As our server BackEnd is still running on localhost:3000/ we have to change that so for that we have to change a file  which is 
named sites-available/
so for that we have to use **sudo nano /etc/nginx/sites-available/default 
now this takes us to a default nginx config which we can edit it to connect our FE and BE:

 server_name 43.204.96.49; // Provide your server IP

    location /api/ { # /api/ is the path where backend is Running
        proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app (URL where your backend is Running)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade; // everything else same 
    }

After making the above changes the backend should be restarted using below command


 sudo systemctl restart nginx // To restart nginx;

 // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_ses_code_examples.html Sending Email Script for V3