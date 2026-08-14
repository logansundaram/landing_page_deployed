import Link from "next/link";
import Container from "./components/container";
import SaturnRings from "./components/saturn-rings";

/* The 404 gets the site's one moment of joy: the observatory sheet with its
   satellite still faithfully riding the F ring, and a title block that
   reports the miss in the same deadpan register as everything else. */
export default function NotFound() {
  return (
    <section className="relative flex overflow-hidden lg:min-h-[42vw]">
      <SaturnRings
        pathId="notfound-f-ring"
        className="absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block"
      />

      <Container className="relative z-10 flex items-center py-24 md:py-32">
        <div className="max-w-4xl">
          <p className="type-micro mb-8 lowercase text-muted">
            <span className="text-accent">$</span> find page{" "}
            <span className="text-hot">— no match</span>
          </p>

          <h1 className="type-display lowercase">
            <span className="block font-normal text-muted">fig. 404 —</span>
            <span className="block text-fg">object not found.</span>
          </h1>

          <p className="mt-8 max-w-xl leading-relaxed text-muted">
            Whatever was here has left the observable system. Nothing ran, and
            nothing was harmed. The satellite is still on its orbit.
          </p>

          <div className="mt-9">
            <Link
              href="/"
              className="group inline-flex h-11 items-center gap-2 px-3 text-sm lowercase text-fg t-colors hover:text-accent"
            >
              <span aria-hidden className="text-faint">
                [
              </span>
              return to the ring plane
              <span aria-hidden className="text-faint">
                ]
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
