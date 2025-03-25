

export const login = async (userData) => {
  const res = await fetch(`http://localhost:5000/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return res.json();
};
