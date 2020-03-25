const model=require("./conn.js");
const express=require("express");
const app=express();
const path=require("path");
const bodyParser=require("body-parser");
const router=require("./router.js");

let index_model=model.index_model;
let newslist_model=model.newslist_model;
let house_model=model.house_model;
// app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

//解决跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

//设定路由解析
// app.get("/get_user_info",function (req,res) {
//     usermodel.find({},(err,data)=>{
//        res.send(data);
//     })
//
// });
app.use("/get123",(req,res)=>{
     res.send("123456");
})

app.post("/savenewslist",bodyParser.json(),(req,res)=>{
        console.log(req.body)
        console.log("456")
      newslist_model.find({},{id:1},{sort:{id:1}},(err,docs)=>{
          if(err) return ;
           let num=docs.length;
           console.log("num:",num)
           let newsid=1;
           if(num==0)
           {
               newsid=1;
           }
           else
           {
               newsid=num+1;
           }

          let news_obj={
              "id":newsid,
              "news_title": req.body.news_title,
              "news_abstract":req.body.news_abstract,
              "news_cnt":req.body.news_cnt,
              "news_img_url":req.body.news_img_url,
              "create_time":req.body.create_time
          }
           console.log(news_obj)
          newslist_model.create(news_obj,(err)=>{
              res.send(req.body)
              if(!err)  console.log("数据添加成功:")
          })
      })
})

//新闻列表监听路由
app.get("/getnewslist",(req,res)=>{

        newslist_model.find({},{},{limit:10,sort:{create_time:-1}},(err,docs)=>{
            res.json(docs)
        })
})

app.get("/getnewscnt/:id",(req,res)=>{
    console.log("999")
    console.log(req.params)
    let id1=req.params.id;
    newslist_model.findOne({id:id1},{},(err,doc)=>{
           res.json(doc)
    })
    // res.json(req.params)

})

//响应购物车页面请求
app.get("/getshopcarinfo/:ids",(req,res)=>{

    let ids_str=req.params.ids;
    let ids_arr=ids_str.split(",");
    //
    // ids_arr.map(item=>{
    //     return parseInt(item);
    // })

    // console.log("ids_arr",JSON.stringify(ids_arr));
    house_model.find({id:{$in:ids_arr}},(err,docs)=>{
        if(err) return;
        res.json(docs)
    })

});


//保存房源信息
app.post("/savehouseinfo",(req,res)=>{

    // console.log(req.body);
    // house_model.create(req.body,err=>{
    //     if(err) console.log(err);  return;
    //     console.log("数据添加成功")
    //     res.send(req.body)
    // })
    // res.send("456要加油呀")

//    代码片段
    house_model.find({},{id:1},{sort:{id:1}},(err,docs)=>{
        if(err) return ;
        let num=docs.length;
        console.log("num:",num)
        let id=1;
        if(num==0)
        {
            id=1;
        }
        else
        {
            id=num+1;
        }

        let obj={
            "id":id,
            "title": req.body.title,
            "abstract":req.body.abstract,
            "img_arr":req.body.img_arr,
            "sale_price":req.body.sale_price,
            "market_price":req.body.market_price,
            "stock":req.body.stock,
            "saled":0
        }
        console.log(obj)
        house_model.create(obj,(err)=>{
            res.json(obj)
            if(!err)  console.log("数据添加成功:")
        })
    })

})


//获取房源信息列表路由
app.get("/gethouseinfo",(req,res)=>{
       house_model.find({},{},{limit:10,sort:{id:1}},(err,docs)=>{
                if(err) return err;
                res.json(docs)
       })

})

app.get("/gethouse_single/:id",(req,res)=>{
    let id1=req.params.id
    console.log("id1:",id1)
    house_model.findOne({id:id1},(err,doc)=>{
        if(err) return;
        res.json(doc)
    })

})

//首页index swipe的图片获取接口
app.get("/get_index_swipe_img_url",(req,res)=>{
    index_model.findOne({},(err,data)=>{
        // console.log(data)
        res.send(data)
    });
})


//设定静态资源路由
app.use("/get_index_swipe_img",express.static(path.join(__dirname,"./src/img/index_swipe")))

//设定服务器的读取
//////////////////////////
//设置保存规则

/////////////////////////
app.use("/upload",express.static(path.join(__dirname,"./upload")))
app.use(router);

app.listen(3001,"192.168.0.111",res=>{
    console.log("server is running...");
});







