  <header className="bg-gray-700 text-neutral-content">
      <div className="navbar container mx-auto px-4">
        <img src={logo} alt="logo" />
        <div className="navbar-start">
          <Link to="/" className="text-xl font-bold">ProShop</Link>
        </div>

        {/* Toggle for mobile */}
        <div className="navbar-end lg:hidden">
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </summary>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content">
              <li>
                <Link to="/cart">
                  <FaShoppingCart /> Cart
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <FaUser /> Sign In
                </Link>
              </li>
            </ul>
          </details>
        </div>

        {/* Desktop menu */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/cart" className="flex items-center gap-1">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <span className="badge badge-success ml-2">
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </span>
                )}

              </Link>
            </li>
            <li>
              <Link to="/login" className="flex items-center gap-1">
                <FaUser /> Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
