// Import all assets
import pot from "../../assets/pot.jpg";
import wood from "../../assets/wood.jpg";
import batik from "../../assets/batik.jpg";
import jewellery from "../../assets/jewellery.jpg";
import pottery from "../../assets/pottery.jpg";
import flowers from "../../assets/flowers.jpg";
import candles from "../../assets/candles.jpg";
import wedding from "../../assets/wedding.jpg";
import Hakuru from "../../assets/Hakuru.jpg";
import Beeralu from "../../assets/Beeralu.jpg";
import resin from "../../assets/resin.jpg";
import Frames from "../../assets/Frames.jpg";
import Notebook from "../../assets/Notebook.jpg";
import Laksha from "../../assets/Laksha.jpg";
import Drums from "../../assets/Drums.jpg";
import coconutshell from "../../assets/coconutshell.jpg";
import Brass from "../../assets/Brass.jpg";
import Cards from "../../assets/Cards.jpg";
import masks from "../../assets/masks.jpg";
import stationery from "../../assets/stationery.jpg";

/**
 * Categories data for the horizontal scroll
 */
export const categoriesData = [
  { id: 1, name: "Wood Carvings", image: wood },
  { id: 2, name: "Batik & Textiles", image: batik },
  { id: 3, name: "Pottery", image: pottery },
  { id: 4, name: "Jewellery", image: jewellery },
  { id: 5, name: "Flower Bouquets", image: flowers },
  { id: 6, name: "Candles", image: candles }, 
  { id: 7, name: "Wedding Stationery", image: wedding },
  { id: 8, name: "Hakuru", image: Hakuru },
  { id: 9, name: "Beeralu Lace", image: Beeralu },
  { id: 10, name: "Resin Art", image: resin },
  { id: 11, name: "Photo Frames", image: Frames },
  { id: 12, name: "Note Books", image: Notebook },
  { id: 13, name: "Lacquer Work (Laksha)", image: Laksha },
  { id: 14, name: "Drums", image: Drums },
  { id: 15, name: "Coconut Shell Art", image: coconutshell },
  { id: 16, name: "Brass Work", image: Brass },
  { id: 17, name: "Greeting Cards", image: Cards },
  { id: 18, name: "Masks", image: masks },
  { id: 19, name: "Snacks", image: stationery },
];

/**
 * Mock function to return featured products
 */
export const getFakeProducts = () => [
  { id: 1, title: "Hand-Painted Ceramic Vase", shop: "Nimali’s Pottery", price: 1200, image: pot },
  { id: 2, title: "Wooden Elephant Statue", shop: "By Wooden Carvings", price: 1400, image: wood },
  { id: 3, title: "Batik Silk Saree", shop: "By Serendib Silks", price: 1600, image: batik },
  { id: 4, title: "Moonstone Silver Necklace", shop: "By Serendib Silks", price: 1800, image: jewellery },
];