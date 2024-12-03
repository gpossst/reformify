import DocumentationButton from "@/app/components/DocumentationButton";
import GitHubSignIn from "@/app/components/GitHubSignIn";
import ParticlesBackground from "@/app/components/ParticlesBackground";
import ToTopArrow from "../components/ToTopArrow";
import { FaChevronDown } from "react-icons/fa";

export default function Home() {
  return (
    <div className="w-full">
      <ToTopArrow />
      <div
        className="fixed bottom-8 sm:bottom-10 md:bottom-12 animate-bounce cursor-pointer 
          hover:text-accent transition-colors left-1/2 -translate-x-1/2 z-50"
      >
        <FaChevronDown
          className="text-2xl sm:text-3xl md:text-4xl"
          aria-label="Scroll down for more information"
        />
      </div>
      <ParticlesBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-fredoka font-bold text-center 
          leading-tight tracking-tight relative z-10 max-w-5xl"
        >
          Make forms easy.
        </h1>
        <div className="flex items-center gap-4 mt-8">
          <DocumentationButton />
          <GitHubSignIn size={1} />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-20 bg-[var(--foreground)] text-background">
        <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="var(--foreground)"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        {/* API Feature */}
        <div
          className="flex flex-col md:flex-row px-4 sm:px-6 md:px-24 py-12 sm:py-16 md:py-32 
          justify-between items-center max-w-7xl mx-auto gap-8 sm:gap-10 md:gap-12"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://utfs.io/f/STFL4gpOFkcnBmOh8X1RwMS74yxKeDvdaC08VYptEgrbcz6n"
            alt="Form API illustration showing simple integration"
            className="w-full md:w-[40%] object-contain rounded-xl shadow-lg 
              hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col items-center md:items-end gap-4 sm:gap-5 md:gap-6 max-w-xl">
            <h2
              className="text-3xl sm:text-4xl md:text-6xl font-fredoka font-bold 
              leading-tight tracking-tight text-center md:text-right"
            >
              Simple, easy form API.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-merriweather text-center md:text-right">
              Send data to our backend using pre-made POST requests.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row px-4 sm:px-6 md:px-24 py-12 sm:py-16 md:py-32 justify-between items-center max-w-7xl mx-auto gap-8 sm:gap-10 md:gap-12">
          <div className="flex flex-col items-center md:items-start gap-4 sm:gap-5 md:gap-6 max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-fredoka font-bold leading-tight tracking-tight relative z-10 text-center md:text-left">
              Full features, always.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-merriweather text-center md:text-left">
              We charge based on your form usage, nothing else. You&apos;ll
              always have all features.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://utfs.io/f/STFL4gpOFkcnR7EEdf95aljqWn2NMKmBDXUcdJZArLsi86Ox"
            alt="Feature comparison showing all features included"
            className="w-full md:w-[40%] object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex px-4 sm:px-8 md:px-24 py-16 sm:py-24 md:py-32 justify-center items-center">
          <div className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8 max-w-4xl">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-fredoka font-bold leading-tight tracking-tight text-center relative z-10">
              Why?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-merriweather text-center leading-relaxed px-4">
              Current form solutions are complex, expensive, and don&apos;t lend
              themselves to very simple forms. We&apos;re here for the ones
              developing apps, taking feedback, and responding to help requests.
              The form shouldn&apos;t be your focus, your project should!
            </p>
          </div>
        </div>
        <div className="flex px-4 sm:px-8 md:px-24 py-16 sm:py-24 md:py-32 justify-center items-center">
          <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 max-w-6xl w-full">
            <h2
              id="pricing"
              className="text-4xl sm:text-5xl md:text-7xl font-fredoka font-bold leading-tight tracking-tight text-center relative z-10"
            >
              Pricing
            </h2>
            <div className="relative w-full flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-7 md:gap-8 px-4 sm:px-5 md:px-6">
              <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 p-6 sm:p-7 md:p-8 bg-background text-foreground rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[500px]">
                <h3 className="text-3xl sm:text-3xl md:text-4xl font-fredoka font-bold">
                  Free
                </h3>
                <div className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-bold">
                  $0
                </div>
                <ul className="flex flex-col gap-3 sm:gap-3 md:gap-4 text-lg sm:text-xl md:text-xl font-merriweather text-center">
                  <li>50 submissions</li>
                  <li>Unlimited forms</li>
                  <li>All features included</li>
                </ul>
              </div>
              <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 flex flex-col items-center gap-3 sm:gap-3 md:gap-4 p-4 sm:p-5 md:p-6 bg-accent text-foreground rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[300px]">
                <div className="text-2xl sm:text-2xl md:text-3xl font-fredoka font-bold">
                  +$5
                </div>
                <div className="text-lg sm:text-lg md:text-xl font-merriweather text-center">
                  per additional 1000 submissions
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="flex flex-col items-center gap-1 pb-6 sm:pb-7 md:pb-8 px-4">
          <a
            href="/legal"
            className="text-accent font-fredoka text-base sm:text-lg hover:underline"
          >
            Legal
          </a>
          <div className="text-center font-fredoka text-base sm:text-lg">
            This is a website by{" "}
            <a
              href="https://garrett.one"
              className="text-accent hover:underline"
            >
              Garrett Post
            </a>
            .
          </div>
          <div className="text-center font-merriweather text-base sm:text-lg">
            &copy; {new Date().getFullYear()} Reformify
          </div>
        </footer>
      </section>
    </div>
  );
}
