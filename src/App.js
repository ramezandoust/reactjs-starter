import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";

import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import AppRouting from "./components/AppRouting";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <GlobalProvider>
          <LanguageProvider>
            <Toaster />
            <Router>
              <AppRouting />
            </Router>
          </LanguageProvider>
        </GlobalProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
