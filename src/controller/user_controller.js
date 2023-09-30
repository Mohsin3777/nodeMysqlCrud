const db =require('../connections/conn')


const createUser =async(req,res) =>{

    try {
        var q = "INSERT INTO user(`name`,`age`,`birthDate`) VALUES(?)"

        var values =[
            req.body.name,
            req.body.age,
           new Date(),
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err.message);
            return res.json("Post has been created.");
          })
        
    } catch (error) {
        return res.status(400).json({success:false,error:error.message})
    }
}


const updateUser =async(req,res) =>{

   
    try {
        const userId = req.params.id;
        // var q = "UPDATE user SET `name=?`,`age=?`,`birthDate=?`  WHERE `id` = ?"
        const sql = `
        UPDATE user
        SET name = ?, age = ?, birthDate = ?
        WHERE id = ?
      `;

        var values =[
            req.body.name,
            req.body.age,
           new Date(),
        ];

        db.query(sql, [     req.body.name,req.body.age, new Date(), userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json({success:true, data:data});
          });
        
    } catch (error) {
        return res.status(400).json({success:false,error:error.message})
    }


    
}


const getAllUsers =async(req,res)=>{
    try {
        var q ="SELECT * FROM user"

        db.query(q,[],(err,data)=>{
            if(err) return res.status(400).json({success:false,error:err})
        
            if(data.length ===0) return res.status(400).json({success:false,error:"not found"})
        
            return res.status(200).json({success:true,data:data})
        })
    } catch (error) {
        if(error) return res.status(400).json({success:false,error:error.message})

    }
}



module.exports ={
    createUser,
    updateUser,
    getAllUsers
}