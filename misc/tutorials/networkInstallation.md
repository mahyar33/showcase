# Network Installation 

- **import httprequest** 
- **use static promise functions for rest api(post,get,put,..)** 
successful
**notice:it's like ordinary promise if it's successful you get answers in 'then' if not you handle it in catch** 

## sample code
```
axios.post('/create', {a:'car'})
.then((response) => 
{
//if successful
}
)
.catch((error) => {
//if not
});
```


