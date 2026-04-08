exports.handler = async () => {
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  const shop = "la-bottega-della-sorana.myshopify.com";

  try {
    const res = await fetch(
      `https://${shop}/admin/api/2024-01/orders/count.json?status=any`,
      { headers: { "X-Shopify-Access-Token": token } }
    );
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
      body: JSON.stringify({ count: data.count }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Errore nel recupero ordini" }),
    };
  }
};
