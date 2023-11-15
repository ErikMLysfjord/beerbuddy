const protectRoute = async () => {
  const username = localStorage.getItem("userNameBeerBuddy");
  const userId = localStorage.getItem("userIdBeerBuddy");
  if (!username || !userId) {
    resetLocalStorage();
    return window.location.replace("/project2/login");
  }

  const res = await fetch(import.meta.env.VITE_APP_BACKEND_URL + "/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `{ login(username: "${username}") }`,
    }),
  }).then((r) => r.json());

  if (res.data.login && res.data.login.length === 0) {
    resetLocalStorage();
    return window.location.replace("/project2/login");
  }

  if (res.data.login[0].id !== userId) {
    resetLocalStorage();
    return window.location.replace("/project2/login");
  }
};

const resetLocalStorage = () => {
  localStorage.removeItem("userNameBeerBuddy");
  localStorage.removeItem("userIdBeerBuddy");
};

export default protectRoute;
