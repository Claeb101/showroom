export default async function Home() {
  return (
    <>
      <div className=' max-h-screen flex-grow flex flex-col items-center justify-center text-center'>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Joven Motors
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">
          A showroom in Kalayarkoil, Tamil Nadu, India run by Mr. Franklin Desai Amalorpavam.
        </p>
      </div>
      <footer className="flex flex-col items-center justify-center w-full">
        <p className="mt-4 text-center text-base">
          Made with 💖 by <a className=" underline" href="https://arulandu.com">Alvan Caleb Arulandu</a>
        </p>
        <a className="mt-2 block w-fit" href="https://github.com/Claeb101/showroom">
          <img className="h-full" src="https://img.shields.io/github/last-commit/claeb101/showroom" />
        </a>
      </footer>
    </>
  )
}
