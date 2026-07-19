<div align="center">

```text
             ┌──────────────────────────────┐
             │   USER REGISTRATION FLOW     │
             └──────────────────────────────┘

        User
          │
          ▼
 Registration Form
          │
     Axios POST
          │
          ▼
  Express Backend
          │
 Validate Request
          │
          ▼
 Hash Password
 (bcrypt.hash)
          │
          ▼
 MongoDB Atlas
          │
 Store New User
          │
          ▼
 Registration Success
          │
          ▼
 Redirect to Login

```

</div>



<div align="center">

```text
               ┌──────────────────────────────┐
               │      USER LOGIN FLOW         │
               └──────────────────────────────┘

        User
          │
          ▼
 React Login Page
          │
     Axios POST
          │
          ▼
  Express Backend
          │
 Validate Credentials
          │
 bcrypt.compare()
          │
          ▼
 MongoDB Atlas
          │
     User Found?
      ┌───┴─────┐
      │         │
     Yes        No
      │         │
      ▼         ▼
 Generate JWT   401 Unauthorized
      │
 Create HTTP-only Cookie
      │
      ▼
 Redirect to Dashboard

```

</div>


<div align="center">

```text
          ┌──────────────────────────────────┐
          │    PROTECTED REQUEST FLOW        │
          └──────────────────────────────────┘

 Browser
    │
 HTTP-only Cookie
    │
    ▼
 Express Middleware
    │
 Verify JWT
    │
    ▼
 Token Valid?
 ┌────┴──────────┐
 │               │
Yes              No
 │               │
 ▼               ▼
Attach User    401 Unauthorized
 │
 ▼
Controller
 │
 ▼
JSON Response

```

</div>