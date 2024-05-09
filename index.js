const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const MONGO_URL="mongodb+srv://samuel:Coldpath@2935@users.np1fvcv.mongodb.net/"
// mongodb+srv://samuel:Coldpath@2935@users.np1fvcv.mongodb.net/?retryWrites=true&w=majority&appName=users
// mongodb+srv://samuel:Coldpath@2935@users.np1fvcv.mongodb.net/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use('/uploads', express.static('uploads'));

app.use(
  cors({
    origin: '*',
  })
);

// MONGO_URL IS NOT DEFINED
mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server Running and Database Connected');
    });
  })
  .catch((err) => {
    console.log(err);
  });
