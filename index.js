const express =require('express')
const conn =require('./src/connections/conn')
const app =express()

const port = process.env.PORT || 7000
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true }));

const userRoute =require('./src/routes/user')
const classRoute =require('./src/routes/class')

app.use('/api/user',userRoute)
app.use('/api/class',classRoute)

// conn.connect(function(error){
//     if(error) throw error
//     // if(error){
//     //     console.log(error)
//     // }

//     conn.query('select * from students',function(error,result){
//         if(error) throw error
//         // if(error){
//         //     console.log(error)
//         // }
//         console.log(result)
//     })
// })

app.get('/',function(req,res){
    res.json('aaaaaaaaaa')
})
app.post('/a',function(req,res){
    try {
        const {name,email,mob} = req.body
        conn.connect(function(error){
            // if(error) throw error
        
            // conn.query('select * from students',function(error,result){
            //     if(error) throw error
        
            //     console.log(result)
            // })

            // var sql = "INSERT INTO students(name , email, mob) VALUES('"+name+"' ,'"+email+"', '"+mob+"')"
            var sql = "INSERT INTO students(name , email, mob) VALUES ?"

            var values=[
                [name,email,mob]
            ]


             conn.query(sql,[values],function(error,result){
                // if(error) throw error
        console.log(result)
                res.status(200).json(result)
            })
        })
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
})




//get students
app.get('/students',function(req,res){
    try {
     
        conn.connect(function(error){
            if(error) console.log(error)
        
          
            var sql = "select * from students"
             conn.query(sql,function(error,result){
                if(error) console.log(error)
        console.log(result)
                res.status(200).json(result)
            })
        })
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
})


//delete student
app.get('/delete-students/:id',function(req,res){
    try {
     
        conn.connect(function(error){
            if(error) console.log(error)
        
          
            var sql = "delete  from students where id=?"

            const id= req.params.id
             conn.query(sql,[id],function(error,result){
                if(error) console.log(error)
        console.log(result)
                res.status(200).json(result)
            })
        })
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
})

//update
app.post('/update-students',function(req,res){
    try {
        const {name,email,mob, id} = req.body
        conn.connect(function(error){
            if(error) console.log(error)
        
          
            var sql = "UPDATE students set name=?, email=?, mob=? where id=?"

      
             conn.query(sql,[name,email,mob, id],function(error,result){
                if(error) console.log(error)
        console.log(result)
                res.status(200).json(result)
            })
        })
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
})




app.listen(port, () => {
    console.log('Server is running at '+port)
})