<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #18181b;">
    <h2 style="margin-bottom: 0;">New Contact Form Submission</h2>
    <p style="color: #71717a; margin-top: 4px;">Submitted from the website contact form.</p>

    <table cellpadding="0" cellspacing="0" style="margin: 16px 0;">
        <tr>
            <td style="padding: 4px 12px 4px 0; font-weight: bold;">Name</td>
            <td style="padding: 4px 0;">{{ $submission['name'] }}</td>
        </tr>
        <tr>
            <td style="padding: 4px 12px 4px 0; font-weight: bold;">Email</td>
            <td style="padding: 4px 0;">{{ $submission['email'] }}</td>
        </tr>
        @if (! empty($submission['phone']))
            <tr>
                <td style="padding: 4px 12px 4px 0; font-weight: bold;">Phone</td>
                <td style="padding: 4px 0;">{{ $submission['phone'] }}</td>
            </tr>
        @endif
    </table>

    <p style="font-weight: bold; margin-bottom: 4px;">Message</p>
    <p style="white-space: pre-wrap;">{{ $submission['message'] }}</p>
</body>
</html>
