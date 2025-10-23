import { env } from '$env/dynamic/private';

export async function POST({ request }) {
  const body = await request.json();
  const amount = body.amount;
  const currency = body.currency ?? 'KES';
  const phone = body.phone ?? '';
  const description = body.description ?? 'Order payment';

  const COMPANY_TOKEN = env.DPO_COMPANY_TOKEN;
  const API_URL = env.DPO_API_URL ?? 'https://secure.3gdirectpay.com/API/v6/';

  if (!COMPANY_TOKEN) {
    return new Response(JSON.stringify({ error: 'DPO_COMPANY_TOKEN not configured' }), { status: 500 });
  }
  if (!amount) {
    return new Response(JSON.stringify({ error: 'amount is required' }), { status: 400 });
  }

  const companyRef = `ORDER-${Date.now()}`;
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<API3G>
  <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
  <Request>createToken</Request>
  <Transaction>
    <PaymentAmount>${amount}</PaymentAmount>
    <PaymentCurrency>${currency}</PaymentCurrency>
    <CompanyRef>${companyRef}</CompanyRef>
    <customerPhone>${phone}</customerPhone>
    <customerEmail></customerEmail>
    <DefaultPayment>MO</DefaultPayment>
    <DefaultPaymentCountry>kenya</DefaultPaymentCountry>
    <DefaultPaymentMNO>mpesa</DefaultPaymentMNO>
    <TransactionSource>Web</TransactionSource>
  </Transaction>
  <Services>
    <Service>
      <ServiceDescription>${description}</ServiceDescription>
      <ServiceAmount>${amount}</ServiceAmount>
    </Service>
  </Services>
</API3G>`.trim();

  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml; charset=utf-8' },
      body: xml
    });

    const text = await resp.text();
    if (!resp.ok) {
      return new Response(JSON.stringify({ error: 'DPO API error', raw: text }), { status: 502 });
    }

    const tokenMatch = text.match(/<TransToken>([^<]+)<\/TransToken>/i)
      || text.match(/<TransactionToken>([^<]+)<\/TransactionToken>/i)
      || text.match(/<TransactionID>([^<]+)<\/TransactionID>/i);

    if (!tokenMatch) {
      return new Response(JSON.stringify({ error: 'No transaction token returned by DPO', raw: text }), { status: 502 });
    }

    const transToken = tokenMatch[1];
    const paymentUrl = `https://secure.3gdirectpay.com/payv2.php?ID=${encodeURIComponent(transToken)}`;

    return new Response(JSON.stringify({ paymentUrl, transToken, companyRef }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('DPO create transaction error', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
