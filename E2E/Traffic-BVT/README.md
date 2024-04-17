npx cypress open
npx cypress open --env ENV="Production"

npx cypress run --browser chrome --headed --env tags="@WIP",ENV="Production"