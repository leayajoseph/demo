const express=require("express")

const router=express.Router()

const demoModel=require("../model/signupModel")

const bcrypt=require("bcryptjs")

hashPasswordGenerator=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

router.post("/signup",async(req,res)=>{
    let {data}={"data":req.body}
    let password=req.body.password
    hashPasswordGenerator(password).then(
        (hashedPassword)=>{
            console.log(hashedPassword)
            data.password=hashedPassword
            console.log(data)
            let demo=new demoModel(data)
        let result=demo.save()
        res.json(
            {status:"success"}
        )
        }
    )
})

module.exports=router