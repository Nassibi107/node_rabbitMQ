const ExchangeType =["direct","topic","fanout","headers"] 
const keys =  ["Key0618"]
const Msg = require("../Modules/MsgModule");
const amqp=require("amqplib");
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
   

const connectRabbitMq = async() =>{
    const queueName = "tesqu"
    const exName = "my_exchange"
    const connection=await amqp.connect("amqp://localhost");
    const channel= await connection.createChannel();
    await channel.assertQueue(queueName);
    await channel.assertExchange(exName,ExchangeType[0]);
    await channel.bindQueue(queueName,exName,keys[0])
    return channel
}

const connextPromise = connectRabbitMq(); 
const SendOne = async (req,res)=>{
    try {
        const {message} = req.body
        console.log(message)
        const channel = await connextPromise
        channel.publish("my_exchange", keys[0], Buffer.from(JSON.stringify(message)));
        res.status(200).json({"Message":"Sent Message succes"});
    } catch (error) {
        res.status(500).json({error:"internal server error"})
        console.log(error)
    }
}


const consume = async(req,res)=>{
    try {
        const queueName = "tesqu"
        const channel = await connextPromise
        await channel.assertQueue(queueName);
        await channel.bindQueue(queueName, "my_exchange", keys[0]);

        // consume messages from queue
        channel.consume(queueName, (message) => {res.json({message:`Received message: ${message.content.toString()}`})
        channel.ack(message);
        
    })

    // acknowledge receipt of message
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }

   }

module.exports= {
   getAllMsg,
   getOneMsg,
   addMsg,
   yourMsg,
   DeleteMsg,
   MsgBtw,
   SendOne,
   consume


}