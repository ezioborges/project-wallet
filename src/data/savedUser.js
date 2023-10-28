const USER_KEY = 'user';

export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY)) || [];

export const setUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));