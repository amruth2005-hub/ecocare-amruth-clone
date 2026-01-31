const API_BASE = "http://localhost:5000/api/dashboard";

export const addDetection = async (data) => {
  const res = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getRecentDetections = async () => {
  const res = await fetch(`${API_BASE}/recent`);
  return res.json();
};
