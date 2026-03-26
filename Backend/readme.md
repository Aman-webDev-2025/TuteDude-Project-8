###                               Backend (Server)

# GitHub repo link: https://github.com/Aman-webDev-2025/Todo-List

# Deployment URL : https://tutedude-project-8.onrender.com

# How to run:
    cd Backend
    npm i
    npm run dev or node server.js

# Project Structure:
    server.js              --> entry point
    db.js                  --> mongodb connection setup
    models/todoModels.js   --> database schema
    routes/todo.js         --> API route
    controller/todoController.js  --> logic for handling requests

# Environment Variable

    created .env file which contain:
    --    PORT=4000
    --    MONGO_URI =mongodb+srv://aman_kumar:dKF2pZxQ2v1E2v9d@cluster0.mn0zlnn.mongodb.net/

# commands used in backend: 
    npm init -y       --> installing package.json file
    npm i express     --> installing express package
    npm i -g nodemon  --> for not killing server again and again
    npm i dotenv      --> for .env file
    npm i mongoose    --> for connecting database
    npm install cors  --> for showing data on frontend
    npm run dev       --> for running server



# API EndePoints with Screensorts:

GET           /                         -- home page            ![](../screenshorts/home-page.png)
GET           /todos                    -- get all todos        ![](../screenshorts/get-all-todos.png)
GET           /todos/search?query       -- search todos         ![](../screenshorts/search-todo.png)
POST          /todos                    -- add new todo         ![](../screenshorts/add-todo.png)
GET           /todos/:id                -- get todo by id       ![](../screenshorts/get-by-id.png)
DELETE        /todos/:id                -- delete todo by id    ![](../screenshorts/delete-todo.png)
PATCH         /todos/:id                -- update todo by id    ![](../screenshorts/update-todo.png)
Patch         /todos/:id/status         -- update status only   ![](../screenshorts/update-Status.png)


# Chalange Faced:

* Sorting --> firstly tried to sort data in JavaScript but afterwards learn that in mongoDb is much fast and easy.

* Data Structure --> relize that keeping isCompleted as a default "false" in Schema makes fronted much easier to build