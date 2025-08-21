<?php
namespace App\Http\Controllers;

use Stripe\Stripe;
use App\Models\User;
use Stripe\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;

class stripeController extends Controller
{
    // public function __construct()
    // {
    //     Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
    // }

    public function checkout(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        try {
            $cartPrds = $request->cartItems;
            $userId   = $request->userId;
            // $cartPrds = json_decode($request->array('cartItems'));

            // // create customer
            // $customer = Stripe::customers()->create([
            //     'metadata' => [
            //        "userId" => $request->userId,
            //        "cart" => $request->cartItems
            //     ]
            // ]);

            $lineItems = [];

            foreach ($cartPrds as $cartPrd) {
                $product     = Product::find($cartPrd['id']);
                $lineItems[] = [
                    'price_data' => [
                        'currency'     => 'usd',
                        'product_data' => [
                            // 'name' => $product['nameShop'],
                            'name' => $product->nameShop,
                        ],
                        // 'unit_amount'  => $product['price'] * 100,
                        'unit_amount'  => $product->price * 100,
                    ],
                    'quantity'   => $cartPrd['quantity'],
                    // <!-- 'quantity'   => $cartPrd->quantity, -->
                ];

            }

            $session = Session::create([
                'payment_method_types'        => ['card'],
                'shipping_address_collection' => [
                    'allowed_countries' => ["US", "CA", "KE"],
                ],
                // 'shipping_options'            => [
                //     'shipping_rate_data' => [
                //         ' type'             => "fixed_amount",
                //         'fixed_amount'      => [
                //             'amount'   => 0,
                //             'currency' => "usd",
                //         ],
                //         'display_name'      => "Free shipping",
                //         // Delivers between 5-7 business days
                //         'delivery_estimate' => [
                //             'minimum' => [
                //                 'unit'  => "business_day",
                //                 'value' => 5,
                //             ],
                //             'maximum' => [
                //                 'unit'  => "business_day",
                //                 'value' => 7,
                //             ],
                //         ],
                //     ],
                // ],
                // 'shipping_rate_data'          => [
                //     ' type'             => "fixed_amount",
                //     'fixed_amount'      => [
                //         'amount'   => 1500,
                //         'currency' => "usd",
                //     ],
                //     'display_name'      => "Next day air",
                //     // Delivers in exactly 1 business day
                //     'delivery_estimate' => [
                //         'minimum' => [
                //             'unit'  => "business_day",
                //             'value' => 1,
                //         ],
                //         'maximum' => [
                //             'unit'  => "business_day",
                //             'value' => 1,
                //         ],
                //     ],
                // ],
                // 'phone_number_collection'     => [
                //     'enabled' => true,
                // ],
                'line_items'                  => $lineItems,
                'mode'                        => 'payment',
                'success_url'                 => "http://localhost:5173/orderPage?success=true",
                'cancel_url'                  => "http://localhost:5173/cart?cancel=true",
                'customer_creation'           => 'always',
                'metadata'                    => [
                    "customer_userId" => $request->userId,
                    "customer_cart"   => json_encode($request->cartItems),
                ],
            ]);

            return response()->json(['url' => $session->url]);
            // return response()->json($lineItems);
            // return response()->json([$lineItems]);
        } catch (ErrorException $exception) {
            // throw $th;
            Log::error($exception->getMessage());
            return response()->json(['error' => $exception->getMessage()]);
        }

    }

    public function webHookData($data, $cartData, $userId){
        try{
            $user = User::find($userId);

            // creating orderDetail
            $orderDetail = $user->orderdetails()->create([
                "subtotal" => $data->amount_subtotal,
                "total" => $data->amount_total,
                "payment_status" => $data->payment_status,
                "customerId" => $data->customer,
            ]);

            // creating orderItems
            foreach ($cartData as $cartPrd) {
               $orderDetail->orderitems()->create([
                "productName" => $cartPrd['name'],
                "product_Id" => $cartPrd['id'],
                "variationName" => $cartPrd['variation'],
                "imgUrl" => $cartPrd['imgUrl'],
                "quantity" => $cartPrd['quantity'],
                "price" => $cartPrd['price'],
               ]);
            }

            // creating shipping
            // $shipping = $orderDetail->shippings()->create([
            //   "email" => $data->customer_details->email,
            //   "name" => $data->customer_details->name,
            //   "phone	" => $data->customer_details->phone,
            //   "tax_exempt" => $data->customer_details->tax_exempt,
            // ]);

            // creating shippingaddresses
            // $shipping->shippingaddresses()->create([
            //    "city" => $data->customer_details->address->address, 
            //    "country" => $data->customer_details->address->country, 
            //    "line1" => $data->customer_details->address->line1, 
            //    "line2" => $data->customer_details->address->line2, 
            //    "postal_code" => $data->customer_details->address->postal_code, 
            //    "state" => $data->customer_details->address->state, 
            // ]);

        } catch (ErrorException $exception) {
            // throw $th;
            Log::error($exception->getMessage());
            return response()->json(['error' => $exception->getMessage()]);
        }
    }


    public function webhook()
    {
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');

        $payload    = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event      = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            http_response_code(400);
            exit();
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            http_response_code(400);
            exit();
        }

        // Handle the event
        switch ($event->type) {
            case 'checkout.session.completed':
                $data = $event->data->object;
                $userId = $data->metadata->customer_userId;
                $cartData = json_decode($data->metadata->customer_cart, true); 
                // $customer = Customer::retrieve($paymentIntent->customer);
            // ... handle other event types
            // echo "$paymentIntent";
            $this->webHookData($data, $cartData, $userId);
            // print_r($paymentIntent);
            // return response()->json(['message' => "Order saved successfully"]);
            default:
                echo 'Received unknown event type ' . $event->type;
        }

        http_response_code(200);
        return response()->json(['message' => 'Webhook received'], 200);
    }

    public function webhooktest(Request $request){
         $cart = $request->cartItems;


         return response()->json($cart);
    }
}
