<?php
namespace App\Http\Controllers;

use App\Models\Orderdetail;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Redis;

class ProductController extends Controller
{
    public function allProducts()
    {
        // $products = Product::with('variations')->get();

        try {
            // if (! $products) {
            //     return response()->json(['message' => 'No products found'], 204);
            // } else {
            //     return response()->json(['prds' => $products]);
            // }
            $productList = Redis::get("products");
            $products    = json_decode($productList);
            if ($products == "") {
                $products = Product::with('variations')->get();
                Redis::setEx("products", 60, $products);
            }
            // $products="";
            // if (Redis::isReady) {
            //     $productList = Redis::get("products");
            //     $products    = json_decode($productList);
            // }
            // if ($products) {
            //     return response()->json(['prds' => $products]);
            // } else {
            //     $products = Product::with('variations')->get();
            //     if (Redis::isReady) {
            //         Redis::setEx("products", 60, json_encode($products));
            //     }
            //     // return response()->json(['prds' => $products]);
            // }

            return response()->json(['prds' => $products]);
        } catch (ErrorException $exception) {
            Log::error($exception->getMessage());
            return response()->json(['error' => $exception->getMessage()]);
        }
    }

    public function sliderProducts()
    {
        // $products = Product::where('isSlider', 'slider')->get();

        try {
            // if (! $products) {
            //     return response()->json(['message' => 'No products found'], 204);
            // } else {
            //     return response()->json(['prds' => $products]);
            // }
            $productList = Redis::get("sliderProducts");
            $products    = json_decode($productList);
            if ($products == "") {
                $products = Product::where('isSlider', 'slider')->get();
                Redis::setEx("sliderProducts", 60, $products);
            }

            return response()->json(['prds' => $products]);
        } catch (ErrorException $exception) {
            Log::error($exception->getMessage());
            return response()->json(['error' => $exception->getMessage()]);
        }
    }

    public function newProducts()
    {
        // $products = Product::where('newProduct', 'newPrd')->get();

        try {
            // if (! $products) {
            //     return response()->json(['message' => 'No products found'], 204);
            // } else {
            //     return response()->json(['prds' => $products]);
            // }
            $productList = Redis::get("newProducts");
            $products    = json_decode($productList);
            if ($products == "") {
                $products = Product::where('newProduct', 'newPrd')->get();
                Redis::setEx("newProducts", 60, $products);
            }

            return response()->json(['prds' => $products]);
        } catch (ErrorException $exception) {
            Log::error($exception->getMessage());
            return response()->json(['error' => $exception->getMessage()]);
        }
    }

    public function offers()
    {
        // $products = Product::where('isOffer', 'yes')->get();

        try {
            // if (! $products) {
            //     return response()->json(['message' => 'No products found'], 204);
            // } else {
            //     return response()->json(['prds' => $products]);
            // }
            $productList = Redis::get("offerProducts");
            $products    = json_decode($productList);
            if ($products == "") {
                $products = Product::where('isOffer', 'yes')->get();
                Redis::setEx("offerProducts", 60, $products);
            }

            return response()->json(['prds' => $products]);
        } catch (ErrorException $exception) {
            Log::error($exception->getMessage());
            return response()->json(['error' => $exception->getMessage()]);
        }
    }

    public function queryProducts()
    {
        $categoryName = request("categoryName");
        $q            = request("q");

        try {
            // $products = Product::query();
            if ($categoryName != "" && $categoryName != "all") {
                // $products = $products->where('category', "$categoryName")->where('isOffer', 'no')->with("variations")->get();
                // return response()->json(['prds' => $products]);
                $productList = Redis::get("prdCategoryName:${categoryName}");
                $products    = json_decode($productList);
                if ($products == "") {
                    $products = Product::where('category', "$categoryName")->where('isOffer', 'no')->with("variations")->get();
                    Redis::setEx("prdCategoryName:${categoryName}", 60, $products);
                }
                return response()->json(['prds' => $products]);
            } elseif ($categoryName == "all") {
                // $products = $products->where('isOffer', 'no')->with("variations")->get();
                // return response()->json(['prds' => $products]);

                $productList = Redis::get("prdCategoryNameAll");
                $products    = json_decode($productList);
                if ($products == "") {
                    $products = Product::where('isOffer', 'no')->with("variations")->get();
                    Redis::setEx("prdCategoryNameAll", 60, $products);
                }
                return response()->json(['prds' => $products]);
            } elseif ($q != "") {
                $products = $products->where('nameShop', "like", "%" . $q . "%")->orWhere("nameProduct", "like", "%" . $q . "%")->with("variations")->get();
                return response()->json(['prds' => $products]);
            } else {
                // $products = $products->where("isOffer", "no")->with("variations")->get();
                // return response()->json(['prds' => $products]);
                $productList = Redis::get("allproducts");
                $products    = json_decode($productList);
                if ($products == "") {
                    $products = Product::where("isOffer", "no")->with("variations")->get();
                    Redis::setEx("allproducts", 60, $products);
                }

                return response()->json(['prds' => $products]);
            }
        } catch (ErrorException $exception) {
            Log::error($exception->getMessage());
            return response()->json(['error' => $exception->getMessage()]);
        }
        // return response()->json(['categName' => $categoryName, 'qName' => $q]);
    }

    public function relatedProducts()
    {
        // $products = Product::where("relatedProduct", "related")->get();

        try {
            // if (! $products) {
            //     return response()->json(['message' => 'No products found'], 204);
            // } else {
            //     return response()->json(['prds' => $products]);
            // }
            $productList = Redis::get("relatedProducts");
            $products    = json_decode($productList);
            if ($products == "") {
                $products = Product::where("relatedProduct", "related")->get();
                Redis::setEx("relatedProducts", 60, $products);
            }

            return response()->json(['prds' => $products]);
        } catch (ErrorException $exception) {
            Log::error($exception->getMessage());
            return response()->json(['error' => $exception->getMessage()]);
        }
    }

    public function orders($id)
    {
        try {
            $orderData = Orderdetail::where("user_id", "$id")->with('orderItems')->get();

            return response()->json($orderData);
        } catch (ErrorException $exception) {
            Log::error($exception->getMessage());
            return response()->json(['error' => $exception->getMessage()]);
        }
    }

    public function remove($id)
    {
        try {
            $userId = request("userId");
            $user   = User::find($userId);

            $orderdetails = $user->orderDetails()->where('id', $id)->delete();

            // $orderdetails->save();
            return response()->json(["success" => "data deleted"]);
        } catch (ErrorException $exception) {
            Log::error($exception->getMessage());
            return response()->json(['error' => $exception->getMessage()]);
        }
    }

    // public function redisPrd()
    // {
    //     $products = Redis::get("redisPrd");
    //     $products = json_decode($productList);
    //     $products = json_encode($productList);
    //     if ($products == "") {
    //         // echo "cache miss";
    //         $products = Product::all();
    //         Redis::setEx("redisPrd", 60, $products);
    //     }

    //     return response()->json($products);
    // }
}
