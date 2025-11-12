import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailPayload {
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
    const { formType, data }: EmailPayload = await req.json();

    const formspreeUrl = Deno.env.get('FORMSPREE_ENDPOINT');

    if (!formspreeUrl) {
      throw new Error('FORMSPREE_ENDPOINT not configured');
    }

    let emailData: Record<string, any> = {};

    if (formType === 'contact') {
      emailData = {
        subject: `New Contact Form Submission from ${data.name}`,
        name: data.name,
        email: data.email,
        phone: data.phone || 'N/A',
        company: data.company || 'N/A',
        inquiry_type: data.inquiry_type,
        message: data.message,
      };

      if (data.inquiry_type === 'board_nomination') {
        emailData.property_address = data.property_address || 'N/A';
        emailData.number_of_units = data.number_of_units || 'N/A';
        emailData.board_position = data.board_position || 'N/A';
        emailData.years_at_property = data.years_at_property || 'N/A';
        emailData.previous_experience = data.previous_experience || 'N/A';
      }
    } else if (formType === 'violation') {
      emailData = {
        subject: `New Violation Report - ${data.violator_name || 'Unknown'}`,
        reporter_name: data.reporter_name,
        reporter_unit_address: data.reporter_unit_address,
        reporter_contact: data.reporter_contact,
        report_date: data.report_date,
        violator_name: data.violator_name || 'N/A',
        violator_unit: data.violator_unit || 'N/A',
        violation_types: data.violation_types,
        violation_details: data.violation_details,
        reported_before: data.reported_before,
        requested_action: data.requested_action,
        signature: data.signature,
      };
    }

    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error(`Formspree request failed: ${response.statusText}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
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
