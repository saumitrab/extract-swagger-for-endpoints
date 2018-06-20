Extract swagger/openapi spec with only required endpoint(s).

```
npm i -g extract-swagger-for-endpoints

extract-swagger-for-endpoints --src sourcefile.yml --dest output.yml '/pet/findByStatus' '/pet'

extract-swagger-for-endpoints --src sourcefile.yml --list-paths
```

TODO:

1.  Fetch source yml from a url
1.  Add swagger schema verification step
1.  Remove unnecessay tags
