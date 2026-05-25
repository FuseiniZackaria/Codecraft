import { supabase } from './supabase'

export async function trackVisit() {
  await supabase.from('analytics').insert([{ type: 'visit', label: 'page_view' }])
}

export async function trackClick(label) {
  await supabase.from('analytics').insert([{ type: 'click', label }])
}
