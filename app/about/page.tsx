import Image from "next/image"

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        {/* Event Info */}
        <section className="mb-20">
          <h1 className="font-press-start text-4xl md:text-5xl text-center mb-12 bg-gradient-to-r from-zenith-red to-zenith-blue bg-clip-text text-transparent">
            About Zenith
          </h1>

          <div className="max-w-4xl mx-auto text-gray-300 space-y-6">
            <p>
              Zenith E-Summit 2025 is MAIT's flagship entrepreneurship event, bringing together innovators,
              entrepreneurs, and industry leaders for two days of inspiration, learning, and networking.
            </p>
            <p>
              With our theme of "Retro Futurism," we're exploring how past visions of the future can inspire today's
              innovations and tomorrow's breakthroughs.
            </p>
          </div>
        </section>

        {/* Leadership Messages */}
        <section className="mb-20">
          <h2 className="font-press-start text-3xl text-center mb-12 text-zenith-purple">Leadership Speaks</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* President's Message */}
            <div className="space-y-4">
              <div className="aspect-square relative w-48 mx-auto mb-6">
                <Image src="/placeholder.svg" alt="President" fill className="rounded-full object-cover" />
              </div>
              <h3 className="font-press-start text-xl text-center text-zenith-red">Dr. Jane Doe</h3>
              <p className="text-center text-gray-400 mb-4">President, EDC MAIT</p>
              <blockquote className="text-gray-300 italic">
                "Zenith represents our commitment to fostering innovation and entrepreneurship among students. Join us
                as we explore the intersection of retro aesthetics and futuristic technology."
              </blockquote>
            </div>

            {/* Vice President's Message */}
            <div className="space-y-4">
              <div className="aspect-square relative w-48 mx-auto mb-6">
                <Image src="/placeholder.svg" alt="Vice President" fill className="rounded-full object-cover" />
              </div>
              <h3 className="font-press-start text-xl text-center text-zenith-blue">Prof. John Smith</h3>
              <p className="text-center text-gray-400 mb-4">Vice President, EDC MAIT</p>
              <blockquote className="text-gray-300 italic">
                "Our vision is to create a platform where ideas flourish and innovations take flight. Zenith 2025 is
                your gateway to the future of entrepreneurship."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="font-press-start text-3xl text-center mb-12 text-zenith-purple">Event Timeline</h2>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  time: "10:00 AM",
                  date: "Feb 10, 2025",
                  title: "Opening Ceremony",
                  description: "Kickoff with keynote speakers and inaugural address",
                },
                {
                  time: "2:00 PM",
                  date: "Feb 10, 2025",
                  title: "Workshop Sessions",
                  description: "Interactive workshops on emerging technologies",
                },
                {
                  time: "10:00 AM",
                  date: "Feb 11, 2025",
                  title: "Panel Discussions",
                  description: "Industry experts share their insights",
                },
                {
                  time: "4:00 PM",
                  date: "Feb 11, 2025",
                  title: "Closing Ceremony",
                  description: "Awards presentation and networking session",
                },
              ].map((event, index) => (
                <div key={index} className="relative pl-8 border-l border-zenith-red">
                  <div className="absolute w-4 h-4 bg-zenith-red rounded-full -left-2 mt-1" />
                  <div className="mb-1 text-zenith-blue font-press-start">
                    {event.time} - {event.date}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-400">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

