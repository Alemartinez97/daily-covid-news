# Welcome to Daily Covid News


## steps to start the backend
    > cd backend
    > cd src
    > npm i -s
    > npm start
## example 1 of use to bring api information by postman    
    "http://localhost:4000/news?search=coronavirus&providers=Clarin&searchindataclass=Clarín&categories=POLITICA&startDate=2020-10-09&endDate=2020-12-03&page=2&limit=5&order=-1"

## searchindataclass is to search the database for provider
    > searchindataclass=Clarín
## to be able to paginate put "pagination = 15" in the url as in the example
    > page=2&limit=5
## to be able to order from the most recent to the oldest place "order = -1" and otherwise "order = 1" in the url as in the example
    > order=-1

## to register 
    > http://localhost:4000/signup
## place in the body
    > {
    > "email":"deyvidofi@gmail.com",
    > "password":"123456"
    > }
## to login 
    > http://localhost:4000/login
## place in the body
    > {
    > "email":"deyvidofi@gmail.com",
    > "password":"123456"
    > }
