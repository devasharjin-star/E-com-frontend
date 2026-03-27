import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

const ImageSlider = () => {
  const images = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=1473&auto=format&fit=crop"
  ]

  const [current, setCurrent] = useState(0)

  /* ---------- NEXT / PREV ---------- */

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  /* ---------- AUTO SLIDE ---------- */

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [])

  /* ---------- RENDER ---------- */

  return (
    <div className="relative w-full overflow-hidden">

      {/* IMAGE ROW */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-full h-72 md:h-112.5 shrink-0 object-cover"
            alt="slide"
          />
        ))}
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronLeft size={28} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronRight size={28} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider