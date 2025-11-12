import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface FormPayload {
  formType: 'contact' | 'violation';
  data: Record<string, any>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { formType, data }: FormPayload = await req.json();

    let result;

    if (formType === 'contact') {
      result = await supabase
        .from('contact_submissions')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          inquiry_type: data.inquiry_type,
          property_address: data.property_address || null,
          number_of_units: data.number_of_units || null,
          board_position: data.board_position || null,
          years_at_property: data.years_at_property || null,
          previous_experience: data.previous_experience || null,
          message: data.message,
        });
    } else if (formType === 'violation') {
      result = await supabase
        .from('violation_submissions')
        .insert({
          reporter_name: data.reporter_name,
          reporter_unit_address: data.reporter_unit_address,
          reporter_contact: data.reporter_contact,
          report_date: data.report_date,
          violator_name: data.violator_name || null,
          violator_unit: data.violator_unit || null,
          violation_types: data.violation_types,
          violation_details: data.violation_details,
          reported_before: data.reported_before,
          requested_action: data.requested_action,
          signature: data.signature,
        });
    }

    if (result?.error) {
      throw new Error(result.error.message);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
