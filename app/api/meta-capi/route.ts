import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { eventName, eventID, customData, timestamp } = body;

        const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
        const accessToken = process.env.META_CAPI_TOKEN;

        // Se accessToken e pixelId não estiverem configurados, loga apenas em dev
        if (!pixelId || !accessToken) {
            console.warn('Meta Pixel ID ou Token ausente em .env.local.');
            return NextResponse.json({ success: false, message: 'Falta configuração do Meta' }, { status: 500 });
        }

        const payload = {
            data: [
                {
                    event_name: eventName,
                    event_time: timestamp || Math.floor(Date.now() / 1000),
                    action_source: "website",
                    event_id: eventID,
                    user_data: {
                        client_user_agent: request.headers.get('user-agent'),
                        client_ip_address: request.headers.get('x-forwarded-for') || '0.0.0.0',
                    },
                    custom_data: customData,
                }
            ],
            // test_event_code: "TEST3543" // Se precisar testar
        };

        const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        return NextResponse.json({ success: true, api_response: data });

    } catch (error) {
        console.error('CAPI Server Error:', error);
        return NextResponse.json({ success: false, message: 'Erro interno' }, { status: 500 });
    }
}
