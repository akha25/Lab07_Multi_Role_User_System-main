(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@app.com", password: "admin123" }),
    });
    const data = await res.json().catch(() => ({}));
    console.log("status:", res.status);
    console.log("body:", JSON.stringify(data));
    if (res.ok && data.token) {
      const usersRes = await fetch("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const users = await usersRes.json().catch(() => ({}));
      console.log("users status:", usersRes.status);
      console.log("users body:", JSON.stringify(users));
    }
  } catch (e) {
    console.error("error:", e.message);
  }
})();
