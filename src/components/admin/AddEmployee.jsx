import { useEffect } from "react";
import { supabase } from "../../lib/supabase";


function AddEmployee() {

    useEffect(() => {
        console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
        console.log("Supabase Key:", import.meta.env.VITE_SUPABASE_ANON_KEY);
        console.log("Imported supabase:", supabase);
    }, []);
    

    return (
      <div>
        <h1>Add Employee</h1>
      </div>
    );
  }
  
  export default AddEmployee;
  

