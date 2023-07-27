const User =require('../models/user');



module.exports.profile = async function(req , res){
    if(req.cookies.user_id){
       const user= await User.findById(req.cookies.user_id)
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                })
            }

            return res.redirect('/users/sign-in')
        
    }else{
        return res.redirect('/users/sign-in');
    }
}
   

   
// render the sign up page
module.exports.signUp = function(req , res){
    return res.render('user_sign_up' ,{
        title: "codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req , res){
    return res.render('user_sign_in' ,{
        title: "codeial | Sign In"
    })


}



// get the sign up data

module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

  const user =  await User.findOne({email:req.body.email}) 
      

        if(!user){
           await User.create(req.body)
               
                return res.redirect('/users/sign-in');

            
            
        }else{
            return res.redirect('back');

         }
    }

// sign in and crete a session for the user

module.exports.createSession = async function(req,res){
   //steps to authincate
   //find the user
  const user = await User.findOne({email:req.body.email} )

    //handle user found
    if(user){
        // handle password which doesn't match
        if(user.password != req.body.password){
            return res.redirect('back');

        }
        // handle session creation
        res.cookie('user_id' , user.id);
        return res.redirect('/users/profile');

    }else{

        //handle user not found

        return res.redirect('back');

        
    }

  
}