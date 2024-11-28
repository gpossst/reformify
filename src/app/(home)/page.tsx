import DocumentationButton from "@/app/components/DocumentationButton";
import GitHubSignIn from "@/app/components/GitHubSignIn";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-12"
        style={{
          background: `radial-gradient(
          150% 150% at 0% 100%,
          var(--accent) 0%,
          var(--background) 55%,
          var(--background) 100%
        )`,
        }}
      >
        <div className="text-8xl font-fredoka font-bold text-center px-12 leading-none tracking-tight relative z-10">
          Make forms easy.
        </div>
        <div className="flex items-center justify-center gap-8 relative z-10">
          <DocumentationButton />
          <GitHubSignIn size={1} />
        </div>
      </div>
    </div>
  );
}
