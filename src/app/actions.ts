'use server';

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export interface ActionResponse {
    success: boolean;
    message: string;
}

export async function submitContactForm(formData: ContactFormData): Promise<ActionResponse> {
    // Log the form data to console (as per requirements)
    console.log('=== Contact Form Submission ===');
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Phone:', formData.phone);
    console.log('Message:', formData.message);
    console.log('Timestamp:', new Date().toISOString());
    console.log('================================');

    // Simulate a slight delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would:
    // 1. Validate the data server-side
    // 2. Send an email notification
    // 3. Store in database
    // 4. Integrate with CRM

    // For now, return success
    return {
        success: true,
        message: 'Thank you for reaching out! We\'ll get back to you within 24 hours.',
    };
}
