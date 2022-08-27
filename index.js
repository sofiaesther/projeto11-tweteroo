import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const users =[];
const tweets =[];
app.post('/sign-up', (req,res)=>{
    const userdata = req.body;
    
    if(!userdata.username ||!userdata.avatar){
        res.status(400).send('Todos os campos são obrigatórios!');
        return
    }
    users.push(userdata);
    res.status(200).send("0k");
});

app.post('/tweets',(req,res)=>{
    const tweet = req.body;
    if(!tweet.username||!tweet.tweet){
        res.status(400).send('Todos os campos são obrigatórios!');
        return
    }
    tweets.push(tweet);
    res.status(200).send("Ok");
});

app.get('/tweets',(req,res)=>{
    const lasttweets = [];
    tweets.map((t,index)=>{
        let item = {};
        if(tweets.length-index<=10){
            item.username = t.username;
            item.tweet = t.tweet;
            let itemavatar = users.filter(function (u){return u.username===item.username});
            item.avatar = itemavatar[0].avatar;
            lasttweets.push(item);
        }});

    res.send(lasttweets);
});


app.listen(4000);
