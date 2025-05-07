"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Navbar, Nav } from "react-bootstrap";

export default function NavbarComponent() {
  const pathname = usePathname();

  return (
    <Navbar
      expand="sm"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Link className="navbar-brand" href={"/"}>
          Read Riot
        </Link>
        <Navbar.Text>Fuel Your Mind. Join the Riot.</Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
          <Nav className="me-auto">
            <Link
              className={`nav-link ${
                pathname.includes("book") ? "active" : ""
              }`}
              href={"/books"}
            >
              Books
            </Link>
            <Link
              className={`nav-link ${
                pathname.includes("author") ? "active" : ""
              }`}
              href={"/authors"}
            >
              Authors
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
