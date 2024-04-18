import campingImage from "@/assets/images/camping.jpg";

function FeatureSection() {
  return (
    <div className=" w-full">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <h1 className="font-h1 text-h1  ">Should your home be holidazed?</h1>
          <p>With only a few steps, you can make money on your home too.</p>
        </div>
        <img src={campingImage} alt="Camping" className="w-full h-auto max-w-xl mx-auto " />
        {/*Button to be added later */}
      </div>
    </div>
  );
}

export default FeatureSection;
