exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  if (!process.env.GEMINI_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "GEMINI_API_KEY is not set on Netlify" }),
    };
  }

  try {
    const parsedBody = event.body ? JSON.parse(event.body) : {};
    const message = parsedBody.message;

    if (!message || !String(message).trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are AquaSave AI, a friendly expert on water conservation.
The creators of this website are Ayush Singh, Prathmesh Achare, Kunal Datkhile, and Alby John.
Do not introduce the creators unless the user specifically asks who created the website.

User: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: "Gemini API request failed",
          details: data,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Server error",
        details: err.message,
      }),
    };
  }
};
