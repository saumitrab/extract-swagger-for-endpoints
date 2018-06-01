Extract swagger/openapi spec with only required endpoint(s).

```
# example use:
./bin/extract-swagger --src sourcefile.yml --dest output.yml '/pet/findByStatus' '/pet'

# list paths
./bin/extract-swagger --src sourcefile.yml --list-paths
```

TODO:
1. Fetch source yml from a url
2. Add swagger schema verification step
