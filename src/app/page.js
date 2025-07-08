import NewArrivals from "@/components/NewArrivals";
import ShopByCategory from "@/components/ShopByCategories";
import Slider from "@/components/Slider";
export default function Home() {
  return (
    <div className="px-2 lg:px-24">
      <Slider />
      <ShopByCategory />
      <NewArrivals />
    </div>
  );
}
