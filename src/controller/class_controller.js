const db =require('../connections/conn')
const Database= require('../utils/database')

const db1 = new Database({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school'
  });

const createClass =async(req,res) =>{

    try {
        var q = "INSERT INTO class(`name`,`userId`,`teacher`) VALUES(?)"

        var values =[
            req.body.name,
            req.body.userId,
            req.body.teacher
         
        ];

    //  await   db1.insert('class',values)

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err.message);
            return res.json("Post has been created.");
          })
        
    } catch (error) {
        return res.status(400).json({success:false,error:error.message})
    }
}


const getAllConectData =async(req,res)=>{
    try {
        var q ="SELECT * FROM user right join class on user.id = class.userId"

        db.query(q,[],(err,data)=>{
            if(err) return res.status(400).json({success:false,error:err})
        
            if(data.length ===0) return res.status(400).json({success:false,error:"not found"})
        
            return res.status(200).json({success:true,data:data})
        })
    } catch (error) {
        if(error) return res.status(400).json({success:false,error:error.message})

    }
}


const updateClass =async(req,res) =>{
    const user = {
        // userId: req.params.id,
        name: req.body.name,
        teacher: req.body.teacher
      };
    
    try {
        var q =
       `UPDATE class SET name = ? WHERE id = ? `;

       const sql = 'UPDATE class SET ? WHERE id = ?';
        var values =[
            req.body.name,
            req.body.teacher
            
         
        ];

        db.query(sql, [user, req.params.id], (err, data) => {
            if (err) return res.status(500).json(err.message);
            return res.json("Post has been created.");
          })
        
    } catch (error) {
        return res.status(400).json({success:false,error:error.message})
    }
}


module.exports ={
    createClass,
    getAllConectData,
    updateClass
}
