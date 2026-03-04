import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import MyAssessment from "../../pages/staff/MyAssignments";

export default function StaffAssignmentsContainer() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    loadAssignments();
  }, []);

  async function loadAssignments() {
    const { data, error } = await supabase
      .from("service_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading assignments:", error.message);
      return;
    }

    setAssignments(data || []);
  }

  return <MyAssessment assessments={assignments} />;
}