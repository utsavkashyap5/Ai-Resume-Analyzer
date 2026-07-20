# ☁️ AWS Infrastructure Diagram

<div align="center">

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                     ☁️ HIREMATCH AWS INFRASTRUCTURE                          │
└──────────────────────────────────────────────────────────────────────────────┘


                     🌍 hirematch.xyz
                             │
                             ▼
                     GoDaddy DNS Records
                             │
                             ▼
                       Elastic IPv4 Address
                             │
                             ▼
                  ┌────────────────────────┐
                  │      AWS EC2           │
                  │────────────────────────│
                  │ Ubuntu Server          │
                  │ Docker                │
                  │ Nginx                 │
                  │ Certbot              │
                  └─────────┬─────────────┘
                            │
          ┌─────────────────┴─────────────────┐
          ▼                                   ▼

 Frontend Container                  Backend Container
      React                            Express API
                                           │
                              ┌────────────┴─────────────┐
                              ▼                          ▼
                        MongoDB Atlas               AWS S3 Bucket
                     Users & Resume Data          Original PDFs

```

</div>