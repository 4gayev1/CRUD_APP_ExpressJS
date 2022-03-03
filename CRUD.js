const exp = require('express');
const app = exp();
const db = require('./db');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.set('viewengine','pug');
app.set('views','views');

app.get('/', (req,res,next) =>{
    res.render('index.pug');
});

app.post('/add-user',(req,res,next) =>{
    db.execute("INSERT INTO users (name,surname,email,password) VALUES(?,?,?,?)",[req.body.name,req.body.surname,req.body.email,req.body.password]);
    res.redirect('/');
});

app.get('/users',async (req,res,next) =>{
    const r = await db.execute("SELECT * FROM users");
    const datas = r[0];
    res.render('table.pug',{datas:datas});
});

app.get('/:id',(req,res,next) =>{
    res.render('updateForm.pug',{id:req.params.id});
});

app.post('/edit/:id',(req,res,next) =>{
    db.execute("UPDATE users SET name = ?,surname=?,email=?,password=? WHERE id = ?",[req.body.name,req.body.surname,req.body.email,req.body.password,req.params.id])
    res.redirect("/users");
});

app.get('/delete/:id',(req,res,next) =>{
        db.execute("DELETE FROM users WHERE id=?",[req.params.id]);
        res.redirect("back");
});

app.listen(3000);

