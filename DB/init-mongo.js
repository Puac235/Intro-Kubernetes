db.createUser(
    {
        user : "puac",
        pwd : "1234",
        roles : [
            {
                role : "readWrite",
                db : "dbSemi"
            }
        ]
    }
)