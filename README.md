# Koroibos
	
This project is the final solo project for Mod 4 students at Turing School of Software & Design. It is a take home challenge serving as part of an mock interview process. It imports a csv with the 2016 Summer Olympics data and uses it to build endpoints.
	
## Local Setup

To run the project locally, you will need to clone down the repo:
	
	git clone https://github.com/juliamarco/koroibos.git
 
You will need to install node packages

	npm install
    
Then you will need to create, migrate, and import the data:

	
	npx sequelize db:create
	npx sequelize db:migrate
	node seeders.js
	
Finally, you can start each of the three apps locally

	npm start

## API Endpoints

You can make API requests to the following endpoints:


### GET Olympians

Users can retrieve all olympians in the database by making a request to the following endpoint:
	```api/v1/olympians```

If the request is successful, olympians will be returned in the following format:
```
	{
	  "olympians":
	    [
	      {
	        "name": "Maha Abdalsalam",
	        "team": "Egypt",
	        "age": 18,
	        "sport": "Diving"
	        "total_medals_won": 0
	      },
	      {
	        "name": "Ahmad Abughaush",
	        "team": "Jordan",
	        "age": 20,
	        "sport": "Taekwondo"
	        "total_medals_won": 1
	      },
	      {...}
	    ]
	}
```
	
### GET oldest and youngest olympian
  
Users can retrieve the oldest or the youngest olympian by adding a query param to the previous endpoint:
If the request is successful, olympian will be returned in the format below:

```
api/v1/olympians?age=youngest
	{
	  [
	    {
	      "name": "Ana Iulia Dascl",
	      "team": "Romania",
	      "age": 13,
	      "sport": "Swimming"
	      "total_medals_won": 0
	    }
	  ]
	}

api/v1/olympians?age=oldest
	{
	  [
	    {
	      "name": "Julie Brougham",
	      "team": "New Zealand",
	      "age": 62,
	      "sport": "Equestrianism"
	      "total_medals_won": 0
	    }
	  ]
	}
```
	
### GET Olympian Stats
  
Users can retrieve some olympian stats, such as the total count of olympians, their average weight or age by making a request to the olympian_stats endpoint:
  
	api/v1/olympian_stats
  
If the request is successful, stats will be returned in the following format:

	
	{
	  "olympian_stats": {
	    "total_competing_olympians": 3120
	    "average_weight:" {
	      "unit": "kg",
	      "male_olympians": 75.4,
	      "female_olympians": 70.2
	    }
	    "average_age:" 26.2
	  }
	}
	
	
### GET Events
Users can retrieve all events in the database by making a request to the following endpoint:
  ```api/v1/events```

If the request is successful, events will be returned in the following format:

	
	{
	  "events":
	    [
	      {
		"sport": "Archery",
		"events": [
		  "Archery Men's Individual",
		  "Archery Men's Team",
		  "Archery Women's Individual",
		  "Archery Women's Team"
		]
	      },
	      {
		"sport": "Badminton",
		"events": [
		  "Badminton Men's Doubles",
		  "Badminton Men's Singles",
		  "Badminton Women's Doubles",
		  "Badminton Women's Singles",
		  "Badminton Mixed Doubles"
		]
	      },
	      {...}
	    ]
	}
	
	
	
### GET Medalists for an event
  
Users can retrieve all medalists for a particular event by making a request to the following endpoint:
	```api/v1/events/:id/medalists```

If the request is successful, data will be returned in the following format:

	
	{
	  "event": "Badminton Mixed Doubles",
	  "medalists": [
	      {
		"name": "Tontowi Ahmad",
		"team": "Indonesia-1",
		"age": 29,
		"medal": "Gold"
	      },
	      {
		"name": "Chan Peng Soon",
		"team": "Malaysia",
		"age": 28,
		"medal": "Silver"
	      }
	    ]
	}
	
  
## Tech Stack
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sequelize](http://docs.sequelizejs.com/)
