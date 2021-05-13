export interface IUser{ 
    // "id"?:string,   
    // "Name":string,       
    // "Email":string,  
    // "Password":string,
    // "confirmPassword":string,        
    // 
    "Name":string, 
    "Email":string, 
    "Password":string ,
    "confirmPassword":string ,
    "Gender":Gender,
    // "BirthDate":Date,
    "Image":string
}

    
enum Gender{
    Male="Male",
    Female="Female"
}