# Wango test project README

## General description

This is a test work repository for wango project

### BE (in `be` directory)

It uses express framework on BE and it uses postgresql as its DB.
The decision to use postgresql was made with the fact that there must be relations defined:
  * Relation with user and car
  * Relation with cities and areas
  * Relations of cities/areas and their parking rules
  * Relation of tickets and users
And what is best for such a task than relational database?

As an ORM I have used prisma as it is one of the simples ORMs and give possibility to define schema in a less time then other ORMs\

You can install all dependencies with `npm ci` command

To run BE execute `npm run start` command

#### A bit about prisma integration

To work with the application and prisma one would need to migrate and seed the data:

  * Run `npx prisma migrate deploy` too update schema to the last version
  * Run `npm run prisma:seed` to seed the initial data with two cities and general rules

### FE (in `fe` directory)

On the FE part I'm using react bootstrapped with vite. It uses wango template as base html with city and area selection implemented in react

You can install all dependencies with `npm ci` command

To run frontend execute `npm run dev` command

### Some explanations

Unfortunately I was not able to fully finish the task as I was stuck on a way to calculate the price given all the rules that may have been applied to a particular city and area

My idea was to create some kind on a TimeRange data structure which would divite duration of parking to such time ranges with respect to rules defined, but I believe I have overcomplicated the architecture of the application given the fact that I only had 5 hours and I should have went with something simpler. Though for real life application my approach would be a better one than anything simpler.

#### Idea of rules

My idea was to give admin possibility to define as many different rules as possible and they can be defined for both cities and their areas. If there is a conflicting rule between city and area a rule of area should have taken a priority. This would give my application quite a lot of flexibility in defining fine tunes prices for different time periods or something else, like day of the week

## In the end

I'm attaching this README file as a bit of description of the project and as a requirement to answer a question about DB choce

Thanks!