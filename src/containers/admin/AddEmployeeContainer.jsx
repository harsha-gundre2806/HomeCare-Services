import { useState } from "react";
import AddEmployee from "../../components/admin/AddEmployee";
import { supabase } from "../../lib/supabase";

export function AddEmployeeContainer(){
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (data) => {
        if (loading) return;
        setLoading(true);


        console.log("Saving to Supabase:", data);

        const { error } = await supabase.from("employees").insert([
            {
                name: data.name.trim(),
                email: data.email.trim().toLowerCase(),
                specialization: data.specialization,
                role: data.role,
                is_active: true,
            },
        ]);

        setLoading(false);

        if (error) {
            if (error.code === "23505") {
                alert("Employee with this email already exists.");
            } else {
                console.error("Supabase error:", error.message);
                alert("Something went wrong. Please try again.");
            }
            return;
        }
        alert("Employee added successfully!");
    };

    return <AddEmployee onSubmit={handleSubmit} disabled={loading}/>;
}