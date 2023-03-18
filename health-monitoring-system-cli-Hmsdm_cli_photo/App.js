import 'expo-dev-client';
import "react-native-gesture-handler";
import AppNav from "./src/navigation/AppNav";
import { AuthProvider } from "./src/store/services/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
