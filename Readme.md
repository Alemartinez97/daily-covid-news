# Welcome to Daily Covid News

## steps to start the backend
    > cd server
    > cd src
    > npm i -s
    > npm start

## the first step is to place the url of example 1 to bring the information from the jornalia api and the second step is to place the url of example 2 to bring the requested information from the database

## example 1 of use to bring api information by postman    
    "http://localhost:4000/news?search=coronavirus&providers=LaNacion&categories=POLITICA&startDate=2020-10-09&endDate=2020-11-30&pagination=5&order=-1"
## example 2 of use to fetch information from the database by postman
    "http://localhost:4000/news?search=coronavirus&providers=La%20Nación&categories=POLITICA&startDate=2020-10-09&endDate=2020-11-30&pagination=5&order=-1"
## example 1 of use to bring api information by postman    
    "http://localhost:4000/news?search=provincias&providers=Clarín&categories=POLITICA%2CECONOMIA%2CSALUD&startDate=2020-01-01&endDate=2020-10-31&pagination=15&order=-1"
## example 2 of use to fetch information from the database by postman
    "http://localhost:4000/news?search=provincias&providers=Clarín&categories=POLITICA%2CECONOMIA%2CSALUD&startDate=2020-01-01&endDate=2020-10-31&pagination=15&order=-1"

## to be able to paginate put "pagination = 15" in the url as in the example
    > pagination=15
## to be able to order from the most recent to the oldest place "order = -1" and otherwise "order = 1" in the url as in the example
    > order=-1
