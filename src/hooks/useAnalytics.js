import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export async function trackClick(label) {
  await supabase.from("analytics").insert([{ type: "click", label }]);
}

export function useTrackVisit() {
  useEffect(() => {
    supabase.from("analytics").insert([{ type: "visit", label: "page_view" }]);
  }, []);
}
