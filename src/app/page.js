// "use client";

import Link from "next/link";
import styles from "./page.module.css";

import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <Container>
          <h1>Read Riot</h1>
          <p className="mt-3">Where Stories Spark a Revolution</p>
        </Container>
      </section>

      <section className={`${styles.section} text-center`}>
        <Container>
          <h2 className="mb-4">Discover a World of Words</h2>
          <p className="lead">
            Dive into thousands of stories and know the minds behind them.
          </p>
          <div className="mt-4">
            <Link
              href={"/books"}
              className={`btn ${styles["btn-funky"]} btn-lg m-2`}
            >
              📘 Explore Books
            </Link>
            <Link
              href={"/authors"}
              className={`btn ${styles["btn-funky"]} btn-lg m-2`}
            >
              ✍️ Know the Authors
            </Link>
          </div>
        </Container>
      </section>

      <section className={`${styles.section} bg-light`}>
        <Container>
          <h2 className="text-center mb-4">
            Why Reading Still Rocks in a Digital World
          </h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  📖 Boosts focus and reduces screen fatigue
                </ListGroupItem>
                <ListGroupItem>
                  🧠 Strengthens brain function and memory
                </ListGroupItem>
                <ListGroupItem>
                  💬 Improves vocabulary and writing skills
                </ListGroupItem>
                <ListGroupItem>
                  🌍 Builds empathy and global understanding
                </ListGroupItem>
                <ListGroupItem>
                  😌 Helps you relax and unwind anytime, anywhere
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
