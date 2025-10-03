const API_URL = "http://localhost:4000/api/workout-plans";

export const getWorkoutPlans = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createWorkoutPlan = async (plan) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });
  return res.json();
};

export const updateWorkoutPlan = async (id, plan) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });
  return res.json();
};

export const deleteWorkoutPlan = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
