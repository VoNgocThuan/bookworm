<?php

namespace App\Repositories;

use App\Interfaces\CrudInterface;
use App\Models\Book;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Darryldecode\Cart\Facades\CartFacade;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderRepository implements CrudInterface
{
    public function findById($id)
    {
        $orders = Order::find($id);
        return $orders;
    }
    public function getAll()
    {
        $orders = Order::all();
        return $orders;
    }
    public function create(Request $request)
    {
    }

    public function saveOrder(Request $request)
    {
        DB::beginTransaction();
        try {
            $order = DB::table('order')->insertGetId(
                [
                    'user_id' => $request->user_id,
                    'order_date' => Carbon::now(),
                    'order_amount' => $request->order_amount
                ]
            );

            $cart = CartFacade::getContent();

            $orderItemsAvai = array();
            $orderItemsUnavai = array();
            foreach ($cart as $key => $value) {
                if (Book::where('id', '=', $value['id'])->exists()) {
                    $orderItemsAvai[] = (object) [
                        'order_id' => $order,
                        'book_id' => $value['id'],
                        'quantity' => $value['quantity'],
                        'price' => $value['price'],
                    ];
                } else if (Book::where('id', '=', $value['id'])->doesntExist()) {
                    $orderItemsUnavai[] = (object) [
                        'book_id' => $value['id'],
                        'book_name' => $value['name'],
                        'quantity' => $value['quantity'],
                        'price' => $value['price'],
                    ];
                }
            }

            // $orderItems = collect($cart)->map(function ($value) use ($order) {
            //     if (Book::where('id', '=', $value['id'])->exists()) {
            //         return [
            //             'order_id' => $order,
            //             'book_id' => $value['id'],
            //             'quantity' => $value['quantity'],
            //             'price' => $value['price'],
            //         ];
            //     } else {
            //         return [
            //             'book_id_unavailable' => $value['id'],
            //             'name_unavailable' => $value['name'],
            //             'quantity_unavailable' => $value['quantity'],
            //             'price_unavailable' => $value['price'],
            //         ];
            //     }
            // })->forget(
            //     'book_id_unavailable',
            //     'name_unavailable',
            //     'quantity_unavailable',
            //     'price_unavailable',
            // );

            $orderItemsAvai = json_decode(json_encode($orderItemsAvai), true);
            
            if($orderItemsUnavai == []) {
                DB::table('order_item')->insert($orderItemsAvai);
            } else {
                return $orderItemsUnavai;
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw new Exception($e->getMessage());
        }
    }

    public function edit(Request $request, $id)
    {
    }
    public function delete($id)
    {
    }
}
