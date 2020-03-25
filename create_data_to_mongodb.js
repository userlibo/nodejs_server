
const index_swipe_model=require("./conn.js")

index_swipe_model.create({
    img_urls:[
        "http://libo2020.oicp.io/get_index_swipe_img/1.jpg",
        "http://libo2020.oicp.io/get_index_swipe_img/2.jpg",
        "http://libo2020.oicp.io/get_index_swipe_img/3.jpg"
    ]
},(err)=>{
    if(err) return;
    console.log("数据创建成功...")
})