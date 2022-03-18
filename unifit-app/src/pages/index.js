import Head from "next/head";
import { Container, Prose, Link } from "components/core";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>UniFit</title>
        <meta name="description" content="The Future of Fitness is Here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Prose>
        <h1 className = "">UniFit</h1>
        <h2>Experience the Future of Fitness at your Home</h2>
        <Link href="/app" className="decoration-green-500">
          Dashboard
        </Link>
      </Prose>
    </Container>
  );
}
