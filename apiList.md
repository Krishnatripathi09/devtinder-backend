# DevTinder API's

## authRouter
-POST/SignUp
-POST/Login
-POST/Logout

## profileRouter
-GET/profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connectionRequestRouter
-POST /request/send/status/:user-Id
-POST /request/review/status/:requestId

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## userRouter
-GET /connections
-GET /request/received
-GET /feed - Gets you the profile of other users on the platform



-Status - ignore,interested,accepted,rejected