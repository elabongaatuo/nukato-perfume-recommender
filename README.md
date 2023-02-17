# Nukato Perfume Recommender
### Ever had trouble finding your perfume dupe or just a perfume you may like, when your favorite bottle runs out. This simple perfume recommendation system is out to solve that. Key in your perfume in the 'Find Your Perfume' page and you'll get a list of suggestions to try.It may not be perfume shazam, but it's a great place to start!



# Important Links 
Indulge your senses [here](https://nukato-front.onrender.com) <br>
Would you like to know how a recommender system works?No worries, I go over a simple one and explain how this project works [here](https://medium.com/@elabongaatuo/building-a-content-based-perfume-recommender-system-using-python-18da91b53f6b)

# Introduction
Frustrating, is what I would describe the process of looking for a new perfume when you just can't find your favorite one in stock. Perfumes have a science to them, layers upon layers to build a scent that is unique to you. In this project, I scraped a couple of websites for perfume details to create my dataset (perfume.csv). I then made a function that offers recommendations based on cosine similarity. And for interaction, I deployed it to a website. The important links are above. :)


# Project Flow
* Create a recommendation function using cosine similarity
* Use FASTAPI to make web-app
* Build Interactive Website

# Technologies Used
1. Python 3.7 
2. Javascript 
3. Bootstrap CSS 5.2.3 (Installed via CDN)
4. FASTAPI 

# Installation and Usage
``` # clone repo ```<br>
``` git clone git@github.com:elabongaatuo/nukato-perfume-recommender.git ```<br>
``` # change into directory ```<br>
``` cd nukato-perfume-recommender ```<br>
``` # install the necessary packages ```<br>
``` pip install -r requirements.txt ```<br>
``` # start the server ```<br>
```  uvicorn app:app --reload  ```

Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) , you should see this...

<img src="static\demovideo\Temp.PNG"  >

# Web Demo
<video src="static\demovideo\Demo.mp4"  ></video>

# Author
Elabonga Atuo <br>
Reach out to me via [email](elabongaatuo@gmail.com)

# Known Issues and Suggested Improvements
Loading the scripts may take a hot minute. Try minifying the javascript file.
ToDo: Improve loading time


# Files
1. static folder - This contains the static html,css and javascript files and the demos(video and images)
2. perfume.csv - contains a list of perfumes and details
3. improv_recsys.py - contains the recommender system code
4. app.py - contains FASTAPI setup




