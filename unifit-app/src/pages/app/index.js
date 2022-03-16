import Head from "next/head";
import { Container, Prose, Link } from "components/core";

export default function Dashboard() {
  return (
    <Container>
      <Head>
        <title>Dashboard | UniFit</title>
        <meta name="description" content="The Future of Fitness is Here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Prose>
        <h1>Dashboard</h1>
        <Link href="/" className="decoration-blue-500">
          Home
        </Link>
        <br />
        <Link href="/app/workout" className="decoration-rose-500">
          Start Workout
        </Link>
        <br />
        <Link href="/app/pyodide" className="decoration-purple-500">
          Pyodide
        </Link>
      </Prose>
    </Container>
  );
}
