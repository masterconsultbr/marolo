import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-500 flex items-center gap-2">
            ⚽ marolo app
          </Link>
          
          <div className="hidden md:flex gap-6">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/players">Jogadores</NavLink>
            <NavLink to="/payments">Mensalidades</NavLink>
            <NavLink to="/games">Jogos</NavLink>
            <NavLink to="/attendance">Presença</NavLink>
            <NavLink to="/cash">Caixa</NavLink>
            <NavLink to="/stats">Estatísticas</NavLink>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex gap-2">
            <MobileNavLink to="/players">👥</MobileNavLink>
            <MobileNavLink to="/payments">💳</MobileNavLink>
            <MobileNavLink to="/games">🎮</MobileNavLink>
            <MobileNavLink to="/cash">💰</MobileNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link 
      to={to} 
      className="text-gray-300 hover:text-green-500 transition-colors text-sm font-medium"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children }) {
  return (
    <Link 
      to={to} 
      className="text-gray-300 hover:text-green-500 transition-colors text-lg"
    >
      {children}
    </Link>
  );
}