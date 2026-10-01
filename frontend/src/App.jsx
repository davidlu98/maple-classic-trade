import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Help from "./Help";
import About from "./About";
import Privacy from "./Privacy";
import Terms from "./Terms";
import Feedback from "./Feedback";
import Home from "./Home";
import AuthSuccess from "./AuthSuccess";
import Account from "./Account";
import List from "./List";
import ListingSearch from "./ListingSearch";
import Listing from "./Listing";
import EditListing from "./EditListing";
import User from "./User";
import ReportListing from "./ReportListing";

import { Alert, Box, Snackbar } from "@mui/material";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUser = async () => {
    const token = window.localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/account`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Invalid token");

      // Only remove the token if the server explicity says "unauthorized"
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/items/search`);
      setItems(response.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Error fetching item search data",
      );
    }
  };

  useEffect(() => {
    fetchUser();
    fetchItems();
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Box className="App">
      <Navbar user={user} logout={logout} />

      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home items={items} />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/account" element={<Account user={user} />} />
          <Route
            path="/list"
            element={<List items={items} fetchUser={fetchUser} />}
          />
          <Route path="/search" element={<ListingSearch allItems={items} />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/listing/:listingId/edit" element={<EditListing />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/report/:listingId" element={<ReportListing />} />
        </Routes>
      </Box>
      <Footer />
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
