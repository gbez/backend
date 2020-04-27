# Scratchpad

##### Groups

We want to be able to create as many groups as we want.
We also want to be able to query for groups and add each relationship to a group.
There won't be more than a few hundred people in a given group, so perhaps a Many:Many relationship makes the most sense.

Perhaps it makes the most sense not to store the Group members in the Group Data Model and instead to just store the group names separately with their permissions.

One person won't be in more than a handful of groups, maybe two or three, and the time it would take to search to filter by group won't take too long if my data size doesn't grow more than a few thousand, which I don't think it will unless I generate a giant mailing list or something.

So we want to be able to to CRUD functionalities on Groups in general, and also to be able to add a person to a group within a Relationship Create/Edit or remove a person from a group, which is just removed the Group ID from their DB.

If a Group is deleted, it should be deleted from every person who has that DB. The Group information can be edited, but that won't change the id that the Relationships have stored in their Model.

So the main tricky thing is the deleting of the Group, and we want to be able to create a Group on a relationship so that it both Creates a new group with default settings as well as adds that group ID to the relationship it was created on.

Batch delete Contacts by deleting a group? If Contact is in no other field, then delete them. No reason to do so I think, but might be helpful to have built out?

##### Users/Auth

We really want to think through the process of our users and auth and who has permission to do what.

To start, we instantiate the user document with a superuser with role of "admin".
The admin can virtually do anything it wants to do. It can create other users, delete/update other users (by changing their status to inactive, as opposed to actually deleting them which may screw up some data).

any user can change his/her password by going through the password reset functionality.

a user can change his or her own information at the /me endpoint.

A user can login with their credentials.

A user may NOT change their role, active status, or any of the password related data.
Just name, email, photo.

1. Sign Up (should we verify email?) DONE
2. Log In
3. Reset Password (use email)
4. Update Self
5. Update other users (admin)
