'use client';
import { Menu } from 'react-feather';
import Link from 'next/link';
import { Navbar, Nav, Form } from 'react-bootstrap';
import QuickMenu from 'layouts/QuickMenu';
import { useHeaderBreadcrumb } from 'hooks/useHeaderBreadcrumb';

const NavbarTop = ({ data }) => {
  const { header, breadcrumb } = useHeaderBreadcrumb();

  return (
    <>
      <Navbar expanded="lg" className="navbar-classic navbar navbar-expand-lg px-3 py-2 shadow-sm">
        <div className="d-flex justify-content-between w-100 align-items-center">
          {/* LEFT: Menu + Title */}
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-1">
              <Link
                href="#"
                id="nav-toggle"
                className="nav-icon me-3"
                onClick={() => data.SidebarToggleMenu(!data.showMenu)}
              >
                <Menu size={24} /> {/* Increased size */}
              </Link>

              <h4 className="mb-0 fw-bold">{header}</h4> {/* Increased font size and bold */}
            </div>

          </div>

          {/* RIGHT: Search + QuickMenu */}
          <div className="d-flex align-items-center gap-2">
            <Form className="d-flex align-items-center me-3">
              <Form.Control type="search" placeholder="Search..." />
            </Form>
            <Nav className="navbar-right-wrap d-flex">
              <QuickMenu />
            </Nav>
          </div>
        </div>
      </Navbar>
            {/* Breadcrumb below title 
            <div className="text-muted small mt-1">
              {breadcrumb && breadcrumb.length > 0
                && breadcrumb.map((crumb, idx) => (
                    <span key={idx}>
                      {crumb}
                      {idx < breadcrumb.length - 1 && ' / '}
                    </span>
                  ))
              }
            </div>
            */}
    </>
  );
};

export default NavbarTop;
