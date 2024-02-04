import Header from "@/app/components/layouts/Header"
import GoogleMap from "./components/home/googleMap/GoogleMap"
import ShopCardList from "./components/shop/shopCardList/ShopCardList"
import RecommendPost from "./components/home/RecommendPost/RecommendPost"


const Home = () => {
  return (
    <div>
      <Header/>
      <div>
        <GoogleMap />
        <RecommendPost />
        <ShopCardList />
      </div>
    </div>
  )
}

export default Home