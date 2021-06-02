## Setup for Mongoose

---

1. In index file, require mongoose:

```javascript
const mongoose = require("mongoose");
```

2. Connect your mongoose instance to the DB and configure:

```javascript
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
```

_It is best to store the mongoose connection string in env so everyone can not change your DB structure and content_

3. Create your Schema Models:

```javascript
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 },
});

mongoose.model("users", userSchema);
```

_You can specify a schema by either just saying its type or by setting a series of objects with attributes set within it_

_Destructure out Schema, and be sure to export the model to mongoose as shown in the bottom. The first argument for the export is the collection name, second argument is the matching schema_

4. To redirect in routes use the res.redirect function:

```javascript
app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
        res.redirect("/surveys");
    }
);
```

5. The max size of a single document in MongoDB is 4mb, be careful about using subdocuments(subclasses) inside classes. Often relational keys are better than direct association.
