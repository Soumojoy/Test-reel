import Image from "next/image";
import Link from 'next/link';


export default function Home() {
  return (
    <div className="relative min-h-screen bg-[url('https://plus.unsplash.com/premium_photo-1685055940344-26d89db70a0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex items-center justify-center px-4">
    <div className="font-sans p-8 bg-white ">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl text-black">AI-Generated Sports Videos</h1>
        <p className="text-lg mt-4 text-black">
  <b>Create Personalized Sports Videos in Seconds!</b>  Turn your favorite sports moments into dynamic 30-second videos with the power of AI! Simply enter the name of a sports personality, and watch as our platform crafts a visually stunning video celebrating their achievements, highlights, and iconic moments. Whether you&apos;re a fan, a sports analyst, or a brand, our platform provides a quick, easy, and innovative way to create shareable sports content. Dive into the world of sports like never before and let your creativity shine&mdash;start generating your personalized sports videos today!
</p>

      </section>

      {/* Navigation Divs */}
      <div className="flex justify-center gap-8">
        <Link href="/create">
          <button className="px-8 py-4 bg-blue-500 text-white rounded-lg text-lg text-center transition duration-300 hover:bg-blue-600">
            🎥 Create Video
          </button>
        </Link>
        <Link href="/videos">
          <button className="px-8 py-4 bg-blue-500 text-white rounded-lg text-lg text-center transition duration-300 hover:bg-blue-600">
            📺 View Videos
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
}
