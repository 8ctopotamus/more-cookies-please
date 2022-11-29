import styles from "../styles/Home.module.css";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import MoreCookies from "../components/MoreCookies";

const ClerkFeatures = () => (
  <Link href="/user">
    <a className={styles.cardContent}>
      <img src="/icons/layout.svg" />
      <div>
        <h3>Explore features provided by Clerk</h3>
        <p>
          Interact with the user button, user profile, and more to preview what
          your users will see
        </p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

const SignupLink = () => (
  <Link href="/sign-up">
    <a className={styles.cardContent}>
      <img src="/icons/user-plus.svg" />
      <div>
        <h3>Sign up for an account</h3>
        <p>
          Sign up and sign in to explore all the features provided by Clerk
          out-of-the-box
        </p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

// Main component using <SignedIn> and <SignedOut>
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Main = () => (
  <main className={styles.main}>
    <SignedOut>
      <h1 className={styles.title}>Welcome to your new app</h1>
      <p className={styles.description}>Sign up for an account to get started</p>
      <div className={styles.cards}>
        <div className={styles.card}>
          <SignupLink />
        </div>
      </div>
    </SignedOut>
    <SignedIn>
      <MoreCookies />
    </SignedIn>
  </main>
);

export default Main;
