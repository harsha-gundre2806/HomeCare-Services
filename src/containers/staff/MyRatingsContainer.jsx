import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import MyRating from "../../components/staff/MyRatings";

 function MyRatingsContainer() {
  const [ratings, setratings] = useState([]);

  useEffect(() => {
    loadRatings();
  },[]);

  async function loadRatings() {
    const { data, error } = await supabase
     .from("staff_ratings")
     .select("id,patient_name, rating");

     if(error) {
      console.error("Error loading ratings :",error);
      return;
     }

     const formatted = (data || []).map((r) => ({
      id : r.id,
      name : r.patient_name,
      rating : r.rating,
     }));
     setratings(formatted);
  }

  return <MyRating ratings={ratings} />;
}

export default MyRatingsContainer;