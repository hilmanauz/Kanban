# kanban-server
API untuk managing task, yang akan di hit oleh kanban client
Website: https://kanban-app-307511.web.app/

List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /tasks`
- `GET /categories`
- `POST /tasks/:id`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`


&nbsp;

Tech Stack used to build this app :
* Vue JS
* Express JS framework
* PostgreSQL
* Bcryptjs
* Cors
* Axios
* Google-auth-library
* Jsonwebtoken
* Sequelize

&nbsp;

## Global Responses
> These responses are applied globally on all endpoints

_Response (500 - Internal server error)_
```
{
  "message": "failed reach server to create data"
}
```

_Response (400 - Bad request)_
```
{
  "message": "[email has an @, Password must be more than 6 characters]" (validation)
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "invalid username or password"
}
```

_Response (404 - Unauthorized)_
```
{
  "message": "Request object not Found"
}
```

&nbsp;

## RESTful endpoints
### POST /register

> Register user

_Request Body_
```
{
    'username': 'string',
    'email': 'string',
    'password': 'string'
}
```
_Response (201 - Created)_
```
 {
    'msg': 'Succes create user',
    'user': {
        id,
        email: ,
        password,
        username
    }
 }
```


### POST /login

> Login user

_Request Body_
```
{
    'email': 'string',
    'password': 'string'
}
```

_Response (200)_
```
 {
    'access_token': 'string',
    'email': 'string',
    'username': 'string',
 }
```


---
### POST /googleLogin

_Request Body_
```
{
    'email': 'string',
    'username': 'string'
}
```

_Response (201 - Created)_
```
 {
    'access_token': 'string',
    'email': 'string',
    'username': 'string',
 }
```

---
### GET /tasks

> Get all task data in in category table with has many relation

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    'id': 'integer',
    'name': 'string',
    'Tasks':[
        {
            'id': 'integer',
            'title': 'string',
            'UserId': 'integer',
            'User': {
                'id': 'integer',
                email: 'string',
                password: 'string',
                username: 'string'

            },
            'CategoryId: 'integer'
        }...
    ]
} 

```


---
### GET /categories

> Get all category data in in category table

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed

```

_Response (200)_
```
 {
    'id': 'integer',
    'name': 'string',
    'updatedAt':'object',
    'createdAt':'object'
 }
```

---
### POST /tasks/:id

> Create task data from spesific category

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
{
    'title': 'string',
    'UserId': 'integer',
    'CategoryId': 'integer'
}
```

_Response (200)_
```
 {
    'id': 'integer',
    'title': 'string',
    'UserId': 'integer',
    'CategoryId': 'integer'
 }
 ```

 ---
### GET /tasks/:id

> GET task data from spesific id task
_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
no need

```

_Response (200)_
```
 {
    'id': 'integer',
    'title': 'string',
    'UserId': 'integer',
    'CategoryId': 'integer'
 }
 ```

 ---
### PUT /tasks/:id

> Update task title in task data from params id

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
{
    'title': 'string',
}
```

_Response (200)_
```
 {
    'title': 'string'
 }
 ```

 ---
### PATCH /tasks/:id

> Update task category in task data from params id

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
{
    'CategoryId': 'integer'
}
```

_Response (200)_
```
 {
    'id': 'integer',
    'title': 'string',
    'UserId': 'integer',
    'CategoryId': 'integer'
 }
 ```

  ---
### DELETE /tasks/:id

> DELETE task data from params id

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
{
    no need
}
```

_Response (200)_
```
 {
    'message': 'Task success to delete'
 }
 ```