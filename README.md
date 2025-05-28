# Paradox Inversion Press

## CLI Commands

### Starting Keystone for Development

`yarn keystone dev`

### Resetting the Database 

`$ keystone prisma db push --force-reset`

### Building Keystone for Production

`$ keystone build`

### Starting Keystone for Production

`$ keystone start`

> Additional information for Keystone (and prisma) CLI commands can be found [here](https://keystonejs.com/docs/guides/cli)

## Development Credentials

In development, the following credentials should be utilized:

```
username: testuser
displayName: Test User
email: testuser@example.com
password: testpassword
```