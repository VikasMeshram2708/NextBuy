export default function AboutPage() {
  return (
    <div className="min-h-screen container mx-auto">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">About NextBuy</h1>
        <p className="text-lg mb-4">
          Welcome to NextBuy, your trusted source for secure online shopping in
          India. We are committed to providing our customers with unbeatable
          prices, a wide range of products, and fast delivery services.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="mb-4">
          At NextBuy, our mission is to make online shopping safe, easy, and
          affordable. We strive to offer the best deals on a variety of products
          while ensuring a secure shopping experience.
        </p>
        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
        <ul className="list-disc list-inside mb-4">
          <li>**Secure Online Shopping**: Your safety is our priority.</li>
          <li>
            **Best Deals**: Exclusive discounts on a wide range of products.
          </li>
          <li>
            **Fast Delivery**: Get your orders delivered quickly and
            efficiently.
          </li>
          <li>
            **Customer Support**: Our team is here to assist you with any
            inquiries.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Join Us</h2>
        <p>
          Join the thousands of satisfied customers who trust NextBuy for their
          online shopping needs. Experience the difference today!
        </p>
      </div>
    </div>
  );
}
