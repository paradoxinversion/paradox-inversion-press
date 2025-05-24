# User

The `User` list contains all site users capable of modifying site data via the Keystone CMS.

## Fields

| Field        | Type         | Description                                                        |
|--------------|--------------|--------------------------------------------------------------------|
| username     | text         | A unique name that is used to sign in to the Keystone CMS.         |
| displayName  | text         | A unique name that is displayed on posts created by a user.        |
| email        | text         | A unique email                                                     |
| posts        | relationship | A one-to-many relationship of posts created by the user            |
| password     | password     | The user's password                                                |
| isAdmin      | checkbox     | Whether or not the user is able to execute administrator level queries |