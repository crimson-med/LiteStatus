# Lite Status

to define...

# Installation 

install the dev packages with yarn:

```
yarn
```

# Developement 

```
yarn start
```

# Build

```
yarn build
```

# Publish Package

First login to the npm cli if not already done

```
npm login
```

You will need to remove the following line in your `package.json`

```
private: true,
```

To publish a patch

```
yarn patch
```

To publish a minor

```
yarn minor
```

To publish a major

```
yarn major
```



