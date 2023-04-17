const ExchangeType = ["direct" ,"fanout","topic"]
const Msg = require("../Modules/MsgModule");

const addMsg = async (req,rep)=>{
    try{
       data = req.body ;
       msg = new Msg(data);
         msgSave =  await msg.save()
         rep.send(msgSave);
         console.log(msgSave);

    }catch(error){ 
      rep.send(error)
   }

}
const getAllMsg =async (req,rep)=>{
    try{
       Msgs= await Msg.find()
        rep.send(Msgs)
    }catch(error){ 
      rep.send(error)
   }

}
const yourMsg =async (req,rep)=>{
    try{
      owner = req.params.reciver ;
      console.log(owner);
       Msgs= await Msg.find({reciver:owner})
        rep.send(Msgs)
    }catch(error){ 
      rep.send(error)
   }

}
const MsgBtw =async (req,rep)=>{
    try{
      Reciver = req.params.reciver ;
      Publisher = req.params.publisher ;
      // console.log(`Reciver : ${Reciver} .. Publisher : ${Publisher} `)
       Msgs= await Msg.find({ $or : [{reciver:Reciver,publisher:Publisher} , {reciver:Publisher,publisher:Reciver} ] })
       console.log(Msgs) 
        rep.send(Msgs)
    }catch(error){ 
      rep.send(error)
   }

}


const getOneMsg = async (req,rep)=>{
    try{
       myMsg = req.params.id ;
       getBk = await Msg.findById({_id:myMsg}) ;
       rep.send(getBk) ;
    }catch(error){ 
      rep.send(error)
   }

}

const DeleteMsg = async (req,rep)=>{
    try{
       myMsg = req.params.id ;
       delBk = await Msg.findByIdAndDelete({_id:myMsg}) ;
       rep.send(delBk) ;
    }catch(error){ 
      rep.send(error)
   }

} 
   


async function send() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue("tesqu");
  await channel.assertExchange("my_exchange",ExchangeType[0])
  await channel.bindQueue("tesqu","my_exchange","Key0618")
  await channel.sendToQueue("tesqu",Buffer.from('hello world worldfs01'));
  console.log("hello rabbit ♥")
  await channel.close() ;
  await connection.close() ;
  
}
async function reciver() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue("tesqu");
  console.log(" waitting for msg")
  channel.consume("tesqu" , msg =>{
    console.log(`reciver ${msg.content.toString()}`)
  },{noAck :true}) ;
  
}

module.exports= {
   getAllMsg,
   getOneMsg,
   addMsg,
   yourMsg,
   DeleteMsg,
   MsgBtw
}