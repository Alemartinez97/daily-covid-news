# Welcome to Daily Covid News

## steps to start the backend
    > cd server
    > cd src
    > npm i -s
    > npm start

## example 1 of use to bring api information by postman    
    "http://localhost:4000/news?search=coronavirus&providers=LaNacion&searchindataclass=La%20Nación&categories=POLITICA&startDate=2020-10-09&endDate=2020-11-30&pagination=5&order=-1"
## example 2 of use to bring api information by postman    
    "http://localhost:4000/news?search=coronavirus&providers=Clarin&searchindataclass=Clarín&&categories=POLITICA%2CECONOMIA%2CSALUD&startDate=2020-01-01&endDate=2020-10-31&pagination=15&order=-1"

## searchindataclass is to search the database
    > searchindataclass=Clarín
## to be able to paginate put "pagination = 15" in the url as in the example
    > pagination=15
## to be able to order from the most recent to the oldest place "order = -1" and otherwise "order = 1" in the url as in the example
    > order=-1
