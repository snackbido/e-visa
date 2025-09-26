import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";

export default function AuthLayout({ children }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  src="https://img.freepik.com/premium-photo/vector-illustration-person-designing-websitegenerative-ai_635062-1346.jpg?w=2000"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
