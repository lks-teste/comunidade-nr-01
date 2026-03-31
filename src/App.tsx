import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Explorar from "./pages/Explorar";
import Comunidades from "./pages/Comunidades";
import Perfil from "./pages/Perfil";
import Notificacoes from "./pages/Notificacoes";
import Moderacao from "./pages/Moderacao";
import Mensagens from "./pages/Mensagens";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/comunidades" element={<Comunidades />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/moderacao" element={<Moderacao />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
