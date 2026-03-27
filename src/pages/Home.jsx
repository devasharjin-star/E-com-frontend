import Navbar from "../components/Navbar"
import ImageSlider from "../components/ImageSlider"
import Product from "../components/Product"
import Footer from "../components/Footer"
import PageTitle from "../components/PageTitle"

const Home = () => {

  const Products = [
    {
      _id: "p1",
      name: "Running Shoes",
      description: "Comfortable lightweight running shoes for daily use",
      price: 2999,
      ratings: 0,
      image: [
        {
          public_id: "shoe_1",
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
          _id: "img1"
        }
      ],
      category: "Footwear",
      stock: 25,
      numOfReviews: 2,
      reviews: [
        { name: "Arun", rating: 5, comment: "Very comfortable shoes!", _id: "rev1" },
        { name: "Priya", rating: 4, comment: "Good for running", _id: "rev2" }
      ],
      createdAt: "2026-03-25T10:00:00.000Z",
      __v: 0
    },

    {
      _id: "p2",
      name: "Travel Backpack",
      description: "Durable backpack suitable for travel and daily carry",
      price: 1999,
      ratings: 4,
      image: [
        {
          public_id: "bag_1",
          url: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1470&auto=format&fit=crop",
          _id: "img2"
        }
      ],
      category: "Accessories",
      stock: 40,
      numOfReviews: 1,
      reviews: [
        { name: "Karthik", rating: 5, comment: "Spacious and durable", _id: "rev3" }
      ],
      createdAt: "2026-03-25T10:05:00.000Z",
      __v: 0
    },

    {
      _id: "p3",
      name: "Wireless Headphones",
      description: "Noise-cancelling headphones with high-quality sound",
      price: 4999,
      ratings: 3,
      image: [
        {
          public_id: "headphone_1",
          url: "https://images.unsplash.com/photo-1483032711911-cfd45aabc9a0?q=80&w=1470&auto=format&fit=crop",
          _id: "img3"
        }
      ],
      category: "Electronics",
      stock: 18,
      numOfReviews: 2,
      reviews: [
        { name: "Rahul", rating: 5, comment: "Excellent sound quality", _id: "rev4" },
        { name: "Deva", rating: 4, comment: "Battery life is good", _id: "rev5" }
      ],
      createdAt: "2026-03-25T10:10:00.000Z",
      __v: 0
    },

    {
      _id: "p4",
      name: "Herbal Shampoo",
      description: "Natural shampoo for smooth and healthy hair",
      price: 499,
      ratings: 0,
      image: [
        {
          public_id: "shampoo_1",
          url: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=1470&auto=format&fit=crop",
          _id: "img4"
        }
      ],
      category: "Personal Care",
      stock: 60,
      numOfReviews: 1,
      reviews: [
        { name: "Sneha", rating: 4, comment: "Makes hair soft and smooth", _id: "rev6" }
      ],
      createdAt: "2026-03-25T10:15:00.000Z",
      __v: 0
    }
  ]

  return (
    <>
      <PageTitle title="Home |  E-commerce"/>
      <Navbar />

      {/* Hero Slider */}
      <ImageSlider />

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
          Latest Collections
        </h2>

        {/* Responsive Product Grid */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        ">
          {Products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>

      </div>

      <Footer />
    </>
  )
}

export default Home