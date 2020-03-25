const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/e_shop', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once("open",function () {
    console.log("mongodb数据库连接成功...")
})
let schema=mongoose.Schema;
let index_swipe_img_schema=new schema({
    img_urls:Array
})
let model1=mongoose.model("index_swipe_imgs",index_swipe_img_schema);

let news_list_img_schema=new schema({
    "id":Number,
    "news_title": String,
    "news_abstract":String,
    "news_cnt": String,
    "news_img_url":String,
    "create_time":Date
})
let model_newslist=mongoose.model("newslist",news_list_img_schema);

let house_schema=new schema({
    "id":Number,
    "title":String,
    "abstract":String,
    "img_arr":Array,
    "sale_price":Number,
    "market_price":Number,
    "stock":Number,
    "saled":Number
})

let house_model=mongoose.model("houseinfo",house_schema);



exports.house_model=house_model;
exports.newslist_model=model_newslist;
exports.index_model=model1;


//这是bilibili数据库user123集合的连接
