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

    let subject = '';
    let body = '';

    if (formType === 'contact') {
      subject = `New Contact Form Submission from ${data.name}`;
      body = `
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
      subject = `New Violation Report - ${data.violator_name || 'Unknown'}`;
      body = `
New Violation Report Submitted

REPORTER INFORMATION:
Name: ${data.reporter_name}
Unit/Address: ${data.reporter_unit_address}
Contact: ${data.reporter_contact}
Report Date: ${data.report_date}

VIOLATOR INFORMATION:
Name: ${data.violator_name || 'N/A'}
Unit: ${data.violator_unit || 'N/A'}

VIOLATION DETAILS:
Types: ${data.violation_types}
Details: ${data.violation_details}

Previously Reported: ${data.reported_before}
Requested Action: ${data.requested_action}

Signature: ${data.signature}
`;
    }

    const smtpUser = Deno.env.get('SMTP_USER');
    const smtpPass = Deno.env.get('SMTP_PASS');
    const recipientEmail = Deno.env.get('RECIPIENT_EMAIL') || smtpUser;

    if (!smtpUser || !smtpPass) {
      throw new Error('SMTP credentials not configured');
    }

    const emailContent = [
      `From: ${smtpUser}`,
      `To: ${recipientEmail}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      '',
      body
    ].join('\r\n');

    const base64Credentials = btoa(`${smtpUser}:${smtpPass}`);
    const base64Email = btoa(emailContent);

    const conn = await Deno.connect({
      hostname: 'smtp-mail.outlook.com',
      port: 587,
    });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    async function readResponse() {
      const buffer = new Uint8Array(1024);
      const n = await conn.read(buffer);
      return decoder.decode(buffer.subarray(0, n || 0));
    }

    async function sendCommand(command: string) {
      await conn.write(encoder.encode(command + '\r\n'));
      return await readResponse();
    }

    await readResponse();
    await sendCommand('EHLO localhost');
    await sendCommand('STARTTLS');

    const tlsConn = await Deno.startTls(conn, { hostname: 'smtp-mail.outlook.com' });

    async function sendTlsCommand(command: string) {
      await tlsConn.write(encoder.encode(command + '\r\n'));
      const buffer = new Uint8Array(1024);
      const n = await tlsConn.read(buffer);
      return decoder.decode(buffer.subarray(0, n || 0));
    }

    await sendTlsCommand('EHLO localhost');
    await sendTlsCommand('AUTH LOGIN');
    await sendTlsCommand(btoa(smtpUser));
    await sendTlsCommand(btoa(smtpPass));
    await sendTlsCommand(`MAIL FROM:<${smtpUser}>`);
    await sendTlsCommand(`RCPT TO:<${recipientEmail}>`);
    await sendTlsCommand('DATA');
    await sendTlsCommand(emailContent + '\r\n.');
    await sendTlsCommand('QUIT');

    tlsConn.close();

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
