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

    let emailBody = '';
    let subject = '';

    if (formType === 'contact') {
      subject = `New Contact Form Submission from ${data.name}`;
      emailBody = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Company: ${data.company || 'N/A'}
Inquiry Type: ${data.inquiry_type}

${data.inquiry_type === 'board_member' ? `
Board Member Information:
Property Address: ${data.property_address || 'N/A'}
Number of Units: ${data.number_of_units || 'N/A'}
Board Position: ${data.board_position || 'N/A'}
Years at Property: ${data.years_at_property || 'N/A'}
Previous Management Experience: ${data.previous_experience || 'N/A'}
` : ''}

Message:
${data.message}
      `;
    } else if (formType === 'violation') {
      subject = `New Violation Report - ${data.violator_name}`;
      emailBody = `
New Violation Report Submitted

REPORTER INFORMATION:
Name: ${data.reporter_name}
Unit/Address: ${data.reporter_unit_address}
Contact: ${data.reporter_contact}
Report Date: ${data.report_date}

VIOLATOR INFORMATION:
Name: ${data.violator_name}
Unit: ${data.violator_unit}

VIOLATION DETAILS:
Types: ${data.violation_types}
Details: ${data.violation_details}

Previously Reported: ${data.reported_before}
Requested Action: ${data.requested_action}

Signature: ${data.signature}
      `;
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      },
      body: JSON.stringify({
        from: 'forms@stellarpropertygroup.com',
        to: 'mirsad@stellarpropertygroup.com',
        subject: subject,
        text: emailBody,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Failed to send email: ${error}`);
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
