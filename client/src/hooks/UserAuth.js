import { useSelector } from "react-redux";

export default function UserAuth(){
    const user = useSelector((state) => state.auth.user);
   console.log("user",user)
    if(user){
        return true;
    }
    else{
        return false
    }
}