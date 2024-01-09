'use client';

import { Container, Row, Col} from "react-bootstrap"

import Link from "next/link"

import { useUser } from '@auth0/nextjs-auth0/client';

import Header from "../components/Header"

export default function Home() {
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  return (
    <main>
      <Header />
      <Container style={{marginTop: "40px"}}>
        <Row>
          <Col>
            <Link href="/events">Events Calendar Example</Link>
            <p>An example events calendar, with filters for locations and tags.  Events can be added, edited etc. on the<Link href="/events/manage"> management page</Link></p>
          </Col>
        </Row>
      </Container>

      {/* {!user && 
      
      <a href="/api/auth/login">Login</a>}
      
      

      {user && (
        <>
          
          <div>
            <img src={user.picture || ""} alt={user.name || ""} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

          <a href="/api/auth/logout">Logout</a>
        </>
        
      )} */}
    </main>
  )
}
